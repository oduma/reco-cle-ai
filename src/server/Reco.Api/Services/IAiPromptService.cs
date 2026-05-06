namespace Reco.Api.Services;

public interface IAiPromptService
{
    /// <summary>Returns the stored prompt with {sessionMemoryInstruction} substituted.</summary>
    Task<string> GetPromptAsync(string key);

    /// <summary>Returns the recommendation prompt with all three tokens substituted.</summary>
    Task<string> BuildRecommendationPromptAsync(string key, int minTracks, int maxTracks);

    /// <summary>Returns the mood annotation string for a given mood, or null for unknown/normal.</summary>
    Task<string?> GetMoodAnnotationAsync(string? mood);

    /// <summary>Returns every prompt key with its hardcoded default value (used by the reset UI).</summary>
    IReadOnlyDictionary<string, string> GetAllDefaults();
}
