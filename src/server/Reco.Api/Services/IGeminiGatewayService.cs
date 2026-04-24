using Reco.Api.DTOs;

namespace Reco.Api.Services;

public interface IGeminiGatewayService
{
    Task<string> SendMessageAsync(
        string prompt,
        IReadOnlyList<ConversationTurn> history,
        CancellationToken cancellationToken = default);
}
