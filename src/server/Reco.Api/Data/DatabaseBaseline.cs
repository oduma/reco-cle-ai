using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;

namespace Reco.Api.Data;

/// <summary>
/// Handles the one-time baseline stamp for databases that existed before EF Core migrations
/// were introduced. On first startup after the upgrade, if the database already has the
/// expected tables but no __EFMigrationsHistory table, we create the history table and
/// mark InitialSchema as already applied so MigrateAsync() skips it and only runs
/// CleanupRenamedPromptKeys and any future migrations.
/// </summary>
public static class DatabaseBaseline
{
    public static async Task StampIfNeededAsync(AppDbContext db)
    {
        var connectionString = db.Database.GetConnectionString()!;

        await using var conn = new SqliteConnection(connectionString);
        await conn.OpenAsync();

        // Check whether __EFMigrationsHistory already exists.
        await using var checkCmd = conn.CreateCommand();
        checkCmd.CommandText = """
            SELECT COUNT(*) FROM sqlite_master
            WHERE type = 'table' AND name = '__EFMigrationsHistory';
            """;
        var historyExists = Convert.ToInt32(await checkCmd.ExecuteScalarAsync()) > 0;

        if (historyExists) return;

        // Check whether the pre-EF tables are already present (i.e. this is an existing DB).
        await using var tableCheckCmd = conn.CreateCommand();
        tableCheckCmd.CommandText = """
            SELECT COUNT(*) FROM sqlite_master
            WHERE type = 'table' AND name = 'session_events';
            """;
        var tablesExist = Convert.ToInt32(await tableCheckCmd.ExecuteScalarAsync()) > 0;

        if (!tablesExist) return; // Brand-new DB — let MigrateAsync() run InitialSchema normally.

        // Existing pre-migration DB: create the history table and stamp InitialSchema as applied.
        await using var createCmd = conn.CreateCommand();
        createCmd.CommandText = """
            CREATE TABLE __EFMigrationsHistory (
                MigrationId    TEXT NOT NULL CONSTRAINT PK___EFMigrationsHistory PRIMARY KEY,
                ProductVersion TEXT NOT NULL
            );
            """;
        await createCmd.ExecuteNonQueryAsync();

        await using var stampCmd = conn.CreateCommand();
        stampCmd.CommandText = """
            INSERT INTO __EFMigrationsHistory (MigrationId, ProductVersion)
            VALUES ($id, $ver);
            """;

        // Derive the EF Core product version from the assembly.
        var efVersion = typeof(DbContext).Assembly.GetName().Version?.ToString() ?? "9.0.0";
        // Get the actual migration ID from the generated snapshot class name prefix.
        stampCmd.Parameters.AddWithValue("$id",  "20260506182629_InitialSchema");
        stampCmd.Parameters.AddWithValue("$ver", efVersion);
        await stampCmd.ExecuteNonQueryAsync();
    }
}
