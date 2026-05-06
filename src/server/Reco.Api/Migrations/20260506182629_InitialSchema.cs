using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Reco.Api.Migrations
{
    /// <inheritdoc />
    public partial class InitialSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "app_settings",
                columns: table => new
                {
                    key = table.Column<string>(type: "TEXT", nullable: false),
                    value = table.Column<string>(type: "TEXT", nullable: false),
                    updated_at = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_app_settings", x => x.key);
                });

            migrationBuilder.CreateTable(
                name: "diary_entries",
                columns: table => new
                {
                    date = table.Column<string>(type: "TEXT", nullable: false),
                    content = table.Column<string>(type: "TEXT", nullable: false),
                    created_at = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_diary_entries", x => x.date);
                });

            migrationBuilder.CreateTable(
                name: "session_events",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    event_type = table.Column<string>(type: "TEXT", nullable: false),
                    timestamp = table.Column<string>(type: "TEXT", nullable: false),
                    user_label = table.Column<string>(type: "TEXT", nullable: false, defaultValue: "me"),
                    content = table.Column<string>(type: "TEXT", nullable: true),
                    artist = table.Column<string>(type: "TEXT", nullable: true),
                    album = table.Column<string>(type: "TEXT", nullable: true),
                    title = table.Column<string>(type: "TEXT", nullable: true),
                    duration_seconds = table.Column<double>(type: "REAL", nullable: true),
                    is_active = table.Column<int>(type: "INTEGER", nullable: false, defaultValue: 1),
                    conversation_block = table.Column<int>(type: "INTEGER", nullable: true),
                    mood = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_session_events", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "session_state",
                columns: table => new
                {
                    key = table.Column<string>(type: "TEXT", nullable: false),
                    value = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_session_state", x => x.key);
                });

            migrationBuilder.CreateIndex(
                name: "idx_se_conversation_block",
                table: "session_events",
                column: "conversation_block");

            migrationBuilder.CreateIndex(
                name: "idx_se_is_active",
                table: "session_events",
                column: "is_active");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "app_settings");

            migrationBuilder.DropTable(
                name: "diary_entries");

            migrationBuilder.DropTable(
                name: "session_events");

            migrationBuilder.DropTable(
                name: "session_state");
        }
    }
}
