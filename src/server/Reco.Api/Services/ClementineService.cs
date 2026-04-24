using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Options;
using Reco.Api.Configuration;
using Reco.Api.Models;

namespace Reco.Api.Services;

public class ClementineService : IClementineService
{
    private readonly ClementineOptions _options;
    private readonly ILogger<ClementineService> _logger;

    private IReadOnlyList<LocalTrack>? _cachedInventory;
    private readonly SemaphoreSlim _lock = new(1, 1);

    public ClementineService(IOptions<ClementineOptions> options, ILogger<ClementineService> logger)
    {
        _options = options.Value;
        _logger = logger;
    }

    public async Task<IReadOnlyList<LocalTrack>> LoadInventoryAsync(CancellationToken cancellationToken = default)
    {
        if (_cachedInventory is not null) return _cachedInventory;

        await _lock.WaitAsync(cancellationToken);
        try
        {
            if (_cachedInventory is not null) return _cachedInventory;
            _cachedInventory = await ReadInventoryFromDbAsync(cancellationToken);
            _logger.LogInformation("[Clementine] Loaded {Count} tracks from local library at {Path}",
                _cachedInventory.Count, _options.DbPath);
            return _cachedInventory;
        }
        finally
        {
            _lock.Release();
        }
    }

    private async Task<IReadOnlyList<LocalTrack>> ReadInventoryFromDbAsync(CancellationToken cancellationToken)
    {
        if (!File.Exists(_options.DbPath))
        {
            _logger.LogWarning("[Clementine] Database copy not found at {Path}", _options.DbPath);
            throw new FileNotFoundException(
                $"Clementine database copy not found at: {_options.DbPath}", _options.DbPath);
        }

        var connectionString = new SqliteConnectionStringBuilder
        {
            DataSource = _options.DbPath,
            Mode = SqliteOpenMode.ReadOnly,
        }.ToString();

        var tracks = new List<LocalTrack>();

        await using var connection = new SqliteConnection(connectionString);
        await connection.OpenAsync(cancellationToken);

        await using var command = connection.CreateCommand();
        command.CommandText = """
            SELECT title, artist, album
            FROM songs
            WHERE title  IS NOT NULL AND title  != ''
              AND artist IS NOT NULL AND artist != ''
            """;

        await using var reader = await command.ExecuteReaderAsync(cancellationToken);
        while (await reader.ReadAsync(cancellationToken))
        {
            var title  = reader.GetString(0);
            var artist = reader.GetString(1);
            var album  = reader.IsDBNull(2) ? null : reader.GetString(2);

            tracks.Add(new LocalTrack(
                title, artist, album,
                TrackMatcher.Normalize(title),
                TrackMatcher.Normalize(artist),
                album is not null ? TrackMatcher.Normalize(album) : null
            ));
        }

        return tracks;
    }
}
