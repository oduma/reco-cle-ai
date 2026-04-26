using Reco.Api.DTOs;

namespace Reco.Api.Models;

public record MusicRecommendationResult(
    string Narrative,
    IReadOnlyList<TrackSuggestion> Tracks
);
