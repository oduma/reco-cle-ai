using Reco.Api.DTOs;
using Reco.Api.Models;

namespace Reco.Api.Services;

public interface ISessionHistoryRepository
{
    Task<int> InsertEventAsync(
        string eventType,
        DateTimeOffset timestamp,
        string userLabel,
        string? content,
        string? artist,
        string? album,
        string? title,
        double? durationSeconds,
        string promptSetName,
        int? conversationBlock = null,
        string? mood = null);

    Task AssignConversationBlockAsync(int aiReplyId, string promptSetName);

    Task InsertTrackSuggestionsAsync(IReadOnlyList<RawTrack> rawTracks, int conversationBlock, string promptSetName);

    Task<IReadOnlyList<SessionEvent>> GetActiveEventsAsync(string promptSetName);

    Task<IReadOnlyList<HistoryTurnDto>> GetHistoryWithSuggestionsAsync(string promptSetName);

    Task<IReadOnlyList<RawTrack>?> GetRawSuggestionsAsync(int replyId);

    Task<int?> GetActiveReplyIdAsync(string promptSetName);

    Task SetActiveReplyIdAsync(int? replyId, string promptSetName);

    Task<int> GetActiveAiReplyCountAsync(string promptSetName);

    Task<int?> GetOldestActiveConversationBlockAsync(string promptSetName);

    Task SoftDeleteBlockAsync(int conversationBlock);

    Task SoftDeleteAllActiveAsync(string promptSetName);

    Task InsertRecommendationHistoryAsync(IReadOnlyList<RawTrack> tracks, int maxRows);

    Task<IReadOnlyList<RawTrack>> GetRecentRecommendationHistoryAsync(int limit);
}
