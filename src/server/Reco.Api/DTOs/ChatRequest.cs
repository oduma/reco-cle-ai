using System.ComponentModel.DataAnnotations;

namespace Reco.Api.DTOs;

public record ChatRequest(
    [Required][MinLength(1)] string Prompt,
    IReadOnlyList<ConversationTurn>? History
);
