namespace Reco.Api.DTOs;

public record EnrichedSuggestionsResponse(
    IReadOnlyList<TrackSuggestion> Suggestions,
    string? Message
);
