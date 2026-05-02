using System.Globalization;

namespace Reco.Api.Services;

public class AppSettingsService : IAppSettingsService
{
    private readonly IAppSettingsRepository _repo;
    private readonly IConfiguration _config;

    public AppSettingsService(IAppSettingsRepository repo, IConfiguration config)
    {
        _repo = repo;
        _config = config;
    }

    public async Task<string> GetStringAsync(string key, string fallback)
    {
        var dbValue = await _repo.GetAsync(key);
        if (dbValue is not null) return dbValue;

        var configValue = _config[key];
        if (!string.IsNullOrEmpty(configValue)) return configValue;

        return fallback;
    }

    public async Task<int> GetIntAsync(string key, int fallback)
    {
        var raw = await GetStringAsync(key, fallback.ToString(CultureInfo.InvariantCulture));
        return int.TryParse(raw, out var v) ? v : fallback;
    }

    public async Task<double> GetDoubleAsync(string key, double fallback)
    {
        var raw = await GetStringAsync(key, fallback.ToString(CultureInfo.InvariantCulture));
        return double.TryParse(raw, NumberStyles.Any, CultureInfo.InvariantCulture, out var v)
            ? v
            : fallback;
    }

    // No cache implemented in Phase 11; reserved for future optimisation.
    public void Invalidate() { }
}
