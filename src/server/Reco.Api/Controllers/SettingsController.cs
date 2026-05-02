using Microsoft.AspNetCore.Mvc;
using Reco.Api.DTOs;
using Reco.Api.Services;

namespace Reco.Api.Controllers;

[ApiController]
[Route("api/settings")]
public class SettingsController : ControllerBase
{
    private readonly IAppSettingsRepository _repo;
    private readonly IAppSettingsService _settings;

    public SettingsController(IAppSettingsRepository repo, IAppSettingsService settings)
    {
        _repo     = repo;
        _settings = settings;
    }

    [HttpGet]
    public async Task<SettingsResponse> GetSettings()
    {
        var all     = await _repo.GetAllAsync();
        var entries = all.Select(kvp => new SettingsEntry(kvp.Key, kvp.Value)).ToList();
        return new SettingsResponse(entries);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateSettings([FromBody] UpdateSettingsRequest request)
    {
        foreach (var (key, value) in request.Settings)
        {
            if (string.IsNullOrWhiteSpace(value))
                await _repo.DeleteAsync(key);
            else
                await _repo.UpsertAsync(key, value);
        }
        _settings.Invalidate();
        return NoContent();
    }
}
