using System.Collections.Concurrent;
using System.Net.Http.Json;
using System.Text.Json;
using Microsoft.Extensions.Options;
using Reco.Api.Configuration;

namespace Reco.Api.Services;

public class LastFmGatewayService(
    HttpClient httpClient,
    IOptions<LastFmOptions> options,
    ILogger<LastFmGatewayService> logger)
    : ILastFmGatewayService
{
    private readonly LastFmOptions _options = options.Value;

    // Keyed by "artist|title" (normalised). Value is the URL or null (meaning "looked up, no art found").
    private readonly ConcurrentDictionary<string, string?> _cache = new(StringComparer.OrdinalIgnoreCase);

    private static readonly string[] PreferredSizes = ["extralarge", "large", "medium"];

    public async Task<string?> GetAlbumArtUrlAsync(
        string artist,
        string title,
        string? album = null,
        CancellationToken cancellationToken = default)
    {
        var cacheKey = $"{artist.Trim().ToLowerInvariant()}|{title.Trim().ToLowerInvariant()}";

        if (_cache.TryGetValue(cacheKey, out var cached))
            return cached;

        if (string.IsNullOrWhiteSpace(_options.ApiKey))
        {
            logger.LogWarning("[LastFm] LASTFM_API_KEY is not configured — album art will be unavailable.");
            return null;
        }

        // Strategy 1: album.getInfo (most reliable art source when album title is known)
        if (!string.IsNullOrWhiteSpace(album))
        {
            var artFromAlbum = await FetchAlbumArtAsync(artist, album, cancellationToken);
            if (artFromAlbum is not null)
                return _cache[cacheKey] = artFromAlbum;
        }

        // Strategy 2: track.getInfo (also carries album art in track.album.image)
        var artFromTrack = await FetchTrackArtAsync(artist, title, cancellationToken);
        return _cache[cacheKey] = artFromTrack;
    }

    private async Task<string?> FetchAlbumArtAsync(string artist, string album, CancellationToken ct)
    {
        var url = BuildUrl("album.getInfo",
            ("artist", artist),
            ("album", album));

        try
        {
            logger.LogDebug("[LastFm] album.getInfo → artist={Artist} album={Album}", artist, album);
            var json = await httpClient.GetFromJsonAsync<JsonElement>(url, ct);

            if (json.TryGetProperty("error", out _))
                return null;

            return json
                .TryGetPath("album", "image", out var images)
                ? BestImage(images)
                : null;
        }
        catch (Exception ex) when (ex is not OperationCanceledException)
        {
            logger.LogWarning(ex, "[LastFm] album.getInfo failed for {Artist} / {Album}", artist, album);
            return null;
        }
    }

    private async Task<string?> FetchTrackArtAsync(string artist, string title, CancellationToken ct)
    {
        var url = BuildUrl("track.getInfo",
            ("artist", artist),
            ("track", title));

        try
        {
            logger.LogDebug("[LastFm] track.getInfo → artist={Artist} track={Title}", artist, title);
            var json = await httpClient.GetFromJsonAsync<JsonElement>(url, ct);

            if (json.TryGetProperty("error", out _))
                return null;

            return json
                .TryGetPath("track", "album", "image", out var images)
                ? BestImage(images)
                : null;
        }
        catch (Exception ex) when (ex is not OperationCanceledException)
        {
            logger.LogWarning(ex, "[LastFm] track.getInfo failed for {Artist} / {Title}", artist, title);
            return null;
        }
    }

    private string BuildUrl(string method, params (string Key, string Value)[] parameters)
    {
        var query = string.Join("&", parameters
            .Select(p => $"{p.Key}={Uri.EscapeDataString(p.Value)}")
            .Append($"api_key={_options.ApiKey}")
            .Append("format=json"));

        return $"{_options.BaseUrl.TrimEnd('/')}/?method={method}&{query}";
    }

    private static string? BestImage(JsonElement images)
    {
        if (images.ValueKind != JsonValueKind.Array)
            return null;

        var imageMap = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);

        foreach (var img in images.EnumerateArray())
        {
            var size = img.TryGetProperty("size", out var s) ? s.GetString() ?? "" : "";
            var url = img.TryGetProperty("#text", out var t) ? t.GetString() ?? "" : "";

            if (!string.IsNullOrWhiteSpace(url))
                imageMap[size] = url;
        }

        foreach (var size in PreferredSizes)
        {
            if (imageMap.TryGetValue(size, out var url))
                return url;
        }

        return null;
    }
}

file static class JsonElementExtensions
{
    internal static bool TryGetPath(this JsonElement root, out JsonElement result, params string[] path)
    {
        result = root;
        foreach (var key in path)
        {
            if (!result.TryGetProperty(key, out result))
                return false;
        }
        return true;
    }

    internal static bool TryGetPath(this JsonElement root, string key1, string key2, out JsonElement result)
        => root.TryGetPath(out result, key1, key2);

    internal static bool TryGetPath(this JsonElement root, string key1, string key2, string key3, out JsonElement result)
        => root.TryGetPath(out result, key1, key2, key3);
}
