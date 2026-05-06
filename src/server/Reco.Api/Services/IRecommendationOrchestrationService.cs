using Reco.Api.DTOs;

namespace Reco.Api.Services;

public interface IRecommendationOrchestrationService
{
    Task<RecommendationResponse> GetRecommendationsAsync(
        string prompt,
        string? preferredProvider = null,
        string? mood = null,
        string? locationContext = null,
        string? weatherContext = null,
        CancellationToken cancellationToken = default);
}
