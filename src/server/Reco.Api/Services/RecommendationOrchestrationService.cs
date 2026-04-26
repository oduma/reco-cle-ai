using Microsoft.Extensions.Options;
using Reco.Api.Configuration;
using Reco.Api.DTOs;

namespace Reco.Api.Services;

public class RecommendationOrchestrationService : IRecommendationOrchestrationService
{
    private readonly IGeminiGatewayService _gemini;
    private readonly IClementineService _clementine;
    private readonly ISuggestionCacheService _suggestionCache;
    private readonly ClementineOptions _clementineOptions;
    private readonly ILogger<RecommendationOrchestrationService> _logger;

    public RecommendationOrchestrationService(
        IGeminiGatewayService gemini,
        IClementineService clementine,
        ISuggestionCacheService suggestionCache,
        IOptions<ClementineOptions> clementineOptions,
        ILogger<RecommendationOrchestrationService> logger)
    {
        _gemini = gemini;
        _clementine = clementine;
        _suggestionCache = suggestionCache;
        _clementineOptions = clementineOptions.Value;
        _logger = logger;
    }

    public async Task<RecommendationResponse> GetRecommendationsAsync(
        string prompt,
        IReadOnlyList<ConversationTurn> history,
        CancellationToken cancellationToken = default)
    {
        _logger.LogInformation(
            "[Recommendations] Requesting from Gemini | history turns: {HistoryCount} | prompt: {Length} chars",
            history.Count, prompt.Length);

        var result = await _gemini.GetMusicRecommendationAsync(prompt, history, cancellationToken);

        var updatedHistory = history
            .Append(new ConversationTurn("user", prompt))
            .Append(new ConversationTurn("model", result.Narrative))
            .ToList();

        var (annotatedTracks, message) = await AnnotateWithLocalLibraryAsync(result.Tracks, cancellationToken);

        var localTracks     = annotatedTracks.Where(t => t.InLocalLibrary).ToList();
        var discoveryTracks = annotatedTracks.Where(t => !t.InLocalLibrary).ToList();

        // Apply cache only to locally owned tracks
        var freshLocal = _suggestionCache.ExcludeRecentlySuggested(localTracks);

        // Override: if all local matches are cached, show them anyway rather than hiding
        var localToReturn = (freshLocal.Count == 0 && localTracks.Count > 0)
            ? localTracks
            : freshLocal;

        _logger.LogInformation(
            "[Recommendations] Gemini: {Total} | local: {Local} | discovery: {Discovery} | after cache: {Fresh}{Override}",
            result.Tracks.Count,
            localTracks.Count,
            discoveryTracks.Count,
            freshLocal.Count,
            freshLocal.Count == 0 && localTracks.Count > 0 ? " (cache overridden)" : string.Empty);

        _suggestionCache.MarkAsSuggested(localToReturn);

        // Preserve Gemini's original order; only drop local tracks excluded by the cache
        var tracksToReturn = annotatedTracks
            .Where(t => !t.InLocalLibrary || localToReturn.Contains(t))
            .ToList();
        return new RecommendationResponse(result.Narrative, tracksToReturn, updatedHistory, message);
    }

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
