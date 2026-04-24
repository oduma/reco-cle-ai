using System.Net;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using Moq;
using Moq.Protected;
using Reco.Api.Configuration;
using Reco.Api.DTOs;
using Reco.Api.Services;

namespace Reco.Api.Tests.Services;

public class GeminiGatewayServiceTests
{
    private static GeminiOptions DefaultOptions => new()
    {
        ApiKey = "test-key",
        Model = "gemini-test",
        BaseUrl = "https://generativelanguage.googleapis.com"
    };

    private static GeminiGatewayService BuildService(HttpClient httpClient) =>
        new(httpClient, Options.Create(DefaultOptions), NullLogger<GeminiGatewayService>.Instance);

    private static HttpClient BuildHttpClient(HttpResponseMessage response)
    {
        var handler = new Mock<HttpMessageHandler>();
        handler.Protected()
            .Setup<Task<HttpResponseMessage>>(
                "SendAsync",
                ItExpr.IsAny<HttpRequestMessage>(),
                ItExpr.IsAny<CancellationToken>())
            .ReturnsAsync(response);
        return new HttpClient(handler.Object);
    }

    private static string GeminiResponse(string text) =>
        JsonSerializer.Serialize(new
        {
            candidates = new[]
            {
                new { content = new { parts = new[] { new { text } }, role = "model" } }
            }
        });

    [Fact]
    public async Task SendMessageAsync_WithValidPrompt_ReturnsExtractedText()
    {
        const string expectedText = "Try Miles Davis – Kind of Blue.";
        var httpClient = BuildHttpClient(new HttpResponseMessage
        {
            StatusCode = HttpStatusCode.OK,
            Content = new StringContent(GeminiResponse(expectedText), Encoding.UTF8, "application/json")
        });
        var sut = BuildService(httpClient);

        var result = await sut.SendMessageAsync("jazz recommendations", []);

        Assert.Equal(expectedText, result);
    }

    [Fact]
    public async Task SendMessageAsync_WithHistory_IncludesHistoryTurnsInRequest()
    {
        var capturedContent = string.Empty;
        var handler = new Mock<HttpMessageHandler>();
        handler.Protected()
            .Setup<Task<HttpResponseMessage>>(
                "SendAsync",
                ItExpr.IsAny<HttpRequestMessage>(),
                ItExpr.IsAny<CancellationToken>())
            .ReturnsAsync(new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent(GeminiResponse("ok"), Encoding.UTF8, "application/json")
            })
            .Callback<HttpRequestMessage, CancellationToken>(async (req, _) =>
            {
                capturedContent = await req.Content!.ReadAsStringAsync();
            });

        var history = new List<ConversationTurn>
        {
            new("user", "I like jazz"),
            new("model", "Great choice!")
        };

        var sut = new GeminiGatewayService(
            new HttpClient(handler.Object),
            Options.Create(DefaultOptions),
            NullLogger<GeminiGatewayService>.Instance);

        await sut.SendMessageAsync("more jazz", history);

        Assert.Contains("I like jazz", capturedContent);
        Assert.Contains("Great choice!", capturedContent);
        Assert.Contains("more jazz", capturedContent);
    }

    [Fact]
    public async Task SendMessageAsync_WhenHttpRequestFails_ThrowsHttpRequestException()
    {
        var handler = new Mock<HttpMessageHandler>();
        handler.Protected()
            .Setup<Task<HttpResponseMessage>>(
                "SendAsync",
                ItExpr.IsAny<HttpRequestMessage>(),
                ItExpr.IsAny<CancellationToken>())
            .ReturnsAsync(new HttpResponseMessage { StatusCode = HttpStatusCode.TooManyRequests });

        var sut = BuildService(new HttpClient(handler.Object));

        await Assert.ThrowsAsync<HttpRequestException>(() =>
            sut.SendMessageAsync("any prompt", []));
    }

    [Fact]
    public async Task SendMessageAsync_WhenCancelled_ThrowsOperationCanceledException()
    {
        using var cts = new CancellationTokenSource();
        cts.Cancel();

        var handler = new Mock<HttpMessageHandler>();
        handler.Protected()
            .Setup<Task<HttpResponseMessage>>(
                "SendAsync",
                ItExpr.IsAny<HttpRequestMessage>(),
                ItExpr.IsAny<CancellationToken>())
            .ThrowsAsync(new OperationCanceledException());

        var sut = BuildService(new HttpClient(handler.Object));

        // TaskCanceledException is a subclass of OperationCanceledException
        var ex = await Record.ExceptionAsync(() => sut.SendMessageAsync("any", [], cts.Token));
        Assert.IsAssignableFrom<OperationCanceledException>(ex);
    }
}
