namespace Reco.Api.DTOs;

public record ChatResponse(
    string Response,
    IReadOnlyList<ConversationTurn> History
);
