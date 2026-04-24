using System.Net.Http.Json;
using System.Text.Json;
using Microsoft.Extensions.Options;
using Reco.Api.Configuration;
using Reco.Api.DTOs;

namespace Reco.Api.Services;

public class GeminiGatewayService : IGeminiGatewayService
{
    private readonly HttpClient _httpClient;
    private readonly GeminiOptions _options;
    private readonly ILogger<GeminiGatewayService> _logger;

    private const string SystemInstruction =
        "You are an expert music discovery assistant. Help users discover music by providing thoughtful, " +
        "personalized recommendations. When suggesting music, include artist names, album names where " +
        "relevant, and brief explanations of why you're recommending them. Be conversational, engaging, " +
        "and genuinely knowledgeable about music across all genres and eras.";

    public GeminiGatewayService(
        HttpClient httpClient,
        IOptions<GeminiOptions> options,
        ILogger<GeminiGatewayService> logger)
    {
        _httpClient = httpClient;
        _options = options.Value;
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
            systemInstruction = new { parts = new[] { new { text = SystemInstruction } } },
            contents
        };

        var sanitizedUrl = $"{_options.BaseUrl}/v1beta/models/{_options.Model}:generateContent?key=***";

        for (var attempt = 0; attempt <= MaxRetries; attempt++)
        {
            try
            {
                _logger.LogInformation(
                    "[Gemini] → POST {Url} | history turns: {HistoryCount} | prompt length: {PromptLength} chars",
                    sanitizedUrl, history.Count, prompt.Length);

                var response = await _httpClient.PostAsJsonAsync(url, requestBody, cancellationToken);

                _logger.LogInformation("[Gemini] ← {StatusCode} ({Status})",
                    (int)response.StatusCode, response.StatusCode);

                string? errorBody = null;
                if (!response.IsSuccessStatusCode)
                {
                    var retryAfter = response.Headers.RetryAfter?.Delta ?? response.Headers.RetryAfter?.Date - DateTimeOffset.UtcNow;
                    errorBody = await response.Content.ReadAsStringAsync(cancellationToken);
                    _logger.LogWarning("[Gemini] Error response body: {Body}", errorBody);
                    if (retryAfter.HasValue)
                        _logger.LogWarning("[Gemini] Retry-After: {RetryAfter}", retryAfter.Value);
                }

                if (response.StatusCode == System.Net.HttpStatusCode.TooManyRequests && attempt < MaxRetries)
                {
                    var delay = ParseRetryDelay(errorBody) ?? FallbackRetryDelays[attempt];
                    _logger.LogWarning("[Gemini] Rate limit hit, retrying in {Delay}s (attempt {Attempt}/{Max})",
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

                _logger.LogInformation("[Gemini] Response text length: {Length} chars", text?.Length ?? 0);
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

        // All retries exhausted — throw a 429 so the controller can handle it
        throw new HttpRequestException("Gemini rate limit exceeded after retries.",
            null, System.Net.HttpStatusCode.TooManyRequests);
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
