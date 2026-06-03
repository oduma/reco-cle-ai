using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Reco.Api.Migrations
{
    public partial class Phase21_PromptSets : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("""
                CREATE TABLE IF NOT EXISTS prompt_sets (
                    id                    INTEGER PRIMARY KEY AUTOINCREMENT,
                    name                  TEXT    NOT NULL UNIQUE,
                    use_session           INTEGER NOT NULL DEFAULT 1,
                    recommendation_prompt TEXT    NOT NULL DEFAULT '',
                    created_at            TEXT    NOT NULL,
                    updated_at            TEXT    NOT NULL
                );
                """);

            migrationBuilder.Sql("""
                ALTER TABLE session_events
                ADD COLUMN prompt_set_name TEXT NOT NULL DEFAULT 'Default';
                """);

            // Migrate existing active_reply_id key to namespaced form for Default prompt set
            migrationBuilder.Sql("""
                UPDATE session_state
                SET key = 'active_reply_id:Default'
                WHERE key = 'active_reply_id';
                """);

            // Seed Default prompt set from existing RECOMMENDATION_INSTRUCTION if present
            migrationBuilder.Sql("""
                INSERT OR IGNORE INTO prompt_sets (name, use_session, recommendation_prompt, created_at, updated_at)
                SELECT 'Default', 1, COALESCE(value, ''), datetime('now'), datetime('now')
                FROM   app_settings
                WHERE  key = 'RECOMMENDATION_INSTRUCTION';
                """);

            // Ensure Default always exists even if RECOMMENDATION_INSTRUCTION was absent
            migrationBuilder.Sql("""
                INSERT OR IGNORE INTO prompt_sets (name, use_session, recommendation_prompt, created_at, updated_at)
                VALUES ('Default', 1, '', datetime('now'), datetime('now'));
                """);

            migrationBuilder.Sql("""
                INSERT OR IGNORE INTO app_settings (key, value, updated_at)
                VALUES ('ACTIVE_PROMPT_SET_NAME', 'Default', datetime('now'));
                """);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DROP TABLE IF EXISTS prompt_sets;");
            migrationBuilder.Sql("""
                UPDATE session_state
                SET key = 'active_reply_id'
                WHERE key = 'active_reply_id:Default';
                """);
            migrationBuilder.Sql("DELETE FROM app_settings WHERE key = 'ACTIVE_PROMPT_SET_NAME';");
        }
    }
}
