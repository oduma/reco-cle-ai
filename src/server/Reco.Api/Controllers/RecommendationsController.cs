using System.Net;
using Microsoft.AspNetCore.Mvc;
using Reco.Api.DTOs;
using Reco.Api.Services;

namespace Reco.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RecommendationsController : ControllerBase
{
    private readonly IRecommendationOrchestrationService _orchestration;
    private readonly ILogger<RecommendationsController> _logger;

    public RecommendationsController(
        IRecommendationOrchestrationService orchestration,
        ILogger<RecommendationsController> logger)
    {
        _orchestration = orchestration;
        _logger = logger;
    }

    [HttpPost]
    public async Task<ActionResult<RecommendationResponse>> Post(
        [FromBody] RecommendationRequest request,
        CancellationToken cancellationToken)
    {
        try
        {
            var history = request.History ?? [];
            var result = await _orchestration.GetRecommendationsAsync(request.Prompt, history, cancellationToken);
            return Ok(result);
        }
        catch (HttpRequestException ex) when (ex.StatusCode == HttpStatusCode.TooManyRequests)
        {
            _logger.LogWarning("Gemini API rate limit hit on recommendations request");
            return StatusCode(429, new { error = "The AI service is busy right now. Please wait a moment and try again." });
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, "Gemini API unavailable for recommendations request");
            return StatusCode(502, new { error = "The AI service is temporarily unavailable. Please try again." });
        }
        catch (Exception ex) when (ex is not OperationCanceledException)
        {
            _logger.LogError(ex, "Unexpected error processing recommendations request");
            return StatusCode(500, new { error = "An unexpected error occurred." });
        }
    }
}
