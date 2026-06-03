using Microsoft.Data.Sqlite;
using Reco.Api.Models;

namespace Reco.Api.Services;

public class PromptSetRepository : IPromptSetRepository
{
    private readonly string _connectionString;

    public PromptSetRepository(IConfiguration configuration)
    {
        var dbPath = configuration["REASONIC_DB_PATH"] ?? "reasonic.db";
        var dir = Path.GetDirectoryName(Path.GetFullPath(dbPath));
        if (!string.IsNullOrEmpty(dir)) Directory.CreateDirectory(dir);
        _connectionString = $"Data Source={dbPath}";
    }

    public async Task<IReadOnlyList<PromptSet>> GetAllAsync()
    {
        await using var conn = new SqliteConnection(_connectionString);
        await conn.OpenAsync();
        await using var cmd = conn.CreateCommand();
        cmd.CommandText = """
            SELECT id, name, use_session, recommendation_prompt
            FROM   prompt_sets
            ORDER  BY name ASC;
            """;
        var list = new List<PromptSet>();
        await using var r = await cmd.ExecuteReaderAsync();
        while (await r.ReadAsync())
            list.Add(ReadRow(r));
        return list;
    }

    public async Task<PromptSet?> GetByNameAsync(string name)
    {
        await using var conn = new SqliteConnection(_connectionString);
        await conn.OpenAsync();
        await using var cmd = conn.CreateCommand();
        cmd.CommandText = """
            SELECT id, name, use_session, recommendation_prompt
            FROM   prompt_sets
            WHERE  name = $name
            LIMIT  1;
            """;
        cmd.Parameters.AddWithValue("$name", name);
        await using var r = await cmd.ExecuteReaderAsync();
        return await r.ReadAsync() ? ReadRow(r) : null;
    }

    public async Task<PromptSet?> GetByIdAsync(int id)
    {
        await using var conn = new SqliteConnection(_connectionString);
        await conn.OpenAsync();
        await using var cmd = conn.CreateCommand();
        cmd.CommandText = """
            SELECT id, name, use_session, recommendation_prompt
            FROM   prompt_sets
            WHERE  id = $id
            LIMIT  1;
            """;
        cmd.Parameters.AddWithValue("$id", id);
        await using var r = await cmd.ExecuteReaderAsync();
        return await r.ReadAsync() ? ReadRow(r) : null;
    }

    public async Task<PromptSet> CreateAsync(string name, bool useSession, string recommendationPrompt)
    {
        await using var conn = new SqliteConnection(_connectionString);
        await conn.OpenAsync();
        var now = DateTimeOffset.UtcNow.UtcDateTime.ToString("O");
        await using var cmd = conn.CreateCommand();
        cmd.CommandText = """
            INSERT INTO prompt_sets (name, use_session, recommendation_prompt, created_at, updated_at)
            VALUES ($name, $use, $prompt, $now, $now);
            SELECT last_insert_rowid();
            """;
        cmd.Parameters.AddWithValue("$name",   name);
        cmd.Parameters.AddWithValue("$use",    useSession ? 1 : 0);
        cmd.Parameters.AddWithValue("$prompt", recommendationPrompt);
        cmd.Parameters.AddWithValue("$now",    now);
        var id = Convert.ToInt32(await cmd.ExecuteScalarAsync());
        return new PromptSet(id, name, useSession, recommendationPrompt);
    }

    public async Task<PromptSet> UpdateAsync(int id, string name, bool useSession, string recommendationPrompt)
    {
        await using var conn = new SqliteConnection(_connectionString);
        await conn.OpenAsync();
        await using var cmd = conn.CreateCommand();
        cmd.CommandText = """
            UPDATE prompt_sets
            SET    name = $name, use_session = $use, recommendation_prompt = $prompt, updated_at = $now
            WHERE  id = $id;
            """;
        cmd.Parameters.AddWithValue("$id",     id);
        cmd.Parameters.AddWithValue("$name",   name);
        cmd.Parameters.AddWithValue("$use",    useSession ? 1 : 0);
        cmd.Parameters.AddWithValue("$prompt", recommendationPrompt);
        cmd.Parameters.AddWithValue("$now",    DateTimeOffset.UtcNow.UtcDateTime.ToString("O"));
        await cmd.ExecuteNonQueryAsync();
        return new PromptSet(id, name, useSession, recommendationPrompt);
    }

    public async Task DeleteAsync(int id)
    {
        await using var conn = new SqliteConnection(_connectionString);
        await conn.OpenAsync();
        await using var cmd = conn.CreateCommand();
        cmd.CommandText = "DELETE FROM prompt_sets WHERE id = $id;";
        cmd.Parameters.AddWithValue("$id", id);
        await cmd.ExecuteNonQueryAsync();
    }

    private static PromptSet ReadRow(SqliteDataReader r) => new(
        Id:                   r.GetInt32(0),
        Name:                 r.GetString(1),
        UseSession:           r.GetInt32(2) == 1,
        RecommendationPrompt: r.IsDBNull(3) ? string.Empty : r.GetString(3));
}
