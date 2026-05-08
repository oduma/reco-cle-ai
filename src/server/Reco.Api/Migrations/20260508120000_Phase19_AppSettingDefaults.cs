using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Reco.Api.Migrations
{
    /// <inheritdoc />
    public partial class Phase19_AppSettingDefaults : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("""
                CREATE TABLE IF NOT EXISTS app_setting_defaults (
                    key        TEXT PRIMARY KEY,
                    value      TEXT NOT NULL,
                    updated_at TEXT NOT NULL
                );
                """);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DROP TABLE IF EXISTS app_setting_defaults;");
        }
    }
}
