namespace Reco.Api.Services;

public interface IAppSettingsService
{
    Task<string> GetStringAsync(string key, string fallback);
    Task<int> GetIntAsync(string key, int fallback);
    Task<double> GetDoubleAsync(string key, double fallback);

    // Reserved for future cache invalidation — no-op in Phase 11.
    void Invalidate();
}
