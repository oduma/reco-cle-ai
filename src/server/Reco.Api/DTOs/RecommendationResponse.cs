namespace Reco.Api.DTOs;

public record RecommendationResponse(
    string Narrative,
    IReadOnlyList<TrackSuggestion> Suggestions,
    string? Message,
    string ProviderUsed,
    bool UsedFallback
);
