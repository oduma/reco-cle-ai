namespace Reco.Api.Services;

public interface IAppSettingsRepository
{
    Task<string?> GetAsync(string key);
    Task<IReadOnlyDictionary<string, string>> GetAllAsync();
    Task UpsertAsync(string key, string value);
    Task DeleteAsync(string key);
    /// <summary>Inserts each entry only if the key does not already exist (preserves user edits).</summary>
    Task SeedDefaultsAsync(IReadOnlyDictionary<string, string> defaults);
    /// <summary>Upserts all entries into app_setting_defaults — always overwrites so defaults stay
    /// current across app upgrades. Never touches the user-editable app_settings table.</summary>
    Task WriteDefaultsAsync(IReadOnlyDictionary<string, string> defaults);
    /// <summary>Returns all rows from app_setting_defaults (canonical hardcoded defaults).</summary>
    Task<IReadOnlyDictionary<string, string>> GetAllDefaultsAsync();
    /// <summary>Returns the canonical default for a single key, or null if not present.</summary>
    Task<string?> GetDefaultAsync(string key);
}
