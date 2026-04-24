using Reco.Api.DTOs;
using Reco.Api.Models;

namespace Reco.Api.Services;

public interface IGeminiGatewayService
{
    Task<string> SendMessageAsync(
        string prompt,
        IReadOnlyList<ConversationTurn> history,
        CancellationToken cancellationToken = default);

    Task<GeminiMusicRecommendation> GetMusicRecommendationAsync(
        string prompt,
        IReadOnlyList<ConversationTurn> history,
        CancellationToken cancellationToken = default);
}
