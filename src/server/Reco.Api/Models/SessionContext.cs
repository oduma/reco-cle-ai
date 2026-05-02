using Reco.Api.DTOs;

namespace Reco.Api.Models;

public record SessionContext(
    IReadOnlyList<ConversationTurn> History,
    string? Preamble,
    MemoryStatus MemoryStatus
);
