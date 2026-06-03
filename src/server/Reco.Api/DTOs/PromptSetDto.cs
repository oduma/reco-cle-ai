using System.ComponentModel.DataAnnotations;

namespace Reco.Api.DTOs;

public record PromptSetDto(
    int    Id,
    string Name,
    bool   UseSession,
    string RecommendationPrompt);

public record CreatePromptSetRequest(
    [Required][MinLength(1)] string Name,
    bool   UseSession,
    string RecommendationPrompt);

public record UpdatePromptSetRequest(
    [Required][MinLength(1)] string Name,
    bool   UseSession,
    string RecommendationPrompt);

public record SetActivePromptSetRequest(
    [Required][MinLength(1)] string Name);
