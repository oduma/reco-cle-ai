using System.Net.Http.Json;
using System.Text.Json;
using Microsoft.Extensions.Options;
using Reco.Api.Configuration;
using Reco.Api.DTOs;
using Reco.Api.Models;

namespace Reco.Api.Services;

public class OllamaGatewayService : IOllamaGatewayService
{
    private readonly HttpClient _httpClient;
    private readonly OllamaOptions _options;
    private readonly RecommendationOptions _recommendationOptions;
    private readonly ILogger<OllamaGatewayService> _logger;

    public OllamaGatewayService(
        HttpClient httpClient,
        IOptions<OllamaOptions> options,
        IOptions<RecommendationOptions> recommendationOptions,
        ILogger<OllamaGatewayService> logger)
    {
        _httpClient = httpClient;
        _options = options.Value;
        _recommendationOptions = recommendationOptions.Value;
        _logger = logger;
    }

    private string BuildSystemPrompt() =>
        "You are an expert music discovery assistant. For each user request you must respond with ONLY a " +
        "JSON object — no other text, no markdown, no code blocks.\n\n" +
        "The JSON must have exactly two fields:\n" +
        "- \"narrative\": a warm, conversational paragraph recommending music, written like a knowledgeable curator. " +
        "Mention specific tracks and explain why you are recommending them. " +
        "Wrap every track title and artist name in **double asterisks** — for example: **Kind of Blue** by **Miles Davis**.\n" +
        "- \"tracks\": an array of the specific tracks you mention in your narrative. Each track must have " +
        "\"title\", \"artist\", and optionally \"album\".\n\n" +
        $"Return between {_recommendationOptions.MinTracks} and {_recommendationOptions.MaxTracks} tracks.\n\n" +
        "Example response:\n" +
        "{\n" +
        "  \"narrative\": \"Here are some atmospheric picks for you...\",\n" +
        "  \"tracks\": [\n" +
        "    {\"title\": \"Song Name\", \"artist\": \"Artist Name\", \"album\": \"Album Name\"},\n" +
        "    {\"title\": \"Another Song\", \"artist\": \"Another Artist\"}\n" +
        "  ]\n" +
        "}";

    public async Task<MusicRecommendationResult> GetMusicRecommendationAsync(
        string prompt,
        IReadOnlyList<ConversationTurn> history,
        CancellationToken cancellationToken = default)
    {
        var url = $"{_options.BaseUrl}/v1/chat/completions";

        var messages = new List<object>
        {
            new { role = "system", content = BuildSystemPrompt() }
        };

        // Ollama/OpenAI uses "assistant" where Gemini uses "model"
        foreach (var turn in history)
        {
            var role = turn.Role == "model" ? "assistant" : turn.Role;
            messages.Add(new { role, content = turn.Text });
        }

        messages.Add(new { role = "user", content = prompt });

        var requestBody = new
        {
            model = _options.Model,
            messages,
            stream = false,
            response_format = new { type = "json_object" }
        };

        _logger.LogInformation(
            "[Ollama/Reco] → POST {Url} | model: {Model} | history turns: {HistoryCount} | prompt: {Length} chars",
            url, _options.Model, history.Count, prompt.Length);

        var response = await _httpClient.PostAsJsonAsync(url, requestBody, cancellationToken);

        _logger.LogInformation("[Ollama/Reco] ← {StatusCode} ({Status})",
            (int)response.StatusCode, response.StatusCode);

        response.EnsureSuccessStatusCode();

        var json = await response.Content.ReadFromJsonAsync<JsonElement>(cancellationToken: cancellationToken);

        var rawContent = json
            .GetProperty("choices")[0]
            .GetProperty("message")
            .GetProperty("content")
            .GetString() ?? "{}";

        _logger.LogInformation("[Ollama/Reco] Response JSON length: {Length} chars", rawContent.Length);

        return ParseMusicRecommendation(rawContent);
    }

    private MusicRecommendationResult ParseMusicRecommendation(string rawJson)
    {
        try
        {
            var root = JsonDocument.Parse(rawJson).RootElement;

            var narrative = root.TryGetProperty("narrative", out var n)
                ? n.GetString() ?? string.Empty
                : string.Empty;

            var tracks = new List<TrackSuggestion>();
            if (root.TryGetProperty("tracks", out var tracksEl) &&
                tracksEl.ValueKind == JsonValueKind.Array)
            {
                foreach (var t in tracksEl.EnumerateArray())
                {
                    var title  = t.TryGetProperty("title",  out var ti) ? ti.GetString() ?? "" : "";
                    var artist = t.TryGetProperty("artist", out var ar) ? ar.GetString() ?? "" : "";
                    var album  = t.TryGetProperty("album",  out var al) ? al.GetString() : null;

                    if (title.Length > 0 && artist.Length > 0)
                        tracks.Add(new TrackSuggestion(title, artist, album));
                }
            }

            _logger.LogInformation("[Ollama/Reco] Parsed {Count} tracks from response", tracks.Count);
            return new MusicRecommendationResult(narrative, tracks);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "[Ollama/Reco] Failed to parse recommendation JSON: {Raw}", rawJson);
            return new MusicRecommendationResult(string.Empty, []);
        }
    }
}
