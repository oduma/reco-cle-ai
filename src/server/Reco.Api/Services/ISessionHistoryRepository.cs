using Reco.Api.Models;

namespace Reco.Api.Services;

public interface ISessionHistoryRepository
{
    /// <summary>Creates the session_events table and indexes if they do not exist.</summary>
    Task EnsureCreatedAsync();

    /// <summary>
    /// Inserts a new session event and returns its auto-generated id.
    /// </summary>
    Task<int> InsertEventAsync(
        string eventType,
        DateTimeOffset timestamp,
        string userLabel,
        string? content,
        string? artist,
        string? album,
        string? title,
        double? durationSeconds);

    /// <summary>
    /// Sets conversation_block = <paramref name="aiReplyId"/> on every active row
    /// whose conversation_block is currently NULL. Called immediately after an ai-reply
    /// is inserted so that the entire block (user-chat + tracks + ai-reply) is tied together.
    /// </summary>
    Task AssignConversationBlockAsync(int aiReplyId);

    /// <summary>Returns all active session events ordered by timestamp ascending.</summary>
    Task<IReadOnlyList<SessionEvent>> GetActiveEventsAsync();

    /// <summary>Returns the count of active ai-reply events (= current memory usage).</summary>
    Task<int> GetActiveAiReplyCountAsync();

    /// <summary>
    /// Returns the conversation_block id of the oldest active ai-reply, or null if there are none.
    /// Used to identify the block to evict next.
    /// </summary>
    Task<int?> GetOldestActiveConversationBlockAsync();

    /// <summary>Soft-deletes all events belonging to the given conversation block.</summary>
    Task SoftDeleteBlockAsync(int conversationBlock);

    /// <summary>Soft-deletes every active event (memory bust).</summary>
    Task SoftDeleteAllActiveAsync();
}
