using Microsoft.AspNetCore.Mvc;
using Reco.Api.DTOs;
using Reco.Api.Services;

namespace Reco.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChatController : ControllerBase
{
    private readonly IGeminiGatewayService _geminiGateway;
    private readonly ILogger<ChatController> _logger;

    public ChatController(IGeminiGatewayService geminiGateway, ILogger<ChatController> logger)
    {
        _geminiGateway = geminiGateway;
        _logger = logger;
    }

    [HttpPost]
    public async Task<ActionResult<ChatResponse>> Post(
        [FromBody] ChatRequest request,
        CancellationToken cancellationToken)
    {
        try
        {
            var history = request.History ?? [];
            var responseText = await _geminiGateway.SendMessageAsync(request.Prompt, history, cancellationToken);

            var updatedHistory = history
                .Append(new ConversationTurn("user", request.Prompt))
                .Append(new ConversationTurn("model", responseText))
                .ToList();

            return Ok(new ChatResponse(responseText, updatedHistory));
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, "Gemini API unavailable for chat request");
            return StatusCode(502, new { error = "The AI service is temporarily unavailable. Please try again." });
        }
        catch (Exception ex) when (ex is not OperationCanceledException)
        {
            _logger.LogError(ex, "Unexpected error processing chat request");
            return StatusCode(500, new { error = "An unexpected error occurred." });
        }
    }
}
