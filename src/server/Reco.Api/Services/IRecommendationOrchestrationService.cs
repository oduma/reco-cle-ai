using Reco.Api.DTOs;

namespace Reco.Api.Services;

public interface IRecommendationOrchestrationService
{
    Task<RecommendationResponse> GetRecommendationsAsync(
        string prompt,
        string? preferredProvider = null,
        CancellationToken cancellationToken = default);
}
