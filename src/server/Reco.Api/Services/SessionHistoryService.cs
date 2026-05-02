using Reco.Api.DTOs;
using Reco.Api.Models;

namespace Reco.Api.Services;

public class SessionHistoryService : ISessionHistoryService
{
    private readonly ISessionHistoryRepository _repo;
    private readonly IAppSettingsService _settings;

    private const string UserLabel = "me";

    public SessionHistoryService(
        ISessionHistoryRepository repo,
        IAppSettingsService settings)
    {
        _repo     = repo;
        _settings = settings;
    }

    public Task LogUserChatAsync(string prompt, DateTimeOffset timestamp) =>
        _repo.InsertEventAsync("user-chat", timestamp, UserLabel,
            content: prompt,
            artist: null, album: null, title: null, durationSeconds: null);

    public async Task<int> LogAiReplyAsync(string narrative, DateTimeOffset timestamp)
    {
        var id = await _repo.InsertEventAsync("ai-reply", timestamp, UserLabel,
            content: narrative,
            artist: null, album: null, title: null, durationSeconds: null);

        await _repo.AssignConversationBlockAsync(id);
        await EvictIfNeededAsync();

        return id;
    }

    public Task LogTrackSuggestionsAsync(IReadOnlyList<RawTrack> rawTracks, int aiReplyId) =>
        _repo.InsertTrackSuggestionsAsync(rawTracks, aiReplyId);

    public Task LogTrackEventAsync(
        string eventType,
        string artist,
        string? album,
        string title,
        double? durationSeconds,
        DateTimeOffset timestamp) =>
        _repo.InsertEventAsync(eventType, timestamp, UserLabel,
            content: null,
            artist: artist, album: album, title: title, durationSeconds: durationSeconds);

    public Task<IReadOnlyList<SessionEvent>> GetActiveEventsAsync() =>
        _repo.GetActiveEventsAsync();

    public async Task<SessionHistoryResponse> GetSessionHistoryAsync()
    {
        var turns         = await _repo.GetHistoryWithSuggestionsAsync();
        var activeReplyId = await _repo.GetActiveReplyIdAsync();
        return new SessionHistoryResponse(turns, activeReplyId);
    }

    public Task<IReadOnlyList<RawTrack>?> GetRawSuggestionsAsync(int replyId) =>
        _repo.GetRawSuggestionsAsync(replyId);

    public Task SetActiveReplyIdAsync(int? replyId) =>
        _repo.SetActiveReplyIdAsync(replyId);

    public async Task<MemoryStatus> GetMemoryStatusAsync()
    {
        var used       = await _repo.GetActiveAiReplyCountAsync();
        var memorySize = await _settings.GetIntAsync("SESSION_MEMORY_SIZE", 25);
        return new MemoryStatus(used, memorySize);
    }

    public async Task BustMemoryAsync()
    {
        await _repo.SoftDeleteAllActiveAsync();
        await _repo.SetActiveReplyIdAsync(null);
    }

    // ── Private ───────────────────────────────────────────────────────────────

    private async Task EvictIfNeededAsync()
    {
        var memorySize = await _settings.GetIntAsync("SESSION_MEMORY_SIZE", 25);
        while (await _repo.GetActiveAiReplyCountAsync() > memorySize)
        {
            var oldestBlock = await _repo.GetOldestActiveConversationBlockAsync();
            if (oldestBlock is null) break;
            await _repo.SoftDeleteBlockAsync(oldestBlock.Value);
        }
    }
}
