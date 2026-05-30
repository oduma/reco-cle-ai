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
    private readonly IAppSettingsService _settings;
    private readonly IAiPromptService _aiPrompts;
    private readonly ILogger<RecommendationOrchestrationService> _logger;

    public RecommendationOrchestrationService(
        IGeminiGatewayService geminiGateway,
        IOllamaGatewayService ollamaGateway,
        IClementineService clementine,
        ISuggestionCacheService suggestionCache,
        ILastFmGatewayService lastFm,
        ISessionContextBuilder sessionContextBuilder,
        ISessionHistoryService sessionHistory,
        IAppSettingsService settings,
        IAiPromptService aiPrompts,
        ILogger<RecommendationOrchestrationService> logger)
    {
        _geminiGateway         = geminiGateway;
        _ollamaGateway         = ollamaGateway;
        _clementine            = clementine;
        _suggestionCache       = suggestionCache;
        _lastFm                = lastFm;
        _sessionContextBuilder = sessionContextBuilder;
        _sessionHistory        = sessionHistory;
        _settings              = settings;
        _aiPrompts             = aiPrompts;
        _logger                = logger;
    }

    public async Task<RecommendationResponse> GetRecommendationsAsync(
        string prompt,
        string? preferredProvider = null,
        string? mood = null,
        string? locationContext = null,
        string? weatherContext = null,
        CancellationToken cancellationToken = default)
    {
        var isInnerWhisper = string.Equals(preferredProvider, "inner-whisper", StringComparison.OrdinalIgnoreCase);
        var isInnerShout   = string.Equals(preferredProvider, "inner-shout",   StringComparison.OrdinalIgnoreCase);
        var useLocal       = isInnerWhisper || isInnerShout;

        var ollamaModel = isInnerShout
            ? await _settings.GetStringAsync("OLLAMA_SHOUT_MODEL",   "gemma4:e4b")
            : await _settings.GetStringAsync("OLLAMA_WHISPER_MODEL", "llama3.1:8b");

        var sessionContext = await _sessionContextBuilder.BuildAsync(cancellationToken);

        var recentHistory    = await _sessionHistory.GetRecentRecommendationHistoryAsync(100);
        var noRepeatBlock    = BuildNoRepeatBlock(recentHistory);

        var avoidedArtistsRaw = await _settings.GetStringAsync("AVOIDED_ARTISTS", "");
        var avoidedArtists    = avoidedArtistsRaw
            .Split('\n', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            .Where(a => !string.IsNullOrWhiteSpace(a))
            .ToList();
        var avoidArtistsBlock = BuildAvoidArtistsBlock(avoidedArtists);

        var annotation = await _aiPrompts.GetMoodAnnotationAsync(mood);
        var moodLine   = annotation is not null ? $"{annotation}\n\n" : string.Empty;
        var envLine    = BuildEnvironmentalContext(locationContext, weatherContext);

        var enrichedPrompt = sessionContext.Preamble is not null
            ? $"{sessionContext.Preamble}\n\n{envLine}{noRepeatBlock}{avoidArtistsBlock}{moodLine}My question: {prompt}"
            : $"{envLine}{noRepeatBlock}{avoidArtistsBlock}{moodLine}{prompt}";

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
                result       = await _ollamaGateway.GetMusicRecommendationAsync(enrichedPrompt, sessionContext.History, ollamaModel, cancellationToken);
                providerUsed = isInnerShout ? "inner-shout" : "inner-whisper";
            }
            catch (Exception ex) when (IsOllamaFailure(ex))
            {
                _logger.LogWarning("[Recommendations] Ollama unavailable ({Reason}) — falling back to Gemini",
                    ex is TaskCanceledException ? "timeout" : "connection refused");
                result       = await _geminiGateway.GetMusicRecommendationAsync(enrichedPrompt, sessionContext.History, cancellationToken);
                providerUsed = "gemini";
                usedFallback = true;
            }
        }
        else
        {
            result       = await _geminiGateway.GetMusicRecommendationAsync(enrichedPrompt, sessionContext.History, cancellationToken);
            providerUsed = "gemini";
        }

        // Server-side safety net: strip any tracks by avoided artists in case the AI slipped one through.
        var tracksToProcess = avoidedArtists.Count > 0
            ? result.Tracks
                .Where(t => !avoidedArtists.Any(a =>
                    string.Equals(a, t.Artist?.Trim(), StringComparison.OrdinalIgnoreCase)))
                .ToList<TrackSuggestion>()
            : (IReadOnlyList<TrackSuggestion>)result.Tracks;
        var filteredCount = result.Tracks.Count - tracksToProcess.Count;

        await _sessionHistory.LogUserChatAsync(prompt, promptTimestamp, mood);
        var aiReplyId = await _sessionHistory.LogAiReplyAsync(result.Narrative, DateTimeOffset.UtcNow);

        var rawTracks = tracksToProcess.Select(t => new RawTrack(t.Title, t.Artist, t.Album)).ToList();
        if (rawTracks.Count > 0)
            await _sessionHistory.LogTrackSuggestionsAsync(rawTracks, aiReplyId);
        await _sessionHistory.SetActiveReplyIdAsync(aiReplyId);

        var (annotatedTracks, message) = await AnnotateWithLocalLibraryAsync(tracksToProcess, cancellationToken);

        var localTracks     = annotatedTracks.Where(t => t.InLocalLibrary).ToList();
        var discoveryTracks = annotatedTracks.Where(t => !t.InLocalLibrary).ToList();

        var freshLocal    = _suggestionCache.ExcludeRecentlySuggested(localTracks);
        var localToReturn = (freshLocal.Count == 0 && localTracks.Count > 0) ? localTracks : freshLocal;

        _logger.LogInformation(
            "[Recommendations] Provider: {Provider}{Fallback} | tracks: {Total}{Filtered} | local: {Local} | discovery: {Discovery} | after cache: {Fresh}{Override}",
            providerUsed,
            usedFallback ? " (fallback)" : string.Empty,
            result.Tracks.Count,
            filteredCount > 0 ? $" ({filteredCount} avoid-filtered)" : string.Empty,
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

    private static string BuildAvoidArtistsBlock(IReadOnlyList<string> artists)
    {
        if (artists.Count == 0) return string.Empty;

        var sb = new System.Text.StringBuilder();
        sb.AppendLine("The following artists are on the user's permanent avoid list — do not recommend any track by these artists under any circumstances:");
        foreach (var a in artists)
            sb.AppendLine($"- {a}");
        sb.AppendLine();
        return sb.ToString();
    }

    private static string BuildNoRepeatBlock(IReadOnlyList<RawTrack> history)
    {
        if (history.Count == 0) return string.Empty;

        var sb = new System.Text.StringBuilder();
        sb.AppendLine("You have already recommended the following tracks recently — do not suggest them again:");
        foreach (var t in history)
            sb.AppendLine($"- {t.Artist} — {t.Title}");
        sb.AppendLine();
        return sb.ToString();
    }

    private static string BuildEnvironmentalContext(string? location, string? weather)
    {
        var parts = new List<string>(2);
        if (!string.IsNullOrWhiteSpace(location)) parts.Add(location.Trim());
        if (!string.IsNullOrWhiteSpace(weather))  parts.Add(weather.Trim());
        return parts.Count > 0 ? string.Join(" ", parts) + "\n\n" : string.Empty;
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
            var threshold = await _settings.GetDoubleAsync("CLEMENTINE_MATCH_THRESHOLD", 0.75);

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
