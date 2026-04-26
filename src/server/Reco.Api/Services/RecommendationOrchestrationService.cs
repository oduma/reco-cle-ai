using Microsoft.Extensions.Options;
using Reco.Api.Configuration;
using Reco.Api.DTOs;
using Reco.Api.Models;

namespace Reco.Api.Services;

public class RecommendationOrchestrationService : IRecommendationOrchestrationService
{
    private readonly GeminiGatewayService _geminiGateway;
    private readonly OllamaGatewayService _ollamaGateway;
    private readonly IClementineService _clementine;
    private readonly ISuggestionCacheService _suggestionCache;
    private readonly ClementineOptions _clementineOptions;
    private readonly ILogger<RecommendationOrchestrationService> _logger;

    public RecommendationOrchestrationService(
        GeminiGatewayService geminiGateway,
        OllamaGatewayService ollamaGateway,
        IClementineService clementine,
        ISuggestionCacheService suggestionCache,
        IOptions<ClementineOptions> clementineOptions,
        ILogger<RecommendationOrchestrationService> logger)
    {
        _geminiGateway = geminiGateway;
        _ollamaGateway = ollamaGateway;
        _clementine = clementine;
        _suggestionCache = suggestionCache;
        _clementineOptions = clementineOptions.Value;
        _logger = logger;
    }

    public async Task<RecommendationResponse> GetRecommendationsAsync(
        string prompt,
        IReadOnlyList<ConversationTurn> history,
        string? preferredProvider = null,
        CancellationToken cancellationToken = default)
    {
        var useLocal = string.Equals(preferredProvider, "local", StringComparison.OrdinalIgnoreCase);

        _logger.LogInformation(
            "[Recommendations] Requesting | provider: {Provider} | history turns: {HistoryCount} | prompt: {Length} chars",
            useLocal ? "local" : "gemini", history.Count, prompt.Length);

        MusicRecommendationResult result;
        string providerUsed;
        bool usedFallback = false;

        if (useLocal)
        {
            try
            {
                result = await _ollamaGateway.GetMusicRecommendationAsync(prompt, history, cancellationToken);
                providerUsed = "local";
            }
            catch (Exception ex) when (IsOllamaFailure(ex))
            {
                _logger.LogWarning("[Recommendations] Ollama unavailable ({Reason}) — falling back to Gemini",
                    ex is TaskCanceledException ? "timeout" : "connection refused");
                result = await _geminiGateway.GetMusicRecommendationAsync(prompt, history, cancellationToken);
                providerUsed = "gemini";
                usedFallback = true;
            }
        }
        else
        {
            result = await _geminiGateway.GetMusicRecommendationAsync(prompt, history, cancellationToken);
            providerUsed = "gemini";
        }

        var updatedHistory = history
            .Append(new ConversationTurn("user", prompt))
            .Append(new ConversationTurn("model", result.Narrative))
            .ToList();

        var (annotatedTracks, message) = await AnnotateWithLocalLibraryAsync(result.Tracks, cancellationToken);

        var localTracks     = annotatedTracks.Where(t => t.InLocalLibrary).ToList();
        var discoveryTracks = annotatedTracks.Where(t => !t.InLocalLibrary).ToList();

        var freshLocal = _suggestionCache.ExcludeRecentlySuggested(localTracks);
        var localToReturn = (freshLocal.Count == 0 && localTracks.Count > 0) ? localTracks : freshLocal;

        _logger.LogInformation(
            "[Recommendations] Provider: {Provider}{Fallback} | Gemini: {Total} | local: {Local} | discovery: {Discovery} | after cache: {Fresh}{Override}",
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

        return new RecommendationResponse(result.Narrative, tracksToReturn, updatedHistory, message, providerUsed, usedFallback);
    }

    private static bool IsOllamaFailure(Exception ex) =>
        ex is TaskCanceledException ||                          // timeout
        (ex is HttpRequestException http && http.StatusCode is null); // connection refused — Ollama not running

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
                .Select(s => s with { InLocalLibrary = inventory.Any(local => TrackMatcher.IsMatch(s, local, threshold)) })
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
