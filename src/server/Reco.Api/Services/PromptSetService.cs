using Reco.Api.Models;

namespace Reco.Api.Services;

public class PromptSetService : IPromptSetService
{
    private readonly IPromptSetRepository  _repo;
    private readonly IAppSettingsRepository _settingsRepo;

    private const string ActiveKey   = "ACTIVE_PROMPT_SET_NAME";
    private const string DefaultName = "Default";

    public PromptSetService(IPromptSetRepository repo, IAppSettingsRepository settingsRepo)
    {
        _repo         = repo;
        _settingsRepo = settingsRepo;
    }

    public Task<IReadOnlyList<PromptSet>> GetAllAsync()         => _repo.GetAllAsync();
    public Task<PromptSet?> GetByNameAsync(string name)         => _repo.GetByNameAsync(name);
    public Task<PromptSet?> GetByIdAsync(int id)                => _repo.GetByIdAsync(id);
    public Task<PromptSet> CreateAsync(string name, bool useSession, string prompt) =>
        _repo.CreateAsync(name, useSession, prompt);
    public Task<PromptSet> UpdateAsync(int id, string name, bool useSession, string prompt) =>
        _repo.UpdateAsync(id, name, useSession, prompt);

    public async Task DeleteAsync(int id)
    {
        var ps = await _repo.GetByIdAsync(id);
        if (ps is null) return;

        await _repo.DeleteAsync(id);

        // If the active prompt set was just deleted, switch to the first remaining one
        var activeName = await GetActivePromptSetNameAsync();
        if (!string.Equals(activeName, ps.Name, StringComparison.OrdinalIgnoreCase)) return;

        var remaining = await _repo.GetAllAsync();
        if (remaining.Count > 0)
        {
            await SetActivePromptSetNameAsync(remaining[0].Name);
        }
        else
        {
            // No sets remain — recreate Default so the app always has at least one
            await _repo.CreateAsync(DefaultName, true, string.Empty);
            await SetActivePromptSetNameAsync(DefaultName);
        }
    }

    public async Task<string> GetActivePromptSetNameAsync()
    {
        var value = await _settingsRepo.GetAsync(ActiveKey);
        return value ?? DefaultName;
    }

    public Task SetActivePromptSetNameAsync(string name) =>
        _settingsRepo.UpsertAsync(ActiveKey, name);
}
