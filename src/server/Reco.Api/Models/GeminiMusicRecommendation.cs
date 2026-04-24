using Reco.Api.DTOs;

namespace Reco.Api.Models;

public record GeminiMusicRecommendation(
    string Narrative,
    IReadOnlyList<TrackSuggestion> Tracks
);
