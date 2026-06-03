namespace Reco.Api.Data.Entities;

public class PromptSetEntity
{
    public int    Id                   { get; set; }
    public string Name                 { get; set; } = "";
    public int    UseSession           { get; set; } = 1;
    public string RecommendationPrompt { get; set; } = "";
    public string CreatedAt            { get; set; } = "";
    public string UpdatedAt            { get; set; } = "";
}
