namespace Reco.Api.Configuration;

public class SessionMemoryOptions
{
    public const string SectionName = "Session";

    /// <summary>Path to the session history SQLite database file.</summary>
    public string DbPath { get; set; } = "session_history.db";

    /// <summary>Maximum number of active AI replies kept in memory before FIFO eviction.</summary>
    public int MemorySize { get; set; } = 25;

    /// <summary>
    /// Assumed track duration in seconds used when no Clementine data is available
    /// (discovery tracks, YouTube-clicked tracks). Default = 210 s (3.5 min).
    /// </summary>
    public double DefaultTrackDurationSeconds { get; set; } = 210.0;
}
