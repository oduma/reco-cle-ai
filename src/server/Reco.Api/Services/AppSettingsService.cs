using System.Globalization;

namespace Reco.Api.Services;

public class AppSettingsService : IAppSettingsService
{
    // Only API keys retain an environment-variable fallback after startup seeding.
    // All other settings are read exclusively from app_settings in reasonic.db.
    private static readonly IReadOnlySet<string> _secretKeys =
        new HashSet<string>(StringComparer.OrdinalIgnoreCase)
        {
            "GEMINI_API_KEY",
            "LASTFM_API_KEY",
        };

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

        // API keys fall back to env vars so a .env.local on first run still works.
        // All other settings are DB-only; they are seeded at startup so this branch
        // is only reached if the DB is in an unexpected state.
        if (_secretKeys.Contains(key))
        {
            var configValue = _config[key];
            if (!string.IsNullOrEmpty(configValue)) return configValue;
        }

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

    // No cache implemented; reserved for future optimisation.
    public void Invalidate() { }
}
