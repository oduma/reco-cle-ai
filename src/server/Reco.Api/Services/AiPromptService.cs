using System.Globalization;

namespace Reco.Api.Services;

public class AiPromptService : IAiPromptService
{
    private readonly IAppSettingsService _settings;

    public AiPromptService(IAppSettingsService settings) => _settings = settings;

    public async Task<string> GetPromptAsync(string key)
    {
        var template     = await _settings.GetStringAsync(key, AiPromptDefaults.Get(key));
        var sessionMemory = await _settings.GetStringAsync(
            AiPromptDefaults.SessionMemoryInstructionKey,
            AiPromptDefaults.SessionMemoryInstruction);

        return template.Replace("{sessionMemoryInstruction}", sessionMemory, StringComparison.Ordinal);
    }

    public async Task<string> BuildRecommendationPromptAsync(string key, int minTracks, int maxTracks)
    {
        var prompt = await GetPromptAsync(key);
        return prompt
            .Replace("{minTracks}", minTracks.ToString(CultureInfo.InvariantCulture), StringComparison.Ordinal)
            .Replace("{maxTracks}", maxTracks.ToString(CultureInfo.InvariantCulture), StringComparison.Ordinal);
    }

    public async Task<string?> GetMoodAnnotationAsync(string? mood)
    {
        if (string.IsNullOrWhiteSpace(mood)) return null;
        var key          = $"MOOD_ANNOTATION_{mood.ToUpperInvariant()}";
        var defaultValue = AiPromptDefaults.GetMoodAnnotation(mood);
        if (defaultValue is null) return null;
        var value = await _settings.GetStringAsync(key, defaultValue);
        return string.IsNullOrWhiteSpace(value) ? null : value;
    }

    public IReadOnlyDictionary<string, string> GetAllDefaults() => AiPromptDefaults.All;
}
