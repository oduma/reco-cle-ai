using Reco.Api.DTOs;
using Reco.Api.Models;

namespace Reco.Api.Services;

public interface ISessionHistoryService
{
    /// <summary>Records a user prompt to the session log.</summary>
    Task LogUserChatAsync(string prompt, DateTimeOffset timestamp);

    /// <summary>
    /// Records an AI narrative to the session log, closes the current conversation block,
    /// triggers FIFO eviction if memory is full, and returns the new event ID.
    /// </summary>
    Task<int> LogAiReplyAsync(string narrative, DateTimeOffset timestamp);

    /// <summary>Stores the raw (un-enriched) track list for the given AI reply event.</summary>
    Task LogTrackSuggestionsAsync(IReadOnlyList<RawTrack> rawTracks, int aiReplyId);

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

    /// <summary>Returns the full conversation history with active reply context.</summary>
    Task<SessionHistoryResponse> GetSessionHistoryAsync();

    /// <summary>Returns the raw tracks for the given AI reply event ID, or null if none exist.</summary>
    Task<IReadOnlyList<RawTrack>?> GetRawSuggestionsAsync(int replyId);

    /// <summary>Persists the active reply ID to session state.</summary>
    Task SetActiveReplyIdAsync(int? replyId);

    /// <summary>Returns current memory usage (active AI reply count vs. configured maximum).</summary>
    Task<MemoryStatus> GetMemoryStatusAsync();

    /// <summary>Soft-deletes every active session event and clears the active reply state.</summary>
    Task BustMemoryAsync();
}
