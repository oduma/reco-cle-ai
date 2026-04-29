using Microsoft.AspNetCore.Mvc;
using Reco.Api.DTOs;
using Reco.Api.Services;

namespace Reco.Api.Controllers;

[ApiController]
[Route("api/clementine")]
public class ClementineController(IClementineLauncherService launcher) : ControllerBase
{
    [HttpPost("add")]
    public async Task<IActionResult> AddToPlaylist([FromBody] AddToPlaylistRequest request)
    {
        var (success, error) = await launcher.AddToPlaylistAsync(request.FilePaths);

        if (!success)
            return StatusCode(500, new { error });

        return Ok();
    }
}
