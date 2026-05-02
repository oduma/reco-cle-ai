using Microsoft.Extensions.Options;
using Reco.Api.Configuration;
using Reco.Api.DTOs;
using Reco.Api.Models;

// Provider values accepted from the frontend
// "gemini"        → Gemini cloud
// "inner-whisper" → Ollama WhisperModel (llama3.1:8b)
// "inner-shout"   → Ollama ShoutModel   (gemma4:e4b)

namespace Reco.Api.Services;

public class RecommendationOrchestrationService : IRecommendationOrchestrationService
{
    private readonly IGeminiGatewayService _geminiGateway;
    private readonly IOllamaGatewayService _ollamaGateway;
    private readonly IClementineService _clementine;
    private readonly ISuggestionCacheService _suggestionCache;
    private readonly ILastFmGatewayService _lastFm;
    private readonly ISessionContextBuilder _sessionContextBuilder;
    private readonly ISessionHistoryService _sessionHistory;
    private readonly ClementineOptions _clementineOptions;
    private readonly OllamaOptions _ollamaOptions;
    private readonly ILogger<RecommendationOrchestrationService> _logger;

    public RecommendationOrchestrationService(
        IGeminiGatewayService geminiGateway,
        IOllamaGatewayService ollamaGateway,
        IClementineService clementine,
        ISuggestionCacheService suggestionCache,
        ILastFmGatewayService lastFm,
        ISessionContextBuilder sessionContextBuilder,
        ISessionHistoryService sessionHistory,
        IOptions<ClementineOptions> clementineOptions,
        IOptions<OllamaOptions> ollamaOptions,
        ILogger<RecommendationOrchestrationService> logger)
    {
        _geminiGateway = geminiGateway;
        _ollamaGateway = ollamaGateway;
        _clementine = clementine;
        _suggestionCache = suggestionCache;
        _lastFm = lastFm;
        _sessionContextBuilder = sessionContextBuilder;
        _sessionHistory = sessionHistory;
        _clementineOptions = clementineOptions.Value;
        _ollamaOptions = ollamaOptions.Value;
        _logger = logger;
    }

    public async Task<RecommendationResponse> GetRecommendationsAsync(
        string prompt,
        string? preferredProvider = null,
        CancellationToken cancellationToken = default)
    {
        var isInnerWhisper = string.Equals(preferredProvider, "inner-whisper", StringComparison.OrdinalIgnoreCase);
        var isInnerShout   = string.Equals(preferredProvider, "inner-shout",   StringComparison.OrdinalIgnoreCase);
        var useLocal = isInnerWhisper || isInnerShout;
        var ollamaModel = isInnerShout ? _ollamaOptions.ShoutModel : _ollamaOptions.WhisperModel;

        // Build session context: conversation history + temporal preamble from SQLite log
        var sessionContext = await _sessionContextBuilder.BuildAsync(cancellationToken);
        var enrichedPrompt = sessionContext.Preamble is not null
            ? $"{sessionContext.Preamble}\n\nMy question: {prompt}"
            : prompt;

        _logger.LogInformation(
            "[Recommendations] Requesting | provider: {Provider} | history turns: {HistoryCount} | preamble: {HasPreamble} | prompt: {Length} chars",
            useLocal ? ollamaModel : "gemini",
            sessionContext.History.Count,
            sessionContext.Preamble is not null,
            enrichedPrompt.Length);

        MusicRecommendationResult result;
        string providerUsed;
        bool usedFallback = false;
        var promptTimestamp = DateTimeOffset.UtcNow;

        if (useLocal)
        {
            try
            {
                result = await _ollamaGateway.GetMusicRecommendationAsync(enrichedPrompt, sessionContext.History, ollamaModel, cancellationToken);
                providerUsed = isInnerShout ? "inner-shout" : "inner-whisper";
            }
            catch (Exception ex) when (IsOllamaFailure(ex))
            {
                _logger.LogWarning("[Recommendations] Ollama unavailable ({Reason}) — falling back to Gemini",
                    ex is TaskCanceledException ? "timeout" : "connection refused");
                result = await _geminiGateway.GetMusicRecommendationAsync(enrichedPrompt, sessionContext.History, cancellationToken);
                providerUsed = "gemini";
                usedFallback = true;
            }
        }
        else
        {
            result = await _geminiGateway.GetMusicRecommendationAsync(enrichedPrompt, sessionContext.History, cancellationToken);
            providerUsed = "gemini";
        }

        // Log the exchange to the session history after a successful AI response
        await _sessionHistory.LogUserChatAsync(prompt, promptTimestamp);
        var aiReplyId = await _sessionHistory.LogAiReplyAsync(result.Narrative, DateTimeOffset.UtcNow);

        var rawTracks = result.Tracks.Select(t => new RawTrack(t.Title, t.Artist, t.Album)).ToList();
        if (rawTracks.Count > 0)
            await _sessionHistory.LogTrackSuggestionsAsync(rawTracks, aiReplyId);
        await _sessionHistory.SetActiveReplyIdAsync(aiReplyId);

        var (annotatedTracks, message) = await AnnotateWithLocalLibraryAsync(result.Tracks, cancellationToken);

        var localTracks     = annotatedTracks.Where(t => t.InLocalLibrary).ToList();
        var discoveryTracks = annotatedTracks.Where(t => !t.InLocalLibrary).ToList();

        var freshLocal = _suggestionCache.ExcludeRecentlySuggested(localTracks);
        var localToReturn = (freshLocal.Count == 0 && localTracks.Count > 0) ? localTracks : freshLocal;

        _logger.LogInformation(
            "[Recommendations] Provider: {Provider}{Fallback} | tracks: {Total} | local: {Local} | discovery: {Discovery} | after cache: {Fresh}{Override}",
            providerUsed,
            usedFallback ? " (fallback)" : string.Empty,
            result.Tracks.Count,
            localTracks.Count,
            discoveryTracks.Count,
            freshLocal.Count,
            freshLocal.Count == 0 && localTracks.Count > 0 ? " (cache overridden)" : string.Empty);

        _suggestionCache.MarkAsSuggested(localToReturn);

        var tracksToReturn = annotatedTracks
            .Where(t => !t.InLocalLibrary || localToReturn.Contains(t))
            .ToList();

        var enriched = await EnrichWithAlbumArtAsync(tracksToReturn, cancellationToken);

        return new RecommendationResponse(result.Narrative, enriched, message, providerUsed, usedFallback, aiReplyId);
    }

