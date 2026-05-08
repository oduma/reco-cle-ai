using System.Runtime.InteropServices;

namespace Reco.Api.Services;

/// <summary>
/// Hardcoded default values for every non-secret, non-prompt application setting.
/// These are served via GET /api/settings/defaults and used by the UI reset button.
/// </summary>
public static class AppSettingDefaults
{
    // ── Keys ──────────────────────────────────────────────────────────────────

    public const string GeminiModelKey                          = "GEMINI_MODEL";
    public const string GeminiBaseUrlKey                        = "GEMINI_BASE_URL";
    public const string OllamaBaseUrlKey                        = "OLLAMA_BASE_URL";
    public const string OllamaWhisperModelKey                   = "OLLAMA_WHISPER_MODEL";
    public const string OllamaShoutModelKey                     = "OLLAMA_SHOUT_MODEL";
    public const string LastFmBaseUrlKey                        = "LASTFM_BASE_URL";
    public const string ClementineExePathKey                    = "CLEMENTINE_EXE_PATH";
    public const string ClementineMatchThresholdKey             = "CLEMENTINE_MATCH_THRESHOLD";
    public const string RecommendationMinTracksKey              = "RECOMMENDATION_MIN_TRACKS";
    public const string RecommendationMaxTracksKey              = "RECOMMENDATION_MAX_TRACKS";
    public const string RecommendationSuggestionCacheMinutesKey = "RECOMMENDATION_SUGGESTION_CACHE_MINUTES";
    public const string RecommendationHistoryMaxRowsKey         = "RECOMMENDATION_HISTORY_MAX_ROWS";
    public const string SessionMemorySizeKey                    = "SESSION_MEMORY_SIZE";
    public const string SessionDefaultTrackDurationSecondsKey   = "SESSION_DEFAULT_TRACK_DURATION_SECONDS";

    // ── Default values ────────────────────────────────────────────────────────

    public const string GeminiModel                          = "gemini-2.5-pro";
    public const string GeminiBaseUrl                        = "https://generativelanguage.googleapis.com";
    public const string OllamaBaseUrl                        = "http://localhost:11434";
    public const string OllamaWhisperModel                   = "llama3.1:8b";
    public const string OllamaShoutModel                     = "gemma4:e4b";
    public const string LastFmBaseUrl                        = "https://ws.audioscrobbler.com/2.0/";
    public const string ClementineMatchThreshold             = "0.75";
    public const string RecommendationMinTracks              = "10";
    public const string RecommendationMaxTracks              = "20";
    public const string RecommendationSuggestionCacheMinutes = "60";
    public const string RecommendationHistoryMaxRows         = "10000";
    public const string SessionMemorySize                    = "25";
    public const string SessionDefaultTrackDurationSeconds   = "210";

    public static string ClementineExePath =>
        RuntimeInformation.IsOSPlatform(OSPlatform.Windows)
            ? @"C:\Program Files (x86)\Clementine\clementine.exe"
            : "clementine";

    // ── Lookup ────────────────────────────────────────────────────────────────

    public static IReadOnlyDictionary<string, string> All { get; } =
        new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
        {
            [GeminiModelKey]                          = GeminiModel,
            [GeminiBaseUrlKey]                        = GeminiBaseUrl,
            [OllamaBaseUrlKey]                        = OllamaBaseUrl,
            [OllamaWhisperModelKey]                   = OllamaWhisperModel,
            [OllamaShoutModelKey]                     = OllamaShoutModel,
            [LastFmBaseUrlKey]                        = LastFmBaseUrl,
            [ClementineExePathKey]                    = ClementineExePath,
            [ClementineMatchThresholdKey]             = ClementineMatchThreshold,
            [RecommendationMinTracksKey]              = RecommendationMinTracks,
            [RecommendationMaxTracksKey]              = RecommendationMaxTracks,
            [RecommendationSuggestionCacheMinutesKey] = RecommendationSuggestionCacheMinutes,
            [RecommendationHistoryMaxRowsKey]         = RecommendationHistoryMaxRows,
            [SessionMemorySizeKey]                    = SessionMemorySize,
            [SessionDefaultTrackDurationSecondsKey]   = SessionDefaultTrackDurationSeconds,
        };
}
