namespace Reco.Api.DTOs;

public record RecommendationResponse(
    string Narrative,
    IReadOnlyList<TrackSuggestion> Suggestions,
    IReadOnlyList<ConversationTurn> History,
    string? Message
);
