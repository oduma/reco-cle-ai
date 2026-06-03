using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Reco.Api.Migrations
{
    public partial class Phase22_ExtractResponseFormatAppendix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Strip the JSON-format rules block from any prompt set that still carries it.
            // The old text ran from " For each user request..." through "...nothing else."
            // and was embedded in the Default prompt between the persona sentence and the
            // "\n\nImportant:" session memory paragraph.
            // After this migration the prompt contains only persona + session memory text;
            // the format rules are applied automatically by BuildSystemInstruction at call time.
            //
            // char(10) is used for newlines so the literals survive as real \n bytes in SQLite.

            var oldBlock =
                "' For each user request you must respond with a JSON object containing exactly two fields:' || char(10) || " +
                "'- \"narrative\": a warm, conversational paragraph recommending music, written like a knowledgeable curator. " +
                "Mention specific tracks and explain why you are recommending them. " +
                "Wrap every track title and artist name in **double asterisks** — " +
                "for example: **Kind of Blue** by **Miles Davis**.' || char(10) || " +
                "'- \"tracks\": an array of the specific tracks you mention in your narrative. Each track must have " +
                "\"title\", \"artist\", and optionally \"album\".' || char(10) || " +
                "'Return between {minTracks} and {maxTracks} tracks. Always return valid JSON and nothing else.'";

            var newText =
                "' Write a warm, conversational paragraph recommending music, " +
                "like a knowledgeable curator. Mention specific tracks and explain why you are recommending them.'";

            migrationBuilder.Sql(
                "UPDATE prompt_sets " +
                "SET    recommendation_prompt = REPLACE(" +
                "           recommendation_prompt, " +
                           oldBlock + ", " +
                           newText +
                "       ), " +
                "       updated_at = datetime('now') " +
                "WHERE  recommendation_prompt LIKE '%For each user request you must respond with a JSON%';"
            );
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Re-insert the JSON-format rules block into prompts that were cleaned by Up.
            var newBlock =
                "' For each user request you must respond with a JSON object containing exactly two fields:' || char(10) || " +
                "'- \"narrative\": a warm, conversational paragraph recommending music, written like a knowledgeable curator. " +
                "Mention specific tracks and explain why you are recommending them. " +
                "Wrap every track title and artist name in **double asterisks** — " +
                "for example: **Kind of Blue** by **Miles Davis**.' || char(10) || " +
                "'- \"tracks\": an array of the specific tracks you mention in your narrative. Each track must have " +
                "\"title\", \"artist\", and optionally \"album\".' || char(10) || " +
                "'Return between {minTracks} and {maxTracks} tracks. Always return valid JSON and nothing else.'";

            var oldText =
                "' Write a warm, conversational paragraph recommending music, " +
                "like a knowledgeable curator. Mention specific tracks and explain why you are recommending them.'";

            migrationBuilder.Sql(
                "UPDATE prompt_sets " +
                "SET    recommendation_prompt = REPLACE(" +
                "           recommendation_prompt, " +
                           oldText + ", " +
                           newBlock +
                "       ), " +
                "       updated_at = datetime('now') " +
                "WHERE  recommendation_prompt LIKE '%Write a warm, conversational paragraph recommending music%';"
            );
        }
    }
}