    private async Task<IReadOnlyList<TrackSuggestion>> EnrichWithAlbumArtAsync(
        IReadOnlyList<TrackSuggestion> tracks,
        CancellationToken cancellationToken)
    {
        if (tracks.Count == 0) return tracks;

        var artTasks = tracks
            .Select(t => _lastFm.GetAlbumArtUrlAsync(t.Artist, t.Title, t.Album, cancellationToken))
            .ToArray();

        var artUrls = await Task.WhenAll(artTasks);

        _logger.LogInformation(
            "[Recommendations] Album art enriched: {Found}/{Total} tracks have art",
            artUrls.Count(u => u is not null), tracks.Count);

        return tracks
            .Select((t, i) => t with { AlbumArtUrl = artUrls[i] })
            .ToList();
    }

    private static bool IsOllamaFailure(Exception ex) =>
        ex is TaskCanceledException ||
        (ex is HttpRequestException http && http.StatusCode is null);

    private async Task<(IReadOnlyList<TrackSuggestion> Tracks, string? Message)> AnnotateWithLocalLibraryAsync(
        IReadOnlyList<TrackSuggestion> suggestions,
        CancellationToken cancellationToken)
    {
        if (suggestions.Count == 0)
            return (suggestions, "No specific tracks were identified for this request.");

        try
        {
            var inventory = await _clementine.LoadInventoryAsync(cancellationToken);
            var threshold = _clementineOptions.MatchThreshold;

            var annotated = suggestions
                .Select(s =>
                {
                    var match = inventory.FirstOrDefault(local => TrackMatcher.IsMatch(s, local, threshold));
                    return s with
                    {
                        InLocalLibrary  = match is not null,
                        FilePath        = match?.FilePath,
                        DurationSeconds = match?.DurationSeconds,
                    };
                })
                .ToList();

            return (annotated, null);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "[Recommendations] Local library unavailable — all tracks shown as discovery only");
            var allAsDiscovery = suggestions.Select(s => s with { InLocalLibrary = false }).ToList();
            return (
                allAsDiscovery,
                "Your local library is currently unavailable. Showing all tracks as discovery suggestions."
            );
        }
    }
}
