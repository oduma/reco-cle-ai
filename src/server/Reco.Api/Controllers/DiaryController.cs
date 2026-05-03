using Microsoft.AspNetCore.Mvc;
using Reco.Api.DTOs;
using Reco.Api.Services;

namespace Reco.Api.Controllers;

[ApiController]
[Route("api/diary")]
public class DiaryController : ControllerBase
{
    private readonly IDiaryService _diary;
    private readonly ILogger<DiaryController> _logger;

    public DiaryController(IDiaryService diary, ILogger<DiaryController> logger)
    {
        _diary  = diary;
        _logger = logger;
    }

    [HttpGet("active-dates")]
    public async Task<ActionResult<IReadOnlyList<string>>> GetActiveDates()
    {
        var dates = await _diary.GetActiveDatesAsync();
        return Ok(dates);
    }

    [HttpPost("entry")]
    public async Task<ActionResult<DiaryEntryResponse>> GetOrGenerateEntry(
        [FromBody] DiaryEntryRequest request,
        CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var response = await _diary.GetOrGenerateEntryAsync(
                request.Date, request.Force, cancellationToken);
            return Ok(response);
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning("[Diary] Bad request: {Message}", ex.Message);
            return BadRequest(new { error = ex.Message });
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogWarning("[Diary] No data: {Message}", ex.Message);
            return UnprocessableEntity(new { error = ex.Message });
        }
    }
}
