using System.Net.Http.Json;
using System.Text.Json;
using Microsoft.Extensions.Options;
using Reco.Api.Configuration;
using Reco.Api.DTOs;
using Reco.Api.Models;

namespace Reco.Api.Services;

public class GeminiGatewayService : IGeminiGatewayService
{
    private readonly HttpClient _httpClient;
    private readonly GeminiOptions _options;
    private readonly RecommendationOptions _recommendationOptions;
    private readonly ILogger<GeminiGatewayService> _logger;

    private const string ChatSystemInstruction =
        "You are an expert music discovery assistant. Help users discover music by providing thoughtful, " +
        "personalized recommendations. When suggesting music, include artist names, album names where " +
        "relevant, and brief explanations of why you're recommending them. Be conversational, engaging, " +
        "and genuinely knowledgeable about music across all genres and eras.";

    private string BuildRecommendationSystemInstruction() =>
        "You are an expert music discovery assistant. For each user request you must respond with a JSON object " +
        "containing exactly two fields:\n" +
        "- \"narrative\": a warm, conversational paragraph recommending music, written like a knowledgeable curator. " +
        "Mention specific tracks and explain why you are recommending them.\n" +
        "- \"tracks\": an array of the specific tracks you mention in your narrative. Each track must have " +
        "\"title\", \"artist\", and optionally \"album\".\n" +
        $"Return between {_recommendationOptions.MinTracks} and {_recommendationOptions.MaxTracks} tracks. " +
        "Always return valid JSON and nothing else.";

    public GeminiGatewayService(
        HttpClient httpClient,
        IOptions<GeminiOptions> options,
        IOptions<RecommendationOptions> recommendationOptions,
        ILogger<GeminiGatewayService> logger)
    {
        _httpClient = httpClient;
        _options = options.Value;
        _recommendationOptions = recommendationOptions.Value;
        _logger = logger;
    }

    private const int MaxRetries = 3;
    private static readonly TimeSpan[] FallbackRetryDelays =
        [TimeSpan.FromSeconds(5), TimeSpan.FromSeconds(15), TimeSpan.FromSeconds(30)];

    public async Task<string> SendMessageAsync(
        string prompt,
        IReadOnlyList<ConversationTurn> history,
        CancellationToken cancellationToken = default)
    {
        var url = $"{_options.BaseUrl}/v1beta/models/{_options.Model}:generateContent?key={_options.ApiKey}";

        var contents = history
            .Select(t => new { role = t.Role, parts = new[] { new { text = t.Text } } })
            .Append(new { role = "user", parts = new[] { new { text = prompt } } })
            .Cast<object>()
            .ToList();

        var requestBody = new
        {
            systemInstruction = new { parts = new[] { new { text = ChatSystemInstruction } } },
            contents
        };

        var sanitizedUrl = $"{_options.BaseUrl}/v1beta/models/{_options.Model}:generateContent?key=***";

        for (var attempt = 0; attempt <= MaxRetries; attempt++)
        {
            try
            {
                _logger.LogInformation(
                    "[Gemini/Chat] → POST {Url} | history turns: {HistoryCount} | prompt length: {PromptLength} chars",
                    sanitizedUrl, history.Count, prompt.Length);

                var response = await _httpClient.PostAsJsonAsync(url, requestBody, cancellationToken);

                _logger.LogInformation("[Gemini/Chat] ← {StatusCode} ({Status})",
                    (int)response.StatusCode, response.StatusCode);

                string? errorBody = null;
                if (!response.IsSuccessStatusCode)
                {
                    var retryAfter = response.Headers.RetryAfter?.Delta ?? response.Headers.RetryAfter?.Date - DateTimeOffset.UtcNow;
                    errorBody = await response.Content.ReadAsStringAsync(cancellationToken);
                    _logger.LogWarning("[Gemini/Chat] Error response body: {Body}", errorBody);
                    if (retryAfter.HasValue)
                        _logger.LogWarning("[Gemini/Chat] Retry-After: {RetryAfter}", retryAfter.Value);
                }

                if (response.StatusCode == System.Net.HttpStatusCode.TooManyRequests && attempt < MaxRetries)
                {
                    var delay = ParseRetryDelay(errorBody) ?? FallbackRetryDelays[attempt];
                    _logger.LogWarning("[Gemini/Chat] Rate limit hit, retrying in {Delay}s (attempt {Attempt}/{Max})",
                        delay.TotalSeconds, attempt + 1, MaxRetries);
                    await Task.Delay(delay, cancellationToken);
                    continue;
                }

                response.EnsureSuccessStatusCode();

                var json = await response.Content.ReadFromJsonAsync<JsonElement>(cancellationToken: cancellationToken);

                var text = json
                    .GetProperty("candidates")[0]
                    .GetProperty("content")
                    .GetProperty("parts")[0]
                    .GetProperty("text")
                    .GetString();

                _logger.LogInformation("[Gemini/Chat] Response text length: {Length} chars", text?.Length ?? 0);
                return text ?? throw new InvalidOperationException("Gemini returned an empty response text.");
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, "HTTP error calling Gemini API for model {Model}", _options.Model);
                throw;
            }
            catch (Exception ex) when (ex is not OperationCanceledException and not InvalidOperationException)
            {
                _logger.LogError(ex, "Unexpected error calling Gemini API");
                throw;
            }
        }

