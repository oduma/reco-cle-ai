using System.ComponentModel.DataAnnotations;

namespace Reco.Api.DTOs;

public record RecommendationRequest(
    [Required][MinLength(1)] string Prompt,
    IReadOnlyList<ConversationTurn>? History
);
