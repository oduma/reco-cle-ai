using Reco.Api.DTOs;

namespace Reco.Api.Services;

public interface IRecommendationOrchestrationService
{
    Task<RecommendationResponse> GetRecommendationsAsync(
        string prompt,
        IReadOnlyList<ConversationTurn> history,
        string? preferredProvider = null,
        CancellationToken cancellationToken = default);
}
