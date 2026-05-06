using Reco.Api.DTOs;
using Reco.Api.Models;

namespace Reco.Api.Services;

public interface ILLMGatewayService
{
    Task<MusicRecommendationResult> GetMusicRecommendationAsync(
        string prompt,
        IReadOnlyList<ConversationTurn> history,
        CancellationToken cancellationToken = default);

    Task<string> GenerateDiaryEntryAsync(
        string userPrompt,
        string? model = null,
        CancellationToken cancellationToken = default);
}
