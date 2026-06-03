using Microsoft.AspNetCore.Mvc;
using Reco.Api.DTOs;
using Reco.Api.Models;
using Reco.Api.Services;

namespace Reco.Api.Controllers;

[ApiController]
[Route("api/prompt-sets")]
public class PromptSetsController : ControllerBase
{
    private readonly IPromptSetService _promptSets;

    public PromptSetsController(IPromptSetService promptSets) => _promptSets = promptSets;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var sets = await _promptSets.GetAllAsync();
        return Ok(sets.Select(ToDto));
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreatePromptSetRequest request)
    {
        var existing = await _promptSets.GetByNameAsync(request.Name.Trim());
        if (existing is not null)
            return Conflict(new { error = $"A prompt set named '{request.Name}' already exists." });

        var created = await _promptSets.CreateAsync(
            request.Name.Trim(), request.UseSession, request.RecommendationPrompt);
        return CreatedAtAction(nameof(GetAll), ToDto(created));
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdatePromptSetRequest request)
    {
        var existing = await _promptSets.GetByIdAsync(id);
        if (existing is null) return NotFound(new { error = $"Prompt set {id} not found." });

        if (!string.Equals(existing.Name, request.Name.Trim(), StringComparison.OrdinalIgnoreCase))
        {
            var collision = await _promptSets.GetByNameAsync(request.Name.Trim());
            if (collision is not null)
                return Conflict(new { error = $"A prompt set named '{request.Name}' already exists." });
        }

        var updated = await _promptSets.UpdateAsync(id, request.Name.Trim(), request.UseSession, request.RecommendationPrompt);
        return Ok(ToDto(updated));
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var existing = await _promptSets.GetByIdAsync(id);
        if (existing is null) return NotFound(new { error = $"Prompt set {id} not found." });

        await _promptSets.DeleteAsync(id);
        return NoContent();
    }

    [HttpGet("active")]
    public async Task<IActionResult> GetActive()
    {
        var name = await _promptSets.GetActivePromptSetNameAsync();
        return Ok(new { name });
    }

    [HttpPut("active")]
    public async Task<IActionResult> SetActive([FromBody] SetActivePromptSetRequest request)
    {
        var existing = await _promptSets.GetByNameAsync(request.Name);
        if (existing is null)
            return NotFound(new { error = $"Prompt set '{request.Name}' not found." });

        await _promptSets.SetActivePromptSetNameAsync(request.Name);
        return NoContent();
    }

    private static PromptSetDto ToDto(PromptSet ps) =>
        new(ps.Id, ps.Name, ps.UseSession, ps.RecommendationPrompt);
}
