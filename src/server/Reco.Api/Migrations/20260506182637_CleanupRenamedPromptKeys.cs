using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Reco.Api.Migrations
{
    /// <inheritdoc />
    public partial class CleanupRenamedPromptKeys : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Preserve any user-customised GEMINI_RECOMMENDATION_INSTRUCTION value under the new unified key.
            // INSERT OR IGNORE means we only copy it when RECOMMENDATION_INSTRUCTION does not already exist.
            migrationBuilder.Sql("""
                INSERT OR IGNORE INTO app_settings (key, value, updated_at)
                SELECT 'RECOMMENDATION_INSTRUCTION', value, updated_at
                FROM   app_settings
                WHERE  key = 'GEMINI_RECOMMENDATION_INSTRUCTION';
                """);

            // Remove the three keys that no longer exist in the codebase.
            migrationBuilder.Sql("""
                DELETE FROM app_settings
                WHERE key IN (
                    'CHAT_SYSTEM_INSTRUCTION',
                    'GEMINI_RECOMMENDATION_INSTRUCTION',
                    'OLLAMA_RECOMMENDATION_INSTRUCTION'
                );
                """);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // The deleted rows cannot be reliably restored — no rollback defined.
        }
    }
}
