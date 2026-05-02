using System.Text.Json;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Options;
using Reco.Api.Configuration;
using Reco.Api.DTOs;
using Reco.Api.Models;

namespace Reco.Api.Services;

public class SessionHistoryRepository : ISessionHistoryRepository
{
    private readonly string _connectionString;

    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
    };

    public SessionHistoryRepository(IOptions<SessionMemoryOptions> options)
    {
        var dbPath = options.Value.DbPath;

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

            CREATE TABLE IF NOT EXISTS session_state (
                key   TEXT PRIMARY KEY,
                value TEXT
            );
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
        double? durationSeconds,
        int? conversationBlock = null)
    {
        await using var conn = new SqliteConnection(_connectionString);
        await conn.OpenAsync();

        await using var cmd = conn.CreateCommand();
        cmd.CommandText = """
            INSERT INTO session_events
                (event_type, timestamp, user_label, content, artist, album, title, duration_seconds, conversation_block)
            VALUES
                ($type, $ts, $user, $content, $artist, $album, $title, $dur, $block);
            SELECT last_insert_rowid();
            """;
        cmd.Parameters.AddWithValue("$type",    eventType);
        cmd.Parameters.AddWithValue("$ts",      timestamp.UtcDateTime.ToString("O"));
        cmd.Parameters.AddWithValue("$user",    userLabel);
        cmd.Parameters.AddWithValue("$content", (object?)content         ?? DBNull.Value);
        cmd.Parameters.AddWithValue("$artist",  (object?)artist          ?? DBNull.Value);
        cmd.Parameters.AddWithValue("$album",   (object?)album           ?? DBNull.Value);
        cmd.Parameters.AddWithValue("$title",   (object?)title           ?? DBNull.Value);
        cmd.Parameters.AddWithValue("$dur",     (object?)durationSeconds ?? DBNull.Value);
        cmd.Parameters.AddWithValue("$block",   (object?)conversationBlock ?? DBNull.Value);

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

    public async Task InsertTrackSuggestionsAsync(IReadOnlyList<RawTrack> rawTracks, int conversationBlock)
    {
        var json = JsonSerializer.Serialize(rawTracks, JsonOptions);

        await using var conn = new SqliteConnection(_connectionString);
        await conn.OpenAsync();

        await using var cmd = conn.CreateCommand();
        cmd.CommandText = """
            INSERT INTO session_events
                (event_type, timestamp, user_label, content, conversation_block)
            VALUES
                ('track-suggestions', $ts, 'me', $content, $block);
            """;
        cmd.Parameters.AddWithValue("$ts",      DateTimeOffset.UtcNow.UtcDateTime.ToString("O"));
        cmd.Parameters.AddWithValue("$content", json);
        cmd.Parameters.AddWithValue("$block",   conversationBlock);
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
            events.Add(ReadEvent(reader));
        return events;
    }

    public async Task<IReadOnlyList<HistoryTurnDto>> GetHistoryWithSuggestionsAsync()
    {
        await using var conn = new SqliteConnection(_connectionString);
        await conn.OpenAsync();

        await using var cmd = conn.CreateCommand();
        cmd.CommandText = """
            SELECT
                e.id,
                e.event_type,
                e.timestamp,
                e.content,
                CASE WHEN EXISTS (
                    SELECT 1 FROM session_events ts
                    WHERE  ts.event_type        = 'track-suggestions'
                      AND  ts.conversation_block = e.id
                      AND  ts.is_active          = 1
                ) THEN 1 ELSE 0 END AS has_suggestions
            FROM   session_events e
            WHERE  e.is_active   = 1
              AND  e.event_type IN ('user-chat', 'ai-reply')
            ORDER  BY e.timestamp ASC, e.id ASC;
            """;

        var turns = new List<HistoryTurnDto>();
        await using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            var eventType = reader.GetString(1);
            turns.Add(new HistoryTurnDto(
                Role:           eventType == "ai-reply" ? "model" : "user",
                Text:           reader.IsDBNull(3) ? string.Empty : reader.GetString(3),
                Timestamp:      DateTimeOffset.Parse(reader.GetString(2)),
                EventId:        reader.GetInt32(0),
                HasSuggestions: reader.GetInt32(4) == 1
            ));
        }
        return turns;
    }

    public async Task<IReadOnlyList<RawTrack>?> GetRawSuggestionsAsync(int replyId)
    {
        await using var conn = new SqliteConnection(_connectionString);
        await conn.OpenAsync();

        await using var cmd = conn.CreateCommand();
        cmd.CommandText = """
            SELECT content FROM session_events
            WHERE  event_type         = 'track-suggestions'
              AND  conversation_block = $replyId
              AND  is_active          = 1
            LIMIT  1;
            """;
        cmd.Parameters.AddWithValue("$replyId", replyId);

        var result = await cmd.ExecuteScalarAsync();
        if (result is null or DBNull) return null;

        return JsonSerializer.Deserialize<List<RawTrack>>((string)result, JsonOptions);
    }

    public async Task<int?> GetActiveReplyIdAsync()
    {
        await using var conn = new SqliteConnection(_connectionString);
        await conn.OpenAsync();

        int? storedId = null;
        await using (var stateCmd = conn.CreateCommand())
        {
            stateCmd.CommandText = "SELECT value FROM session_state WHERE key = 'active_reply_id';";
            var raw = await stateCmd.ExecuteScalarAsync();
            if (raw is not (null or DBNull) && int.TryParse((string)raw, out var parsed))
                storedId = parsed;
        }

        if (storedId.HasValue)
        {
            await using var validateCmd = conn.CreateCommand();
            validateCmd.CommandText = """
                SELECT COUNT(*) FROM session_events
                WHERE  id         = $id
                  AND  event_type = 'ai-reply'
                  AND  is_active  = 1;
                """;
            validateCmd.Parameters.AddWithValue("$id", storedId.Value);
            var count = Convert.ToInt32(await validateCmd.ExecuteScalarAsync());
            if (count > 0) return storedId;
        }

        await using var fallbackCmd = conn.CreateCommand();
        fallbackCmd.CommandText = """
            SELECT MAX(id) FROM session_events
            WHERE  event_type = 'ai-reply' AND is_active = 1;
            """;
        var fallback = await fallbackCmd.ExecuteScalarAsync();
        return fallback is null or DBNull ? null : Convert.ToInt32(fallback);
    }

    public async Task SetActiveReplyIdAsync(int? replyId)
    {
        await using var conn = new SqliteConnection(_connectionString);
        await conn.OpenAsync();

        await using var cmd = conn.CreateCommand();
        if (replyId.HasValue)
        {
            cmd.CommandText = """
                INSERT INTO session_state (key, value) VALUES ('active_reply_id', $value)
                ON CONFLICT(key) DO UPDATE SET value = excluded.value;
                """;
            cmd.Parameters.AddWithValue("$value", replyId.Value.ToString());
        }
        else
        {
            cmd.CommandText = "DELETE FROM session_state WHERE key = 'active_reply_id';";
        }
        await cmd.ExecuteNonQueryAsync();
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
