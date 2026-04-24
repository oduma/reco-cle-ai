using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using Reco.Api.Controllers;
using Reco.Api.DTOs;
using Reco.Api.Services;

namespace Reco.Api.Tests.Controllers;

public class ChatControllerTests
{
    private static ChatController BuildController(IGeminiGatewayService gateway) =>
        new(gateway, NullLogger<ChatController>.Instance);

    [Fact]
    public async Task Post_WithValidRequest_ReturnsOkWithResponse()
    {
        var mock = new Mock<IGeminiGatewayService>();
        mock.Setup(g => g.SendMessageAsync("jazz", It.IsAny<IReadOnlyList<ConversationTurn>>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync("Try Miles Davis.");

        var result = await BuildController(mock.Object)
            .Post(new ChatRequest("jazz", null), CancellationToken.None);

        var ok = result.Result as OkObjectResult;
        Assert.NotNull(ok);
        var body = ok.Value as ChatResponse;
        Assert.NotNull(body);
        Assert.Equal("Try Miles Davis.", body.Response);
    }

    [Fact]
    public async Task Post_WithValidRequest_ReturnsUpdatedHistory()
    {
        var mock = new Mock<IGeminiGatewayService>();
        mock.Setup(g => g.SendMessageAsync(It.IsAny<string>(), It.IsAny<IReadOnlyList<ConversationTurn>>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync("AI reply");

        var result = await BuildController(mock.Object)
            .Post(new ChatRequest("hello", null), CancellationToken.None);

        var body = (result.Result as OkObjectResult)?.Value as ChatResponse;
        Assert.NotNull(body);
        Assert.Equal(2, body.History.Count);
        Assert.Equal("user", body.History[0].Role);
        Assert.Equal("hello", body.History[0].Text);
        Assert.Equal("model", body.History[1].Role);
        Assert.Equal("AI reply", body.History[1].Text);
    }

    [Fact]
    public async Task Post_WithExistingHistory_PassesHistoryToGateway()
    {
        var history = new List<ConversationTurn>
        {
            new("user", "previous message"),
            new("model", "previous reply")
        };
        IReadOnlyList<ConversationTurn>? capturedHistory = null;

        var mock = new Mock<IGeminiGatewayService>();
        mock.Setup(g => g.SendMessageAsync(It.IsAny<string>(), It.IsAny<IReadOnlyList<ConversationTurn>>(), It.IsAny<CancellationToken>()))
            .Callback<string, IReadOnlyList<ConversationTurn>, CancellationToken>((_, h, _) => capturedHistory = h)
            .ReturnsAsync("response");

        await BuildController(mock.Object)
            .Post(new ChatRequest("follow-up", history), CancellationToken.None);

        Assert.NotNull(capturedHistory);
        Assert.Equal(2, capturedHistory.Count);
        Assert.Equal("previous message", capturedHistory[0].Text);
    }

    [Fact]
    public async Task Post_WhenGeminiReturns502_Returns502()
    {
        var mock = new Mock<IGeminiGatewayService>();
        mock.Setup(g => g.SendMessageAsync(It.IsAny<string>(), It.IsAny<IReadOnlyList<ConversationTurn>>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(new HttpRequestException("Gemini unavailable"));

        var result = await BuildController(mock.Object)
            .Post(new ChatRequest("anything", null), CancellationToken.None);

        var status = result.Result as ObjectResult;
        Assert.NotNull(status);
        Assert.Equal(502, status.StatusCode);
    }

    [Fact]
    public async Task Post_WhenUnexpectedExceptionThrown_Returns500()
    {
        var mock = new Mock<IGeminiGatewayService>();
        mock.Setup(g => g.SendMessageAsync(It.IsAny<string>(), It.IsAny<IReadOnlyList<ConversationTurn>>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(new InvalidOperationException("Unexpected"));

        var result = await BuildController(mock.Object)
            .Post(new ChatRequest("anything", null), CancellationToken.None);

        var status = result.Result as ObjectResult;
        Assert.NotNull(status);
        Assert.Equal(500, status.StatusCode);
    }
}
