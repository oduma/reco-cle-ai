namespace Reco.Api.DTOs;

public record SessionHistoryResponse(
    IReadOnlyList<HistoryTurnDto> Turns,
    int? ActiveReplyId
);

public record HistoryTurnDto(
    string Role,
    string Text,
    DateTimeOffset Timestamp,
    int EventId,
    bool HasSuggestions
);
