using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Reco.Api.Migrations
{
    /// <inheritdoc />
    public partial class Phase17_RecommendationHistory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "recommendation_history",
                columns: table => new
                {
                    id         = table.Column<int>(type: "INTEGER", nullable: false)
                                     .Annotation("Sqlite:Autoincrement", true),
                    artist     = table.Column<string>(type: "TEXT", nullable: false),
                    title      = table.Column<string>(type: "TEXT", nullable: false),
                    album      = table.Column<string>(type: "TEXT", nullable: true),
                    recorded_at = table.Column<string>(type: "TEXT", nullable: false),
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_recommendation_history", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "idx_rh_recorded_at",
                table: "recommendation_history",
                column: "recorded_at");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(name: "recommendation_history");
        }
    }
}
