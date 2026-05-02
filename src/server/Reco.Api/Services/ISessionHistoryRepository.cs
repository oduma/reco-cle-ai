using Reco.Api.DTOs;
using Reco.Api.Models;

namespace Reco.Api.Services;

public interface ISessionHistoryRepository
{
    /// <summary>Creates the session_events and session_state tables if they do not exist.</summary>
    Task EnsureCreatedAsync();

    /// <summary>
    /// Inserts a new session event and returns its auto-generated id.
    /// Pass <paramref name="conversationBlock"/> to pre-assign the block (used for track-suggestions events).
    /// </summary>
    Task<int> InsertEventAsync(
        string eventType,
        DateTimeOffset timestamp,
        string userLabel,
        string? content,
        string? artist,
        string? album,
        string? title,
        double? durationSeconds,
        int? conversationBlock = null);

    /// <summary>
    /// Sets conversation_block = <paramref name="aiReplyId"/> on every active row
    /// whose conversation_block is currently NULL.
    /// </summary>
    Task AssignConversationBlockAsync(int aiReplyId);

    /// <summary>
    /// Inserts a track-suggestions event with the given <paramref name="conversationBlock"/> pre-assigned.
    /// </summary>
    Task InsertTrackSuggestionsAsync(IReadOnlyList<RawTrack> rawTracks, int conversationBlock);

    /// <summary>Returns all active session events ordered by timestamp ascending.</summary>
    Task<IReadOnlyList<SessionEvent>> GetActiveEventsAsync();

    /// <summary>
    /// Returns all active user-chat and ai-reply events as HistoryTurnDto rows, including
    /// a HasSuggestions flag for each ai-reply.
    /// </summary>
    Task<IReadOnlyList<HistoryTurnDto>> GetHistoryWithSuggestionsAsync();

    /// <summary>
    /// Returns the raw (un-enriched) tracks stored for a given AI reply event ID,
    /// or null if no track-suggestions row exists for that reply.
    /// </summary>
    Task<IReadOnlyList<RawTrack>?> GetRawSuggestionsAsync(int replyId);

    /// <summary>
    /// Reads active_reply_id from session_state, validates it against active events,
    /// and falls back to the latest active ai-reply if the stored ID is stale or absent.
    /// </summary>
    Task<int?> GetActiveReplyIdAsync();

    /// <summary>Upserts the active_reply_id in session_state. Pass null to remove it.</summary>
    Task SetActiveReplyIdAsync(int? replyId);

    /// <summary>Returns the count of active ai-reply events (= current memory usage).</summary>
    Task<int> GetActiveAiReplyCountAsync();

    /// <summary>Returns the id of the oldest active ai-reply, or null if there are none.</summary>
    Task<int?> GetOldestActiveConversationBlockAsync();

    /// <summary>Soft-deletes all events belonging to the given conversation block.</summary>
    Task SoftDeleteBlockAsync(int conversationBlock);

    /// <summary>Soft-deletes every active event (memory bust).</summary>
    Task SoftDeleteAllActiveAsync();
}
