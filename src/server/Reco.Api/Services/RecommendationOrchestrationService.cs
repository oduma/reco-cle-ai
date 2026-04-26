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

        var (matchedTracks, message) = await FilterAgainstLocalLibraryAsync(result.Tracks, cancellationToken);

        var freshTracks = _suggestionCache.ExcludeRecentlySuggested(matchedTracks);

        // Override cache exclusion when all local matches have been recently suggested
        var tracksToReturn = (freshTracks.Count == 0 && matchedTracks.Count > 0)
            ? matchedTracks
            : freshTracks;

        _logger.LogInformation(
            "[Recommendations] Gemini: {Total} | local match: {Matched} | after cache: {Fresh}{Override}",
            result.Tracks.Count,
            matchedTracks.Count,
            freshTracks.Count,
            freshTracks.Count == 0 && matchedTracks.Count > 0 ? " (cache overridden — all matches already suggested)" : string.Empty);

        _suggestionCache.MarkAsSuggested(tracksToReturn);

        return new RecommendationResponse(result.Narrative, tracksToReturn, updatedHistory, message);
    }

    private async Task<(IReadOnlyList<TrackSuggestion> Tracks, string? Message)> FilterAgainstLocalLibraryAsync(
        IReadOnlyList<TrackSuggestion> suggestions,
        CancellationToken cancellationToken)
    {
        if (suggestions.Count == 0)
            return (suggestions, "No specific tracks were identified for this request.");

        try
        {
            var inventory = await _clementine.LoadInventoryAsync(cancellationToken);
            var threshold = _clementineOptions.MatchThreshold;

            var matched = suggestions
                .Where(s => inventory.Any(local => TrackMatcher.IsMatch(s, local, threshold)))
                .ToList();

            var message = matched.Count == 0
                ? "None of the suggested tracks were found in your local library."
                : null;

            return (matched, message);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "[Recommendations] Local library unavailable — returning empty suggestions");
            return (
                [],
                "Your local library is currently unavailable. Check that the database copy exists at the configured path."
            );
        }
    }
}
