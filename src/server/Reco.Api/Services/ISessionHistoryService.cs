using Reco.Api.Models;

namespace Reco.Api.Services;

public interface ISessionHistoryService
{
    /// <summary>Records a user prompt to the session log.</summary>
    Task LogUserChatAsync(string prompt, DateTimeOffset timestamp);

    /// <summary>
    /// Records an AI narrative to the session log, closes the current conversation block,
    /// and triggers FIFO eviction if memory is full.
    /// </summary>
    Task LogAiReplyAsync(string narrative, DateTimeOffset timestamp);

    /// <summary>
    /// Records a track interaction event.
    /// <paramref name="eventType"/> must be <c>"track-added"</c> or <c>"track-youtube"</c>.
    /// </summary>
    Task LogTrackEventAsync(
        string eventType,
        string artist,
        string? album,
        string title,
        double? durationSeconds,
        DateTimeOffset timestamp);

    /// <summary>Returns all active session events ordered by timestamp ascending.</summary>
    Task<IReadOnlyList<SessionEvent>> GetActiveEventsAsync();

    /// <summary>Returns current memory usage (active AI reply count vs. configured maximum).</summary>
    Task<MemoryStatus> GetMemoryStatusAsync();

    /// <summary>Soft-deletes every active session event (memory bust).</summary>
    Task BustMemoryAsync();
}
