using Reco.Api.DTOs;

namespace Reco.Api.Services;

public class RecommendationOrchestrationService : IRecommendationOrchestrationService
{
    private readonly IGeminiGatewayService _gemini;
    private readonly ILogger<RecommendationOrchestrationService> _logger;

    public RecommendationOrchestrationService(
        IGeminiGatewayService gemini,
        ILogger<RecommendationOrchestrationService> logger)
    {
        _gemini = gemini;
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

        var message = result.Tracks.Count == 0
            ? "No specific tracks were identified for this request."
            : null;

        _logger.LogInformation(
            "[Recommendations] Returning {Count} tracks | narrative length: {Length} chars",
            result.Tracks.Count, result.Narrative.Length);

        return new RecommendationResponse(result.Narrative, result.Tracks, updatedHistory, message);
    }
}
