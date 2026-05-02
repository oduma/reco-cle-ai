namespace Reco.Api.Services;

/// <summary>
/// Shared AI instruction fragments included in every provider's system prompt.
/// Add new cross-cutting instructions here so all current and future providers
/// pick them up automatically.
/// </summary>
internal static class AiSystemInstructions
{
    /// <summary>
    /// Instructs the AI to use the session history preamble that is injected into
    /// each user message by SessionContextBuilder, and to make the conversation
    /// feel continuous and personally informed by the user's listening behaviour.
    /// </summary>
    internal const string SessionMemoryInstruction =
        "\n\nImportant: each user message may begin with a session history preamble that shows " +
        "the full conversation timeline — what the user said, what you recommended, and what " +
        "tracks they added to their player or looked up on YouTube. When this history is present, " +
        "always reference it in your reply. Connect your new recommendations to what the user has " +
        "demonstrably enjoyed or explored. Acknowledge the temporal context where relevant — note " +
        "how long they have been listening and whether they are likely still listening. Make every " +
        "response feel like a natural continuation of an ongoing personal conversation, not a " +
        "fresh start.";
}
