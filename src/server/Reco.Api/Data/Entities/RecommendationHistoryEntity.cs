namespace Reco.Api.Data.Entities;

public class RecommendationHistoryEntity
{
    public int     Id         { get; set; }
    public string  Artist     { get; set; } = "";
    public string  Title      { get; set; } = "";
    public string? Album      { get; set; }
    public string  RecordedAt { get; set; } = "";
}
