using System.Net.Http.Json;
using System.Text.Json;
using Microsoft.Extensions.Logging;
using Reco.Api.DTOs;
using Reco.Api.Models;

namespace Reco.Api.Services;

/// <summary>
/// Shared infrastructure for all LLM gateway services:
/// rate-limit retry loop, JSON response parsing, and logging helpers.
/// </summary>
public abstract class LlmGatewayBase : ILLMGatewayService
{
    protected const int MaxRetries = 3;
    protected static readonly TimeSpan[] FallbackRetryDelays =
        [TimeSpan.FromSeconds(5), TimeSpan.FromSeconds(15), TimeSpan.FromSeconds(30)];

    protected readonly ILogger Logger;

    protected LlmGatewayBase(ILogger logger) => Logger = logger;

    // ── Shared retry loop ─────────────────────────────────────────────────────

    protected async Task<T> ExecuteWithRetryAsync<T>(
        Func<CancellationToken, Task<HttpResponseMessage>> sendRequest,
        Func<HttpResponseMessage, CancellationToken, Task<T>> parseResponse,
        string operationName,
        CancellationToken cancellationToken)
    {
        for (var attempt = 0; attempt <= MaxRetries; attempt++)
        {
            var response = await sendRequest(cancellationToken);

            string? errorBody = null;
            if (!response.IsSuccessStatusCode)
            {
                errorBody = await response.Content.ReadAsStringAsync(cancellationToken);
                Logger.LogWarning("[{Op}] Error response body: {Body}", operationName, errorBody);
            }

            if (response.StatusCode == System.Net.HttpStatusCode.TooManyRequests && attempt < MaxRetries)
            {
                var delay = ParseRetryDelay(errorBody) ?? FallbackRetryDelays[attempt];
                Logger.LogWarning("[{Op}] Rate limit hit, retrying in {Delay}s (attempt {N}/{Max})",
                    operationName, delay.TotalSeconds, attempt + 1, MaxRetries);
                await Task.Delay(delay, cancellationToken);
                continue;
            }

            response.EnsureSuccessStatusCode();
            return await parseResponse(response, cancellationToken);
        }

        throw new HttpRequestException(
            $"Rate limit exceeded after {MaxRetries} retries.",
            null,
            System.Net.HttpStatusCode.TooManyRequests);
    }

    // ── Shared JSON parsers ───────────────────────────────────────────────────

    protected static async Task<JsonElement> ReadJsonAsync(HttpResponseMessage response, CancellationToken ct) =>
        await response.Content.ReadFromJsonAsync<JsonElement>(cancellationToken: ct);

    protected MusicRecommendationResult ParseMusicRecommendation(string rawJson)
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

            Logger.LogInformation("[ParseReco] Parsed {Count} tracks", tracks.Count);
            return new MusicRecommendationResult(narrative, tracks);
        }
        catch (Exception ex)
        {
            Logger.LogError(ex, "[ParseReco] Failed to parse JSON: {Raw}", rawJson);
            return new MusicRecommendationResult(string.Empty, []);
        }
    }

    protected static TimeSpan? ParseRetryDelay(string? errorBody)
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
        catch { /* non-critical */ }
        return null;
    }

    // ── Abstract contract ─────────────────────────────────────────────────────

    public abstract Task<MusicRecommendationResult> GetMusicRecommendationAsync(
        string prompt,
        IReadOnlyList<ConversationTurn> history,
        CancellationToken cancellationToken = default);

    public abstract Task<string> GenerateDiaryEntryAsync(
        string userPrompt,
        string? model = null,
        CancellationToken cancellationToken = default);
}
