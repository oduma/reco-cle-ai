namespace Reco.Api.Models;

public record PromptSet(
    int    Id,
    string Name,
    bool   UseSession,
    string RecommendationPrompt);
