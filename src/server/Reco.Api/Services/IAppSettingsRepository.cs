namespace Reco.Api.Services;

public interface IAppSettingsRepository
{
    Task<string?> GetAsync(string key);
    Task<IReadOnlyDictionary<string, string>> GetAllAsync();
    Task UpsertAsync(string key, string value);
    Task DeleteAsync(string key);
}
