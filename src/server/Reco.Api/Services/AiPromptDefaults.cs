namespace Reco.Api.Services;

/// <summary>
/// Hardcoded default values for every AI prompt stored in app_settings.
/// These are seeded into the DB on first run and used as fallbacks when a key
/// has been deleted or not yet written. All prompt templates may contain the
/// following substitution tokens:
///   {sessionMemoryInstruction}  — replaced with the value of SESSION_MEMORY_INSTRUCTION
///   {minTracks}                 — replaced at call-time with the configured minimum
///   {maxTracks}                 — replaced at call-time with the configured maximum
/// </summary>
public static class AiPromptDefaults
{
    // ── Prompt keys ───────────────────────────────────────────────────────────

    public const string RecommendationInstructionKey = "RECOMMENDATION_INSTRUCTION";
    public const string DiarySystemInstructionKey    = "DIARY_SYSTEM_INSTRUCTION";
    public const string SessionMemoryInstructionKey  = "SESSION_MEMORY_INSTRUCTION";

    public const string MoodAnnotationPoeticKey      = "MOOD_ANNOTATION_POETIC";
    public const string MoodAnnotationHumorousKey    = "MOOD_ANNOTATION_HUMOROUS";
    public const string MoodAnnotationCosmicKey      = "MOOD_ANNOTATION_COSMIC";
    public const string MoodAnnotationMinimalistKey  = "MOOD_ANNOTATION_MINIMALIST";
    public const string MoodAnnotationRomanticKey    = "MOOD_ANNOTATION_ROMANTIC";
    public const string MoodAnnotationChaoticKey     = "MOOD_ANNOTATION_CHAOTIC";
    public const string MoodAnnotationNoirKey        = "MOOD_ANNOTATION_NOIR";
    public const string MoodAnnotationPsychedelicKey = "MOOD_ANNOTATION_PSYCHEDELIC";

    // ── Default values ────────────────────────────────────────────────────────

    public const string RecommendationInstruction =
        "You are an expert music discovery assistant. For each user request you must respond with a JSON object " +
        "containing exactly two fields:\n" +
        "- \"narrative\": a warm, conversational paragraph recommending music, written like a knowledgeable curator. " +
        "Mention specific tracks and explain why you are recommending them. " +
        "Wrap every track title and artist name in **double asterisks** — " +
        "for example: **Kind of Blue** by **Miles Davis**.\n" +
        "- \"tracks\": an array of the specific tracks you mention in your narrative. Each track must have " +
        "\"title\", \"artist\", and optionally \"album\".\n" +
        "Return between {minTracks} and {maxTracks} tracks. " +
        "Always return valid JSON and nothing else." +
        "{sessionMemoryInstruction}";

    public const string DiarySystemInstruction =
        "You are a lyrical diarist writing in the voice of the listener. " +
        "Given a list of music prompts a person explored during a single day, " +
        "write a short, reflective diary entry — no more than three paragraphs — " +
        "in first person, as though the listener is writing in their own journal. " +
        "Capture the emotional arc of the day through the lens of the music they sought out. " +
        "Be literary, evocative, and personal. Do not list tracks or artists. " +
        "Do not include a date heading. Write only the diary prose, nothing else.";

    public const string SessionMemoryInstruction =
        "\n\nImportant: each user message may begin with a session history preamble that shows " +
        "the full conversation timeline — what the user said, what you recommended, and what " +
        "tracks they added to their player or looked up on YouTube. When this history is present, " +
        "always reference it in your reply. Connect your new recommendations to what the user has " +
        "demonstrably enjoyed or explored. Acknowledge the temporal context where relevant — note " +
        "how long they have been listening and whether they are likely still listening. Make every " +
        "response feel like a natural continuation of an ongoing personal conversation, not a " +
        "fresh start.";

    public const string MoodAnnotationPoetic      = "I'm in a poetic mood — please respond with lyrical, flowing language.";
    public const string MoodAnnotationHumorous    = "I'm feeling playful and humorous — bring some wit to your response.";
    public const string MoodAnnotationCosmic      = "I'm in a cosmic mood — think vast, universal, and transcendent.";
    public const string MoodAnnotationMinimalist  = "I'm in a minimalist mood — keep your response focused and stripped back.";
    public const string MoodAnnotationRomantic    = "I'm feeling romantic — bring warmth, emotion, and longing to your reply.";
    public const string MoodAnnotationChaotic     = "I'm in a chaotic mood — be bold, unpredictable, and eclectic.";
    public const string MoodAnnotationNoir        = "I'm in a noir mood — keep things dark, brooding, and atmospheric.";
    public const string MoodAnnotationPsychedelic = "I'm in a psychedelic mood — go surreal, swirling, and mind-expanding.";

    // ── Lookup helpers ────────────────────────────────────────────────────────

    private static readonly IReadOnlyDictionary<string, string> _all =
        new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
        {
            [RecommendationInstructionKey]  = RecommendationInstruction,
            [DiarySystemInstructionKey]     = DiarySystemInstruction,
            [SessionMemoryInstructionKey]   = SessionMemoryInstruction,
            [MoodAnnotationPoeticKey]       = MoodAnnotationPoetic,
            [MoodAnnotationHumorousKey]     = MoodAnnotationHumorous,
            [MoodAnnotationCosmicKey]       = MoodAnnotationCosmic,
            [MoodAnnotationMinimalistKey]   = MoodAnnotationMinimalist,
            [MoodAnnotationRomanticKey]     = MoodAnnotationRomantic,
            [MoodAnnotationChaoticKey]      = MoodAnnotationChaotic,
            [MoodAnnotationNoirKey]         = MoodAnnotationNoir,
            [MoodAnnotationPsychedelicKey]  = MoodAnnotationPsychedelic,
        };

    public static IReadOnlyDictionary<string, string> All => _all;

    public static string Get(string key) =>
        _all.TryGetValue(key, out var v) ? v : string.Empty;

    public static string? GetMoodAnnotation(string mood) =>
        _all.TryGetValue($"MOOD_ANNOTATION_{mood.ToUpperInvariant()}", out var v) ? v : null;
}
