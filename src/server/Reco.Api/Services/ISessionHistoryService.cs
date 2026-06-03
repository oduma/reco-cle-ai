using Reco.Api.DTOs;
using Reco.Api.Models;

namespace Reco.Api.Services;

public interface ISessionHistoryService
{
    Task LogUserChatAsync(string prompt, DateTimeOffset timestamp, string promptSetName, string? mood = null);

    Task<int> LogAiReplyAsync(string narrative, DateTimeOffset timestamp, string promptSetName);

    Task LogTrackSuggestionsAsync(IReadOnlyList<RawTrack> rawTracks, int aiReplyId, string promptSetName);

    Task LogTrackEventAsync(
        string eventType,
        string artist,
        string? album,
        string title,
        double? durationSeconds,
        DateTimeOffset timestamp,
        string promptSetName);

    Task<IReadOnlyList<SessionEvent>> GetActiveEventsAsync(string promptSetName);

    Task<SessionHistoryResponse> GetSessionHistoryAsync(string promptSetName);

    Task<IReadOnlyList<RawTrack>?> GetRawSuggestionsAsync(int replyId);

    Task SetActiveReplyIdAsync(int? replyId, string promptSetName);

    Task<MemoryStatus> GetMemoryStatusAsync(string promptSetName);

    Task BustMemoryAsync(string promptSetName);

    Task<IReadOnlyList<RawTrack>> GetRecentRecommendationHistoryAsync(int limit);
}
