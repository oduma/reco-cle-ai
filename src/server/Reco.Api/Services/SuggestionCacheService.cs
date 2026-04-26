using System.Collections.Concurrent;
using Microsoft.Extensions.Options;
using Reco.Api.Configuration;
using Reco.Api.DTOs;

namespace Reco.Api.Services;

public class SuggestionCacheService : ISuggestionCacheService
{
    private readonly ConcurrentDictionary<string, DateTime> _cache = new();
    private readonly IOptions<RecommendationOptions> _options;

    public SuggestionCacheService(IOptions<RecommendationOptions> options)
    {
        _options = options;
    }

    private TimeSpan CacheDuration =>
        TimeSpan.FromMinutes(_options.Value.SuggestionCacheDurationMinutes);

    public IReadOnlyList<TrackSuggestion> ExcludeRecentlySuggested(IReadOnlyList<TrackSuggestion> tracks)
    {
        var cutoff = DateTime.UtcNow - CacheDuration;
        return tracks
            .Where(t => !_cache.TryGetValue(CacheKey(t), out var timestamp) || timestamp <= cutoff)
            .ToList();
    }

    public void MarkAsSuggested(IEnumerable<TrackSuggestion> tracks)
    {
        var now = DateTime.UtcNow;

        // Lazy expiry cleanup to prevent unbounded growth
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
