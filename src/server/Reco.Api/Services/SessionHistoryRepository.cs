using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Options;
using Reco.Api.Configuration;
using Reco.Api.Models;

namespace Reco.Api.Services;

public class SessionHistoryRepository : ISessionHistoryRepository
{
    private readonly string _connectionString;

    public SessionHistoryRepository(IOptions<SessionMemoryOptions> options)
    {
        var dbPath = options.Value.DbPath;

        // Ensure the directory exists so SQLite can create the file
        var dir = Path.GetDirectoryName(Path.GetFullPath(dbPath));
        if (!string.IsNullOrEmpty(dir))
            Directory.CreateDirectory(dir);

        _connectionString = $"Data Source={dbPath}";
    }

    public async Task EnsureCreatedAsync()
    {
        await using var conn = new SqliteConnection(_connectionString);
        await conn.OpenAsync();

        await using var cmd = conn.CreateCommand();
        cmd.CommandText = """
            CREATE TABLE IF NOT EXISTS session_events (
                id                 INTEGER PRIMARY KEY AUTOINCREMENT,
                event_type         TEXT    NOT NULL,
                timestamp          TEXT    NOT NULL,
                user_label         TEXT    NOT NULL DEFAULT 'me',
                content            TEXT,
                artist             TEXT,
                album              TEXT,
                title              TEXT,
                duration_seconds   REAL,
                is_active          INTEGER NOT NULL DEFAULT 1,
                conversation_block INTEGER
            );

            CREATE INDEX IF NOT EXISTS idx_se_is_active
                ON session_events(is_active);

            CREATE INDEX IF NOT EXISTS idx_se_conversation_block
                ON session_events(conversation_block);
            """;
        await cmd.ExecuteNonQueryAsync();
    }

    public async Task<int> InsertEventAsync(
        string eventType,
        DateTimeOffset timestamp,
        string userLabel,
        string? content,
        string? artist,
        string? album,
        string? title,
        double? durationSeconds)
    {
        await using var conn = new SqliteConnection(_connectionString);
        await conn.OpenAsync();

        await using var cmd = conn.CreateCommand();
        cmd.CommandText = """
            INSERT INTO session_events
                (event_type, timestamp, user_label, content, artist, album, title, duration_seconds)
            VALUES
                ($type, $ts, $user, $content, $artist, $album, $title, $dur);
            SELECT last_insert_rowid();
            """;
        cmd.Parameters.AddWithValue("$type",    eventType);
        cmd.Parameters.AddWithValue("$ts",      timestamp.UtcDateTime.ToString("O"));
        cmd.Parameters.AddWithValue("$user",    userLabel);
        cmd.Parameters.AddWithValue("$content", (object?)content    ?? DBNull.Value);
        cmd.Parameters.AddWithValue("$artist",  (object?)artist     ?? DBNull.Value);
        cmd.Parameters.AddWithValue("$album",   (object?)album      ?? DBNull.Value);
        cmd.Parameters.AddWithValue("$title",   (object?)title      ?? DBNull.Value);
        cmd.Parameters.AddWithValue("$dur",     (object?)durationSeconds ?? DBNull.Value);

        var result = await cmd.ExecuteScalarAsync();
        return Convert.ToInt32(result);
    }

    public async Task AssignConversationBlockAsync(int aiReplyId)
    {
        await using var conn = new SqliteConnection(_connectionString);
        await conn.OpenAsync();

        await using var cmd = conn.CreateCommand();
        cmd.CommandText = """
            UPDATE session_events
            SET    conversation_block = $blockId
            WHERE  is_active = 1
              AND  conversation_block IS NULL;
            """;
        cmd.Parameters.AddWithValue("$blockId", aiReplyId);
        await cmd.ExecuteNonQueryAsync();
    }

    public async Task<IReadOnlyList<SessionEvent>> GetActiveEventsAsync()
    {
        await using var conn = new SqliteConnection(_connectionString);
        await conn.OpenAsync();

        await using var cmd = conn.CreateCommand();
        cmd.CommandText = """
            SELECT id, event_type, timestamp, user_label,
                   content, artist, album, title,
                   duration_seconds, is_active, conversation_block
            FROM   session_events
            WHERE  is_active = 1
            ORDER  BY timestamp ASC, id ASC;
            """;

        var events = new List<SessionEvent>();
        await using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            events.Add(ReadEvent(reader));
        }
        return events;
    }

    public async Task<int> GetActiveAiReplyCountAsync()
    {
        await using var conn = new SqliteConnection(_connectionString);
        await conn.OpenAsync();

        await using var cmd = conn.CreateCommand();
        cmd.CommandText = """
            SELECT COUNT(*) FROM session_events
            WHERE  is_active = 1 AND event_type = 'ai-reply';
            """;
        var result = await cmd.ExecuteScalarAsync();
        return Convert.ToInt32(result);
    }

    public async Task<int?> GetOldestActiveConversationBlockAsync()
    {
        await using var conn = new SqliteConnection(_connectionString);
        await conn.OpenAsync();

        await using var cmd = conn.CreateCommand();
        cmd.CommandText = """
            SELECT MIN(id) FROM session_events
            WHERE  is_active = 1 AND event_type = 'ai-reply';
            """;
        var result = await cmd.ExecuteScalarAsync();
        return result is DBNull || result is null ? null : Convert.ToInt32(result);
    }

    public async Task SoftDeleteBlockAsync(int conversationBlock)
    {
        await using var conn = new SqliteConnection(_connectionString);
        await conn.OpenAsync();

        await using var cmd = conn.CreateCommand();
        cmd.CommandText = """
            UPDATE session_events
            SET    is_active = 0
            WHERE  conversation_block = $block;
            """;
        cmd.Parameters.AddWithValue("$block", conversationBlock);
        await cmd.ExecuteNonQueryAsync();
    }

    public async Task SoftDeleteAllActiveAsync()
    {
        await using var conn = new SqliteConnection(_connectionString);
        await conn.OpenAsync();

        await using var cmd = conn.CreateCommand();
        cmd.CommandText = "UPDATE session_events SET is_active = 0 WHERE is_active = 1;";
        await cmd.ExecuteNonQueryAsync();
    }

    // ── Mapping ───────────────────────────────────────────────────────────────

    private static SessionEvent ReadEvent(SqliteDataReader r) => new(
        Id:                r.GetInt32(0),
        EventType:         r.GetString(1),
        Timestamp:         DateTimeOffset.Parse(r.GetString(2)),
        UserLabel:         r.GetString(3),
        Content:           r.IsDBNull(4)  ? null : r.GetString(4),
        Artist:            r.IsDBNull(5)  ? null : r.GetString(5),
        Album:             r.IsDBNull(6)  ? null : r.GetString(6),
        Title:             r.IsDBNull(7)  ? null : r.GetString(7),
        DurationSeconds:   r.IsDBNull(8)  ? null : r.GetDouble(8),
        IsActive:          r.GetInt32(9)  == 1,
        ConversationBlock: r.IsDBNull(10) ? null : r.GetInt32(10)
    );
}
