namespace Reco.Api.DTOs;

public record TrackSuggestion(
    string Title,
    string Artist,
    string? Album,
    bool InLocalLibrary = false
);
