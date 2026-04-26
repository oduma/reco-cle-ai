namespace Reco.Api.Configuration;

public class RecommendationOptions
{
    public const string SectionName = "Recommendation";

    public int MinTracks { get; set; } = 10;
    public int MaxTracks { get; set; } = 20;
    public int SuggestionCacheDurationMinutes { get; set; } = 60;
}
