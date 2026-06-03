using System.Net.Http.Json;
using System.Text.Json;
using Reco.Api.DTOs;
using Reco.Api.Models;

namespace Reco.Api.Services;

public class GeminiGatewayService : LlmGatewayBase, IGeminiGatewayService
{
    private readonly HttpClient _httpClient;
    private readonly IAppSettingsService _settings;
    private readonly IAiPromptService _prompts;

    public GeminiGatewayService(
        HttpClient httpClient,
        IAppSettingsService settings,
        IAiPromptService prompts,
        ILogger<GeminiGatewayService> logger)
        : base(logger)
    {
        _httpClient = httpClient;
        _settings   = settings;
        _prompts    = prompts;
    }

    // ── GetMusicRecommendationAsync ───────────────────────────────────────────

    public override async Task<MusicRecommendationResult> GetMusicRecommendationAsync(
        string prompt,
        IReadOnlyList<ConversationTurn> history,
        string? systemInstruction = null,
        CancellationToken cancellationToken = default)
    {
        var (url, sanitizedUrl) = await BuildUrlAsync();
        var minTracks = await _settings.GetIntAsync("RECOMMENDATION_MIN_TRACKS", 10);
        var maxTracks = await _settings.GetIntAsync("RECOMMENDATION_MAX_TRACKS", 20);
        systemInstruction ??= await _prompts.BuildRecommendationPromptAsync(
            AiPromptDefaults.RecommendationInstructionKey, minTracks, maxTracks);
        systemInstruction = _prompts.BuildSystemInstruction(systemInstruction, minTracks, maxTracks);

        var contents    = BuildContents(history, prompt);
        var requestBody = new
        {
            systemInstruction = new { parts = new[] { new { text = systemInstruction } } },
            contents,
            generationConfig = new
            {
                responseMimeType = "application/json",
                responseSchema = new
                {
                    type = "OBJECT",
                    properties = new
                    {
                        narrative = new { type = "STRING" },
                        tracks = new
                        {
                            type  = "ARRAY",
                            items = new
                            {
                                type = "OBJECT",
                                properties = new
                                {
                                    title  = new { type = "STRING" },
                                    artist = new { type = "STRING" },
                                    album  = new { type = "STRING" }
                                },
                                required = new[] { "title", "artist" }
                            }
                        }
                    },
                    required = new[] { "narrative", "tracks" }
                }
            }
        };

        Logger.LogInformation("[Gemini/Reco] → POST {Url} | history: {H} turns | prompt: {L} chars",
            sanitizedUrl, history.Count, prompt.Length);

        return await ExecuteWithRetryAsync(
            ct => _httpClient.PostAsJsonAsync(url, requestBody, ct),
            async (response, ct) =>
            {
                var json    = await ReadJsonAsync(response, ct);
                var rawText = json.GetProperty("candidates")[0]
                                  .GetProperty("content").GetProperty("parts")[0]
                                  .GetProperty("text").GetString() ?? "{}";
                Logger.LogInformation("[Gemini/Reco] Response JSON: {L} chars", rawText.Length);
                return ParseMusicRecommendation(rawText);
            },
            "Gemini/Reco",
            cancellationToken);
    }

    // ── GenerateDiaryEntryAsync ───────────────────────────────────────────────

    public override async Task<string> GenerateDiaryEntryAsync(
        string userPrompt,
        string? model = null,
        CancellationToken cancellationToken = default)
    {
        var (url, sanitizedUrl) = await BuildUrlAsync();
        var systemInstruction   = await _prompts.GetPromptAsync(AiPromptDefaults.DiarySystemInstructionKey);

        var requestBody = new
        {
            systemInstruction = new { parts = new[] { new { text = systemInstruction } } },
            contents = new[] { new { role = "user", parts = new[] { new { text = userPrompt } } } }
        };

        Logger.LogInformation("[Gemini/Diary] → POST {Url} | prompt: {L} chars", sanitizedUrl, userPrompt.Length);

        return await ExecuteWithRetryAsync(
            ct => _httpClient.PostAsJsonAsync(url, requestBody, ct),
            async (response, ct) =>
            {
                var json = await ReadJsonAsync(response, ct);
                var text = json.GetProperty("candidates")[0]
                               .GetProperty("content").GetProperty("parts")[0]
                               .GetProperty("text").GetString();
                Logger.LogInformation("[Gemini/Diary] Response: {L} chars", text?.Length ?? 0);
                return text ?? throw new InvalidOperationException("Gemini returned empty diary text.");
            },
            "Gemini/Diary",
            cancellationToken);
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    private async Task<(string url, string sanitizedUrl)> BuildUrlAsync()
    {
        var apiKey  = await _settings.GetStringAsync("GEMINI_API_KEY",  "");
        var gemModel = await _settings.GetStringAsync("GEMINI_MODEL",   "gemini-2.5-pro");
        var baseUrl = await _settings.GetStringAsync("GEMINI_BASE_URL", "https://generativelanguage.googleapis.com");
        var url          = $"{baseUrl}/v1beta/models/{gemModel}:generateContent?key={apiKey}";
        var sanitizedUrl = $"{baseUrl}/v1beta/models/{gemModel}:generateContent?key=***";
        return (url, sanitizedUrl);
    }

    private static List<object> BuildContents(IReadOnlyList<ConversationTurn> history, string prompt) =>
        history
            .Select(t => (object)new { role = t.Role, parts = new[] { new { text = t.Text } } })
            .Append(new { role = "user", parts = new[] { new { text = prompt } } })
            .ToList();
}
