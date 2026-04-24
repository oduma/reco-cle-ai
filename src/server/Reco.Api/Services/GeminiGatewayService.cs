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

        try
        {
            var response = await _httpClient.PostAsJsonAsync(url, requestBody, cancellationToken);
            response.EnsureSuccessStatusCode();

            var json = await response.Content.ReadFromJsonAsync<JsonElement>(cancellationToken: cancellationToken);

            var text = json
                .GetProperty("candidates")[0]
                .GetProperty("content")
                .GetProperty("parts")[0]
                .GetProperty("text")
                .GetString();

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
}
