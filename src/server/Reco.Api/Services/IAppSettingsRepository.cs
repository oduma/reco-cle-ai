namespace Reco.Api.Services;

public interface IAppSettingsRepository
{
    Task<string?> GetAsync(string key);
    Task<IReadOnlyDictionary<string, string>> GetAllAsync();
    Task UpsertAsync(string key, string value);
    Task DeleteAsync(string key);
    /// <summary>Inserts each entry only if the key does not already exist (preserves user edits).</summary>
    Task SeedDefaultsAsync(IReadOnlyDictionary<string, string> defaults);
}
