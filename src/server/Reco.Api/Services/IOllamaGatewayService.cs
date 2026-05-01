using Reco.Api.DTOs;
using Reco.Api.Models;

namespace Reco.Api.Services;

public interface IOllamaGatewayService : ILLMGatewayService
{
    Task<MusicRecommendationResult> GetMusicRecommendationAsync(
        string prompt,
        IReadOnlyList<ConversationTurn> history,
        string model,
        CancellationToken cancellationToken = default);
}
