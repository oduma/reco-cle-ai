using Microsoft.Data.Sqlite;
using Reco.Api.Models;

namespace Reco.Api.Services;

public class DiaryRepository : IDiaryRepository
{
    private readonly string _connectionString;

    public DiaryRepository(IConfiguration configuration)
    {
        var dbPath = configuration["REASONIC_DB_PATH"] ?? "reasonic.db";
        _connectionString = $"Data Source={dbPath}";
    }

    public async Task<IReadOnlyList<string>> GetActiveDatesAsync()
    {
        await using var conn = new SqliteConnection(_connectionString);
        await conn.OpenAsync();

        await using var cmd = conn.CreateCommand();
        // All past days with user-chat events across any session (active or evicted),
        // excluding today so only closed days appear in the calendar.
        cmd.CommandText = """
            SELECT DISTINCT DATE(timestamp)
            FROM   session_events
            WHERE  event_type = 'user-chat'
              AND  DATE(timestamp) < DATE('now')
            ORDER  BY 1 ASC;
            """;

        var dates = new List<string>();
        await using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
            dates.Add(reader.GetString(0));
        return dates;
    }

    public async Task<DiaryDayData?> GetDayDataAsync(string date)
    {
        await using var conn = new SqliteConnection(_connectionString);
        await conn.OpenAsync();

        await using var cmd = conn.CreateCommand();
        cmd.CommandText = """
            SELECT content, mood, timestamp
            FROM   session_events
            WHERE  event_type = 'user-chat'
              AND  DATE(timestamp) = $date
            ORDER  BY timestamp ASC;
            """;
        cmd.Parameters.AddWithValue("$date", date);

        var prompts = new List<DiaryPromptEntry>();
        await using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            var content   = reader.IsDBNull(0) ? string.Empty : reader.GetString(0);
            var mood      = reader.IsDBNull(1) ? null : reader.GetString(1);
            var timestamp = DateTimeOffset.Parse(reader.GetString(2));
            if (!string.IsNullOrWhiteSpace(content))
                prompts.Add(new DiaryPromptEntry(content, mood, timestamp));
        }

        return prompts.Count == 0 ? null : new DiaryDayData(date, prompts);
    }

    public async Task<string?> GetCachedEntryContentAsync(string date)
    {
        await using var conn = new SqliteConnection(_connectionString);
        await conn.OpenAsync();

        await using var cmd = conn.CreateCommand();
        cmd.CommandText = "SELECT content FROM diary_entries WHERE date = $date;";
        cmd.Parameters.AddWithValue("$date", date);

        var result = await cmd.ExecuteScalarAsync();
        return result is null or DBNull ? null : (string)result;
    }

    public async Task SaveEntryAsync(string date, string content, DateTimeOffset generatedAt)
    {
        await using var conn = new SqliteConnection(_connectionString);
        await conn.OpenAsync();

        await using var cmd = conn.CreateCommand();
        cmd.CommandText = """
            INSERT INTO diary_entries (date, content, created_at)
            VALUES ($date, $content, $createdAt)
            ON CONFLICT(date) DO UPDATE SET content = excluded.content, created_at = excluded.created_at;
            """;
        cmd.Parameters.AddWithValue("$date",      date);
        cmd.Parameters.AddWithValue("$content",   content);
        cmd.Parameters.AddWithValue("$createdAt", generatedAt.UtcDateTime.ToString("O"));
        await cmd.ExecuteNonQueryAsync();
    }

    public async Task<DateTimeOffset?> GetEntryGeneratedAtAsync(string date)
    {
        await using var conn = new SqliteConnection(_connectionString);
        await conn.OpenAsync();

        await using var cmd = conn.CreateCommand();
        cmd.CommandText = "SELECT created_at FROM diary_entries WHERE date = $date;";
        cmd.Parameters.AddWithValue("$date", date);

        var result = await cmd.ExecuteScalarAsync();
        return result is null or DBNull ? null : DateTimeOffset.Parse((string)result);
    }
}