        throw new HttpRequestException("Gemini rate limit exceeded after retries.",
            null, System.Net.HttpStatusCode.TooManyRequests);
    }

    public async Task<GeminiMusicRecommendation> GetMusicRecommendationAsync(
        string prompt,
        IReadOnlyList<ConversationTurn> history,
        CancellationToken cancellationToken = default)
    {
        var url = $"{_options.BaseUrl}/v1beta/models/{_options.Model}:generateContent?key={_options.ApiKey}";
        var sanitizedUrl = $"{_options.BaseUrl}/v1beta/models/{_options.Model}:generateContent?key=***";

        var contents = history
            .Select(t => new { role = t.Role, parts = new[] { new { text = t.Text } } })
            .Append(new { role = "user", parts = new[] { new { text = prompt } } })
            .Cast<object>()
            .ToList();

        var requestBody = new
        {
            systemInstruction = new { parts = new[] { new { text = BuildRecommendationSystemInstruction() } } },
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
                            type = "ARRAY",
                            items = new
                            {
                                type = "OBJECT",
                                properties = new
                                {
                                    title = new { type = "STRING" },
                                    artist = new { type = "STRING" },
                                    album = new { type = "STRING" }
                                },
                                required = new[] { "title", "artist" }
                            }
                        }
                    },
                    required = new[] { "narrative", "tracks" }
                }
            }
        };

        for (var attempt = 0; attempt <= MaxRetries; attempt++)
        {
            _logger.LogInformation(
                "[Gemini/Reco] → POST {Url} | history turns: {HistoryCount} | prompt length: {PromptLength} chars",
                sanitizedUrl, history.Count, prompt.Length);

            var response = await _httpClient.PostAsJsonAsync(url, requestBody, cancellationToken);

            _logger.LogInformation("[Gemini/Reco] ← {StatusCode} ({Status})",
                (int)response.StatusCode, response.StatusCode);

            string? errorBody = null;
            if (!response.IsSuccessStatusCode)
            {
                errorBody = await response.Content.ReadAsStringAsync(cancellationToken);
                _logger.LogWarning("[Gemini/Reco] Error response body: {Body}", errorBody);
            }

            if (response.StatusCode == System.Net.HttpStatusCode.TooManyRequests && attempt < MaxRetries)
            {
                var delay = ParseRetryDelay(errorBody) ?? FallbackRetryDelays[attempt];
                _logger.LogWarning("[Gemini/Reco] Rate limit hit, retrying in {Delay}s (attempt {Attempt}/{Max})",
                    delay.TotalSeconds, attempt + 1, MaxRetries);
                await Task.Delay(delay, cancellationToken);
                continue;
            }

            response.EnsureSuccessStatusCode();

            var json = await response.Content.ReadFromJsonAsync<JsonElement>(cancellationToken: cancellationToken);
            var rawText = json
                .GetProperty("candidates")[0]
                .GetProperty("content")
                .GetProperty("parts")[0]
                .GetProperty("text")
                .GetString() ?? "{}";

            _logger.LogInformation("[Gemini/Reco] Response JSON length: {Length} chars", rawText.Length);

            return ParseMusicRecommendation(rawText);
        }

        throw new HttpRequestException("Gemini rate limit exceeded after retries.",
            null, System.Net.HttpStatusCode.TooManyRequests);
    }

    private GeminiMusicRecommendation ParseMusicRecommendation(string rawJson)
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
                    var title = t.TryGetProperty("title", out var ti) ? ti.GetString() ?? "" : "";
                    var artist = t.TryGetProperty("artist", out var ar) ? ar.GetString() ?? "" : "";
                    var album = t.TryGetProperty("album", out var al) ? al.GetString() : null;

                    if (title.Length > 0 && artist.Length > 0)
                        tracks.Add(new TrackSuggestion(title, artist, album));
                }
            }

            _logger.LogInformation("[Gemini/Reco] Parsed {Count} tracks from response", tracks.Count);
            return new GeminiMusicRecommendation(narrative, tracks);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "[Gemini/Reco] Failed to parse recommendation JSON: {Raw}", rawJson);
            return new GeminiMusicRecommendation(string.Empty, []);
        }
    }

    private static TimeSpan? ParseRetryDelay(string? errorBody)
    {
        if (string.IsNullOrEmpty(errorBody)) return null;
        try
        {
            var doc = JsonDocument.Parse(errorBody);
            if (!doc.RootElement.TryGetProperty("error", out var error)) return null;
            if (!error.TryGetProperty("details", out var details)) return null;

            foreach (var detail in details.EnumerateArray())
            {
                if (detail.TryGetProperty("retryDelay", out var delayProp))
                {
                    var raw = delayProp.GetString();
                    if (raw != null && raw.EndsWith('s') &&
                        double.TryParse(raw[..^1], out var seconds) && seconds > 0)
                        return TimeSpan.FromSeconds(seconds);
                }
            }
        }
        catch { /* non-critical: fall back to hardcoded delays */ }
        return null;
    }
}
