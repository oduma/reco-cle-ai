using Reco.Api.DTOs;

namespace Reco.Api.Services;

public class DiaryService : IDiaryService
{
    private readonly IDiaryRepository _repo;
    private readonly IGeminiGatewayService _gemini;
    private readonly IOllamaGatewayService _ollama;
    private readonly IAppSettingsService _appSettings;
    private readonly ILogger<DiaryService> _logger;

    public DiaryService(
        IDiaryRepository repo,
        IGeminiGatewayService gemini,
        IOllamaGatewayService ollama,
        IAppSettingsService appSettings,
        ILogger<DiaryService> logger)
    {
        _repo        = repo;
        _gemini      = gemini;
        _ollama      = ollama;
        _appSettings = appSettings;
        _logger      = logger;
    }

    public Task<IReadOnlyList<string>> GetActiveDatesAsync() =>
        _repo.GetActiveDatesAsync();

    public async Task<DiaryEntryResponse> GetOrGenerateEntryAsync(
        string date, bool force, string? provider = null, CancellationToken cancellationToken = default)
    {
        if (!IsValidPastDate(date))
            throw new ArgumentException($"Date must be a past date in YYYY-MM-DD format. Got: {date}");

        if (!force)
        {
            var cached = await _repo.GetCachedEntryContentAsync(date);
            if (cached is not null)
            {
                var generatedAt = await _repo.GetEntryGeneratedAtAsync(date) ?? DateTimeOffset.UtcNow;
                _logger.LogInformation("[Diary] Cache hit for {Date}", date);
                return new DiaryEntryResponse(cached, IsFromCache: true, generatedAt);
            }
        }

        var dayData = await _repo.GetDayDataAsync(date);
        if (dayData is null || dayData.Prompts.Count == 0)
            throw new InvalidOperationException($"No conversation data found for {date}.");

        var prompt = BuildDiaryPrompt(dayData);
        _logger.LogInformation("[Diary] Generating entry for {Date} via {Provider} ({Count} prompts)",
            date, provider ?? "gemini", dayData.Prompts.Count);

        var gateway = await ResolveGatewayAsync(provider);
        var model   = await ResolveModelAsync(provider);

        var content = await gateway.GenerateDiaryEntryAsync(prompt, model, cancellationToken);
        var now     = DateTimeOffset.UtcNow;

        await _repo.SaveEntryAsync(date, content, now);
        return new DiaryEntryResponse(content, IsFromCache: false, now);
    }

    private ILLMGatewayService ResolveGateway(string? provider) => provider switch
    {
        "inner-whisper" => _ollama,
        "inner-shout"   => _ollama,
        _               => _gemini
    };

    private async Task<ILLMGatewayService> ResolveGatewayAsync(string? provider) =>
        await Task.FromResult(ResolveGateway(provider));

    private async Task<string?> ResolveModelAsync(string? provider) => provider switch
    {
        "inner-shout"   => await _appSettings.GetStringAsync("OLLAMA_SHOUT_MODEL",   "gemma4:e4b"),
        "inner-whisper" => await _appSettings.GetStringAsync("OLLAMA_WHISPER_MODEL", "llama3.1:8b"),
        _               => null
    };

    private static string BuildDiaryPrompt(Models.DiaryDayData dayData)
    {
        var lines = new System.Text.StringBuilder();
        lines.AppendLine($"Date: {dayData.Date}");
        lines.AppendLine();
        lines.AppendLine("User's music exploration prompts throughout this day:");
        lines.AppendLine();

        foreach (var p in dayData.Prompts)
        {
            var timeLabel = p.Timestamp.ToLocalTime().ToString("HH:mm");
            var moodTag   = p.Mood is not null and not "normal" ? $" [{p.Mood}]" : string.Empty;
            lines.AppendLine($"- {timeLabel}{moodTag}: {p.Prompt}");
        }

        return lines.ToString().TrimEnd();
    }

    private static bool IsValidPastDate(string date)
    {
        if (!DateOnly.TryParse(date, out var parsed)) return false;
        return parsed < DateOnly.FromDateTime(DateTime.UtcNow.Date);
    }
}
