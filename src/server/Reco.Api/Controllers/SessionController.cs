using Microsoft.AspNetCore.Mvc;
using Reco.Api.DTOs;
using Reco.Api.Services;

namespace Reco.Api.Controllers;

[ApiController]
[Route("api/session")]
public class SessionController : ControllerBase
{
    private readonly ISessionHistoryService _session;
    private readonly ILogger<SessionController> _logger;

    public SessionController(ISessionHistoryService session, ILogger<SessionController> logger)
    {
        _session = session;
        _logger = logger;
    }

    [HttpPost("events")]
    public async Task<IActionResult> PostEvent(
        [FromBody] SessionEventRequest request,
        CancellationToken cancellationToken)
    {
        if (!SessionEventRequest.AllowedEventTypes.Contains(request.EventType))
            return BadRequest(new { error = $"eventType must be one of: {string.Join(", ", SessionEventRequest.AllowedEventTypes)}" });

        var timestamp = request.Timestamp ?? DateTimeOffset.UtcNow;

        await _session.LogTrackEventAsync(
            request.EventType, request.Artist, request.Album, request.Title,
            request.DurationSeconds, timestamp);

        _logger.LogInformation(
            "[Session] Track event logged | type: {EventType} | track: {Title} · {Artist}",
            request.EventType, request.Title, request.Artist);

        return NoContent();
    }

    [HttpGet("memory")]
    public async Task<IActionResult> GetMemory()
    {
        var status = await _session.GetMemoryStatusAsync();
        return Ok(new { used = status.Used, total = status.Total });
    }

    [HttpDelete("memory")]
    public async Task<IActionResult> BustMemory()
    {
        await _session.BustMemoryAsync();
        _logger.LogInformation("[Session] Memory busted — all active events soft-deleted");
        return NoContent();
    }
}
