using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Reco.Api.Migrations
{
    public partial class Phase21_ResolveSessionMemoryToken : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Replace {sessionMemoryInstruction} token with the actual instruction text.
            // SQLite char(10) is used for newlines so they survive as real \n bytes in the stored value.
            // String concat avoids C# interpolation conflicts with the curly braces in the token name.
            var replacement =
                "char(10) || char(10) || " +
                "'Important: each user message may begin with a session history preamble that shows " +
                "the full conversation timeline — what the user said, what you recommended, and what " +
                "tracks they added to their player or looked up on YouTube. When this history is present, " +
                "always reference it in your reply. Connect your new recommendations to what the user has " +
                "demonstrably enjoyed or explored. Acknowledge the temporal context where relevant — note " +
                "how long they have been listening and whether they are likely still listening. Make every " +
                "response feel like a natural continuation of an ongoing personal conversation, not a " +
                "fresh start.'";

            migrationBuilder.Sql(
                "UPDATE prompt_sets " +
                "SET    recommendation_prompt = REPLACE(" +
                "           recommendation_prompt," +
                "           '{sessionMemoryInstruction}'," +
                "           " + replacement +
                "       )," +
                "       updated_at = datetime('now') " +
                "WHERE  recommendation_prompt LIKE '%{sessionMemoryInstruction}%';"
            );
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            var originalText =
                "char(10) || char(10) || " +
                "'Important: each user message may begin with a session history preamble that shows " +
                "the full conversation timeline — what the user said, what you recommended, and what " +
                "tracks they added to their player or looked up on YouTube. When this history is present, " +
                "always reference it in your reply. Connect your new recommendations to what the user has " +
                "demonstrably enjoyed or explored. Acknowledge the temporal context where relevant — note " +
                "how long they have been listening and whether they are likely still listening. Make every " +
                "response feel like a natural continuation of an ongoing personal conversation, not a " +
                "fresh start.'";

            migrationBuilder.Sql(
                "UPDATE prompt_sets " +
                "SET    recommendation_prompt = REPLACE(" +
                "           recommendation_prompt," +
                "           " + originalText + "," +
                "           '{sessionMemoryInstruction}'" +
                "       )," +
                "       updated_at = datetime('now') " +
                "WHERE  recommendation_prompt LIKE '%Important: each user message may begin%';"
            );
        }
    }
}
