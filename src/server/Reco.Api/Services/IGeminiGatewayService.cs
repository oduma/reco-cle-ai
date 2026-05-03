using Reco.Api.DTOs;
using Reco.Api.Models;

namespace Reco.Api.Services;

public interface IGeminiGatewayService : ILLMGatewayService
{
    Task<string> SendMessageAsync(
        string prompt,
        IReadOnlyList<ConversationTurn> history,
        CancellationToken cancellationToken = default);

    Task<string> GenerateDiaryEntryAsync(
        string userPrompt,
        CancellationToken cancellationToken = default);
}
