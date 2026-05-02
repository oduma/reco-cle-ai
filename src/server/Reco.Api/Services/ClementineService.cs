using Microsoft.Data.Sqlite;
using Reco.Api.Models;

namespace Reco.Api.Services;

public class ClementineService : IClementineService
{
    private readonly IAppSettingsService _settings;
    private readonly ILogger<ClementineService> _logger;

    private IReadOnlyList<LocalTrack>? _cachedInventory;
    private string? _cachedInventoryPath;
    private readonly SemaphoreSlim _lock = new(1, 1);

    public ClementineService(IAppSettingsService settings, ILogger<ClementineService> logger)
    {
        _settings = settings;
        _logger = logger;
    }

    public async Task<IReadOnlyList<LocalTrack>> LoadInventoryAsync(CancellationToken cancellationToken = default)
    {
        var dbPath = await _settings.GetStringAsync("CLEMENTINE_DB_PATH", "");

        // Serve from cache only when the configured path hasn't changed.
        if (_cachedInventory is not null && _cachedInventoryPath == dbPath)
            return _cachedInventory;

        await _lock.WaitAsync(cancellationToken);
        try
        {
            // Re-read inside the lock in case another thread just refreshed the cache.
            var currentPath = await _settings.GetStringAsync("CLEMENTINE_DB_PATH", "");
            if (_cachedInventory is not null && _cachedInventoryPath == currentPath)
                return _cachedInventory;

            _cachedInventory     = await ReadInventoryFromDbAsync(currentPath, cancellationToken);
            _cachedInventoryPath = currentPath;
            _logger.LogInformation("[Clementine] Loaded {Count} tracks from local library at {Path}",
                _cachedInventory.Count, currentPath);
            return _cachedInventory;
        }
        finally
        {
            _lock.Release();
        }
    }

    private async Task<IReadOnlyList<LocalTrack>> ReadInventoryFromDbAsync(
        string dbPath, CancellationToken cancellationToken)
    {
        if (!File.Exists(dbPath))
        {
            _logger.LogWarning("[Clementine] Database copy not found at {Path}", dbPath);
            throw new FileNotFoundException(
                $"Clementine database copy not found at: {dbPath}", dbPath);
        }

        var connectionString = new SqliteConnectionStringBuilder
        {
            DataSource = dbPath,
            Mode       = SqliteOpenMode.ReadOnly,
        }.ToString();

        var tracks = new List<LocalTrack>();

        await using var connection = new SqliteConnection(connectionString);
        await connection.OpenAsync(cancellationToken);

        var durationColumn = await DetectDurationColumnAsync(connection, cancellationToken);
        _logger.LogInformation("[Clementine] Duration column resolved: {Column}", durationColumn ?? "(none)");

        var selectDuration = durationColumn is not null ? $", {durationColumn}" : string.Empty;

        await using var command = connection.CreateCommand();
        command.CommandText = $"""
            SELECT title, artist, album, filename{selectDuration}
            FROM songs
            WHERE title  IS NOT NULL AND title  != ''
              AND artist IS NOT NULL AND artist != ''
            """;

        await using var reader = await command.ExecuteReaderAsync(cancellationToken);
        while (await reader.ReadAsync(cancellationToken))
        {
            var title    = reader.GetString(0);
            var artist   = reader.GetString(1);
            var album    = reader.IsDBNull(2) ? null : reader.GetString(2);
            var filePath = reader.IsDBNull(3) ? null : reader.GetString(3);
            if (filePath == string.Empty) filePath = null;

            double? durationSec = null;
            if (durationColumn is not null)
            {
                var lengthNs = reader.IsDBNull(4) ? (long?)null : reader.GetInt64(4);
                durationSec  = lengthNs is > 0 ? lengthNs.Value / 1_000_000_000.0 : null;
            }

            tracks.Add(new LocalTrack(
                title, artist, album,
                TrackMatcher.Normalize(title),
                TrackMatcher.Normalize(artist),
                album is not null ? TrackMatcher.Normalize(album) : null,
                filePath,
                durationSec
            ));
        }

        return tracks;
    }

    private static async Task<string?> DetectDurationColumnAsync(SqliteConnection conn, CancellationToken ct)
    {
        await using var cmd = conn.CreateCommand();
        cmd.CommandText = """
            SELECT name FROM pragma_table_info('songs')
            WHERE  name IN ('lengthnanosec', 'length')
            ORDER  BY CASE name WHEN 'lengthnanosec' THEN 0 ELSE 1 END
            LIMIT  1;
            """;
        return await cmd.ExecuteScalarAsync(ct) as string;
    }
}
