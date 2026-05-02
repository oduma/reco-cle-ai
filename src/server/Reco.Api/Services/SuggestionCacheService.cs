using System.Collections.Concurrent;
using Reco.Api.DTOs;

namespace Reco.Api.Services;

public class SuggestionCacheService : ISuggestionCacheService
{
    private readonly ConcurrentDictionary<string, DateTime> _cache = new();
    private readonly IConfiguration _configuration;

    public SuggestionCacheService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    // Read from IConfiguration on each access so env-var changes are picked up on restart.
    // Cache duration is not exposed via the UI settings panel since ISuggestionCacheService methods are sync.
    private TimeSpan CacheDuration
    {
        get
        {
            var raw = _configuration["RECOMMENDATION_SUGGESTION_CACHE_MINUTES"];
            if (int.TryParse(raw, out var minutes) && minutes >= 0)
                return TimeSpan.FromMinutes(minutes);
            return TimeSpan.FromMinutes(60);
        }
    }

    public IReadOnlyList<TrackSuggestion> ExcludeRecentlySuggested(IReadOnlyList<TrackSuggestion> tracks)
    {
        var cutoff = DateTime.UtcNow - CacheDuration;
        return tracks
            .Where(t => !_cache.TryGetValue(CacheKey(t), out var timestamp) || timestamp <= cutoff)
            .ToList();
    }

    public void MarkAsSuggested(IEnumerable<TrackSuggestion> tracks)
    {
        var now    = DateTime.UtcNow;
        var cutoff = now - CacheDuration;

        foreach (var key in _cache.Keys.ToArray())
        {
            if (_cache.TryGetValue(key, out var ts) && ts <= cutoff)
                _cache.TryRemove(key, out _);
        }

        foreach (var track in tracks)
            _cache[CacheKey(track)] = now;
    }

    private static string CacheKey(TrackSuggestion track) =>
        $"{TrackMatcher.Normalize(track.Artist)}||{TrackMatcher.Normalize(track.Title)}";
}
