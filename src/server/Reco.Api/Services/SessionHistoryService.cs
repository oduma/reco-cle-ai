using Reco.Api.DTOs;
using Reco.Api.Models;

namespace Reco.Api.Services;

public class SessionHistoryService : ISessionHistoryService
{
    private readonly ISessionHistoryRepository _repo;
    private readonly IAppSettingsService _settings;

    private const string UserLabel = "me";

    public SessionHistoryService(ISessionHistoryRepository repo, IAppSettingsService settings)
    {
        _repo     = repo;
        _settings = settings;
    }

    public Task LogUserChatAsync(string prompt, DateTimeOffset timestamp, string promptSetName, string? mood = null) =>
        _repo.InsertEventAsync("user-chat", timestamp, UserLabel,
            content: prompt, artist: null, album: null, title: null, durationSeconds: null,
            promptSetName: promptSetName, mood: mood);

    public async Task<int> LogAiReplyAsync(string narrative, DateTimeOffset timestamp, string promptSetName)
    {
        var id = await _repo.InsertEventAsync("ai-reply", timestamp, UserLabel,
            content: narrative, artist: null, album: null, title: null, durationSeconds: null,
            promptSetName: promptSetName);

        await _repo.AssignConversationBlockAsync(id, promptSetName);
        await EvictIfNeededAsync(promptSetName);
        return id;
    }

    public async Task LogTrackSuggestionsAsync(IReadOnlyList<RawTrack> rawTracks, int aiReplyId, string promptSetName)
    {
        await _repo.InsertTrackSuggestionsAsync(rawTracks, aiReplyId, promptSetName);

        if (rawTracks.Count > 0)
        {
            var maxRows = await _settings.GetIntAsync("RECOMMENDATION_HISTORY_MAX_ROWS", 10_000);
            await _repo.InsertRecommendationHistoryAsync(rawTracks, maxRows);
        }
    }

    public Task LogTrackEventAsync(
        string eventType,
        string artist,
        string? album,
        string title,
        double? durationSeconds,
        DateTimeOffset timestamp,
        string promptSetName) =>
        _repo.InsertEventAsync(eventType, timestamp, UserLabel,
            content: null, artist: artist, album: album, title: title,
            durationSeconds: durationSeconds, promptSetName: promptSetName);

    public Task<IReadOnlyList<SessionEvent>> GetActiveEventsAsync(string promptSetName) =>
        _repo.GetActiveEventsAsync(promptSetName);

    public async Task<SessionHistoryResponse> GetSessionHistoryAsync(string promptSetName)
    {
        var turns         = await _repo.GetHistoryWithSuggestionsAsync(promptSetName);
        var activeReplyId = await _repo.GetActiveReplyIdAsync(promptSetName);
        return new SessionHistoryResponse(turns, activeReplyId);
    }

    public Task<IReadOnlyList<RawTrack>?> GetRawSuggestionsAsync(int replyId) =>
        _repo.GetRawSuggestionsAsync(replyId);

    public Task SetActiveReplyIdAsync(int? replyId, string promptSetName) =>
        _repo.SetActiveReplyIdAsync(replyId, promptSetName);

    public async Task<MemoryStatus> GetMemoryStatusAsync(string promptSetName)
    {
        var used       = await _repo.GetActiveAiReplyCountAsync(promptSetName);
        var memorySize = await _settings.GetIntAsync("SESSION_MEMORY_SIZE", 25);
        return new MemoryStatus(used, memorySize);
    }

    public async Task BustMemoryAsync(string promptSetName)
    {
        await _repo.SoftDeleteAllActiveAsync(promptSetName);
        await _repo.SetActiveReplyIdAsync(null, promptSetName);
    }

    public Task<IReadOnlyList<RawTrack>> GetRecentRecommendationHistoryAsync(int limit) =>
        _repo.GetRecentRecommendationHistoryAsync(limit);

    private async Task EvictIfNeededAsync(string promptSetName)
    {
        var memorySize = await _settings.GetIntAsync("SESSION_MEMORY_SIZE", 25);
        while (await _repo.GetActiveAiReplyCountAsync(promptSetName) > memorySize)
        {
            var oldestBlock = await _repo.GetOldestActiveConversationBlockAsync(promptSetName);
            if (oldestBlock is null) break;
            await _repo.SoftDeleteBlockAsync(oldestBlock.Value);
        }
    }
}
