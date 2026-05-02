using Microsoft.Extensions.Options;
using Reco.Api.Configuration;
using Reco.Api.Models;

namespace Reco.Api.Services;

public class SessionHistoryService : ISessionHistoryService
{
    private readonly ISessionHistoryRepository _repo;
    private readonly SessionMemoryOptions _options;

    private const string UserLabel = "me";

    public SessionHistoryService(
        ISessionHistoryRepository repo,
        IOptions<SessionMemoryOptions> options)
    {
        _repo = repo;
        _options = options.Value;
    }

    public Task LogUserChatAsync(string prompt, DateTimeOffset timestamp) =>
        _repo.InsertEventAsync("user-chat", timestamp, UserLabel,
            content: prompt,
            artist: null, album: null, title: null, durationSeconds: null);

    public async Task LogAiReplyAsync(string narrative, DateTimeOffset timestamp)
    {
        var id = await _repo.InsertEventAsync("ai-reply", timestamp, UserLabel,
            content: narrative,
            artist: null, album: null, title: null, durationSeconds: null);

        // Close the current open block — every NULL-block active event now belongs to this AI reply
        await _repo.AssignConversationBlockAsync(id);

        // Evict oldest block(s) if memory is over capacity
        await EvictIfNeededAsync();
    }

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

    public async Task<MemoryStatus> GetMemoryStatusAsync()
    {
        var used = await _repo.GetActiveAiReplyCountAsync();
        return new MemoryStatus(used, _options.MemorySize);
    }

    public Task BustMemoryAsync() =>
        _repo.SoftDeleteAllActiveAsync();

    // ── Private ───────────────────────────────────────────────────────────────

    private async Task EvictIfNeededAsync()
    {
        // Loop handles the edge case where MemorySize was reduced between restarts
        while (await _repo.GetActiveAiReplyCountAsync() > _options.MemorySize)
        {
            var oldestBlock = await _repo.GetOldestActiveConversationBlockAsync();
            if (oldestBlock is null) break;
            await _repo.SoftDeleteBlockAsync(oldestBlock.Value);
        }
    }
}
