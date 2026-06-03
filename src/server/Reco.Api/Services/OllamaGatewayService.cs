using System.Net.Http.Json;
using System.Text.Json;
using Reco.Api.DTOs;
using Reco.Api.Models;

namespace Reco.Api.Services;

public class OllamaGatewayService : LlmGatewayBase, IOllamaGatewayService
{
    private readonly HttpClient _httpClient;
    private readonly IAppSettingsService _settings;
    private readonly IAiPromptService _prompts;

    public OllamaGatewayService(
        HttpClient httpClient,
        IAppSettingsService settings,
        IAiPromptService prompts,
        ILogger<OllamaGatewayService> logger)
        : base(logger)
    {
        _httpClient = httpClient;
        _settings   = settings;
        _prompts    = prompts;
    }

    // ── GetMusicRecommendationAsync (default model) ───────────────────────────

    public override async Task<MusicRecommendationResult> GetMusicRecommendationAsync(
        string prompt,
        IReadOnlyList<ConversationTurn> history,
        string? systemInstruction = null,
        CancellationToken cancellationToken = default)
    {
        var model = await _settings.GetStringAsync("OLLAMA_WHISPER_MODEL", "llama3.1:8b");
        return await GetMusicRecommendationAsync(prompt, history, model, systemInstruction, cancellationToken);
    }

    // ── GetMusicRecommendationAsync (explicit model) ──────────────────────────

    public async Task<MusicRecommendationResult> GetMusicRecommendationAsync(
        string prompt,
        IReadOnlyList<ConversationTurn> history,
        string model,
        string? systemInstruction = null,
        CancellationToken cancellationToken = default)
    {
        var baseUrl   = await _settings.GetStringAsync("OLLAMA_BASE_URL", "http://localhost:11434");
        var minTracks = await _settings.GetIntAsync("RECOMMENDATION_MIN_TRACKS", 10);
        var maxTracks = await _settings.GetIntAsync("RECOMMENDATION_MAX_TRACKS", 20);
        var sysInst   = systemInstruction ?? await _prompts.BuildRecommendationPromptAsync(
            AiPromptDefaults.RecommendationInstructionKey, minTracks, maxTracks);
        sysInst = _prompts.BuildSystemInstruction(sysInst, minTracks, maxTracks);

        var messages    = BuildMessages(sysInst, history, prompt);
        var requestBody = new { model, messages, stream = false, response_format = new { type = "json_object" } };
        var url         = $"{baseUrl}/v1/chat/completions";

        Logger.LogInformation("[Ollama/Reco] → POST {Url} | model: {Model} | history: {H} turns | prompt: {L} chars",
            url, model, history.Count, prompt.Length);

        return await ExecuteWithRetryAsync(
            ct => _httpClient.PostAsJsonAsync(url, requestBody, ct),
            async (response, ct) =>
            {
                var json       = await ReadJsonAsync(response, ct);
                var rawContent = json.GetProperty("choices")[0]
                                     .GetProperty("message")
                                     .GetProperty("content").GetString() ?? "{}";
                Logger.LogInformation("[Ollama/Reco] Response JSON: {L} chars", rawContent.Length);
                return ParseMusicRecommendation(rawContent);
            },
            "Ollama/Reco",
            cancellationToken);
    }

    // ── GenerateDiaryEntryAsync ───────────────────────────────────────────────

    public override async Task<string> GenerateDiaryEntryAsync(
        string userPrompt,
        string? model = null,
        CancellationToken cancellationToken = default)
    {
        var baseUrl  = await _settings.GetStringAsync("OLLAMA_BASE_URL", "http://localhost:11434");
        var resolved = model ?? await _settings.GetStringAsync("OLLAMA_WHISPER_MODEL", "llama3.1:8b");
        var sysInst  = await _prompts.GetPromptAsync(AiPromptDefaults.DiarySystemInstructionKey);

        var messages    = BuildMessages(sysInst, [], userPrompt);
        var requestBody = new { model = resolved, messages, stream = false };
        var url         = $"{baseUrl}/v1/chat/completions";

        Logger.LogInformation("[Ollama/Diary] → POST {Url} | model: {Model} | prompt: {L} chars",
            url, resolved, userPrompt.Length);

        return await ExecuteWithRetryAsync(
            ct => _httpClient.PostAsJsonAsync(url, requestBody, ct),
            async (response, ct) =>
            {
                var json = await ReadJsonAsync(response, ct);
                var text = json.GetProperty("choices")[0]
                               .GetProperty("message")
                               .GetProperty("content").GetString() ?? string.Empty;
                Logger.LogInformation("[Ollama/Diary] Response: {L} chars", text.Length);
                return text;
            },
            "Ollama/Diary",
            cancellationToken);
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    private static List<object> BuildMessages(
        string systemInstruction,
        IReadOnlyList<ConversationTurn> history,
        string userPrompt)
    {
        var messages = new List<object>
        {
            new { role = "system", content = systemInstruction }
        };
        foreach (var turn in history)
            messages.Add(new { role = turn.Role == "model" ? "assistant" : turn.Role, content = turn.Text });
        messages.Add(new { role = "user", content = userPrompt });
        return messages;
    }
}
