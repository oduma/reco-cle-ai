using Microsoft.Extensions.Options;
using NSubstitute;
using Reco.Api.Configuration;
using Reco.Api.Models;
using Reco.Api.Services;

namespace Reco.Api.Tests.Services;

public class SessionContextBuilderTests
{
    private static readonly SessionMemoryOptions DefaultOptions = new()
    {
        MemorySize = 25,
        DefaultTrackDurationSeconds = 210.0,
    };

    private static SessionContextBuilder Build(
        IReadOnlyList<SessionEvent> events,
        MemoryStatus? memoryStatus = null,
        SessionMemoryOptions? options = null)
    {
        var session = Substitute.For<ISessionHistoryService>();
        session.GetActiveEventsAsync()
               .Returns(Task.FromResult(events));
        session.GetMemoryStatusAsync()
               .Returns(Task.FromResult(memoryStatus ?? new MemoryStatus(0, 25)));

        return new SessionContextBuilder(session, Options.Create(options ?? DefaultOptions));
    }

    // ── Empty log ─────────────────────────────────────────────────────────

    [Fact]
    public async Task Empty_log_returns_null_preamble_and_empty_history()
    {
        var context = await Build([]).BuildAsync();

        Assert.Null(context.Preamble);
        Assert.Empty(context.History);
    }

    [Fact]
    public async Task Empty_log_passes_through_memory_status()
    {
        var context = await Build([], memoryStatus: new MemoryStatus(7, 25)).BuildAsync();

        Assert.Equal(7, context.MemoryStatus.Used);
        Assert.Equal(25, context.MemoryStatus.Total);
    }

    // ── History reconstruction ────────────────────────────────────────────

    [Fact]
    public async Task User_chat_maps_to_user_role_turn()
    {
        var events = Events(
            E("user-chat", content: "jazz please"));

        var context = await Build(events).BuildAsync();

        Assert.Single(context.History);
        Assert.Equal("user",        context.History[0].Role);
        Assert.Equal("jazz please", context.History[0].Text);
    }

    [Fact]
    public async Task Ai_reply_maps_to_model_role_turn()
    {
        var events = Events(
            E("user-chat", content: "jazz"),
            E("ai-reply",  content: "Here are some jazz picks"));

        var context = await Build(events).BuildAsync();

        Assert.Equal(2, context.History.Count);
        Assert.Equal("model",                  context.History[1].Role);
        Assert.Equal("Here are some jazz picks", context.History[1].Text);
    }

    [Fact]
    public async Task Track_events_are_excluded_from_history()
    {
        var events = Events(
            E("user-chat",     content: "jazz"),
            E("ai-reply",      content: "Here you go"),
            E("track-added",   artist: "Miles Davis", title: "So What"),
            E("track-youtube", artist: "Coltrane",    title: "Naima"));

        var context = await Build(events).BuildAsync();

        Assert.Equal(2, context.History.Count);
    }

    // ── Preamble structure ────────────────────────────────────────────────

    [Fact]
    public async Task Preamble_contains_session_history_header()
    {
        var context = await Build(Events(E("user-chat", content: "jazz"))).BuildAsync();

        Assert.Contains("Full session history:", context.Preamble);
    }

    [Fact]
    public async Task Preamble_includes_user_chat_line()
    {
        var context = await Build(Events(E("user-chat", content: "jazz please"))).BuildAsync();

        Assert.Contains("me: \"jazz please\"", context.Preamble);
    }

    [Fact]
    public async Task Preamble_truncates_ai_narrative_longer_than_120_chars()
    {
        var longNarrative = new string('x', 200);
        var events = Events(
            E("user-chat", content: "jazz"),
            E("ai-reply",  content: longNarrative));

        var context = await Build(events).BuildAsync();

        Assert.Contains("...", context.Preamble);
        Assert.DoesNotContain(longNarrative, context.Preamble);
    }

    [Fact]
    public async Task Preamble_does_not_truncate_ai_narrative_at_or_below_120_chars()
    {
        var shortNarrative = new string('x', 120);
        var events = Events(
            E("user-chat", content: "jazz"),
            E("ai-reply",  content: shortNarrative));

        var context = await Build(events).BuildAsync();

        Assert.DoesNotContain("...", context.Preamble);
    }

    [Fact]
    public async Task Preamble_includes_track_added_line_with_album()
    {
        var events = Events(
            E("user-chat",   content: "jazz"),
            E("ai-reply",    content: "Here"),
            E("track-added", artist: "Miles Davis", album: "Kind of Blue", title: "So What"));

        var context = await Build(events).BuildAsync();

        Assert.Contains("added \"So What\" · Miles Davis · Kind of Blue", context.Preamble);
    }

    [Fact]
    public async Task Preamble_includes_track_added_line_without_album()
    {
        var events = Events(
            E("user-chat",   content: "jazz"),
            E("ai-reply",    content: "Here"),
            E("track-added", artist: "Miles Davis", title: "So What"));

        var context = await Build(events).BuildAsync();

        Assert.Contains("added \"So What\" · Miles Davis", context.Preamble);
        Assert.DoesNotContain("· null", context.Preamble);
    }

    [Fact]
    public async Task Preamble_includes_track_youtube_line()
    {
        var events = Events(
            E("user-chat",     content: "jazz"),
            E("ai-reply",      content: "Here"),
            E("track-youtube", artist: "Coltrane", title: "Naima"));

        var context = await Build(events).BuildAsync();

        Assert.Contains("looked up \"Naima\" · Coltrane on YouTube", context.Preamble);
    }

    // ── Since your last reply ─────────────────────────────────────────────

    [Fact]
    public async Task Since_last_reply_absent_when_no_tracks_after_ai_reply()
    {
        var events = Events(
            E("user-chat", content: "jazz"),
            E("ai-reply",  content: "Here"));

        var context = await Build(events).BuildAsync();

        Assert.DoesNotContain("Since your last reply", context.Preamble);
    }

    [Fact]
    public async Task Since_last_reply_present_when_track_added_after_ai_reply()
    {
        var aiTime = DateTimeOffset.UtcNow.AddMinutes(-2);
        var events = Events(
            E("user-chat",   at: aiTime.AddMinutes(-1), content: "jazz"),
            E("ai-reply",    at: aiTime,                content: "Here"),
            E("track-added", at: aiTime.AddMinutes(1),  artist: "Miles Davis", title: "So What"));

        var context = await Build(events).BuildAsync();

        Assert.Contains("Since your last reply", context.Preamble);
    }

    [Fact]
    public async Task Since_last_reply_present_when_track_youtube_after_ai_reply()
    {
        var aiTime = DateTimeOffset.UtcNow.AddMinutes(-2);
        var events = Events(
            E("user-chat",     at: aiTime.AddMinutes(-1), content: "jazz"),
            E("ai-reply",      at: aiTime,                content: "Here"),
            E("track-youtube", at: aiTime.AddMinutes(1),  artist: "Coltrane", title: "Naima"));

        var context = await Build(events).BuildAsync();

        Assert.Contains("Since your last reply", context.Preamble);
    }

    // ── Listening estimate ────────────────────────────────────────────────

    [Fact]
    public async Task Listening_estimate_still_listening_when_track_duration_exceeds_elapsed()
    {
        // AI replied 10 seconds ago; track is 1 hour long → still listening
        var aiTime = DateTimeOffset.UtcNow.AddSeconds(-10);
        var events = Events(
            E("user-chat",   at: aiTime.AddSeconds(-5), content: "jazz"),
            E("ai-reply",    at: aiTime,                content: "Here"),
            E("track-added", at: aiTime.AddSeconds(2),  artist: "Miles", title: "So What", duration: 3600));

        var context = await Build(events).BuildAsync();

        Assert.Contains("I may still be listening to those tracks.", context.Preamble);
    }

    [Fact]
    public async Task Listening_estimate_finished_when_elapsed_exceeds_track_duration()
    {
        // AI replied 1 hour ago; track is 1 minute long → finished
        var aiTime = DateTimeOffset.UtcNow.AddHours(-1);
        var events = Events(
            E("user-chat",   at: aiTime.AddSeconds(-5), content: "jazz"),
            E("ai-reply",    at: aiTime,                content: "Here"),
            E("track-added", at: aiTime.AddSeconds(2),  artist: "Miles", title: "So What", duration: 60));

        var context = await Build(events).BuildAsync();

        Assert.Contains("I have most likely finished listening.", context.Preamble);
    }

    [Fact]
    public async Task Listening_estimate_uses_default_duration_when_track_has_no_duration()
    {
        // AI replied 10 seconds ago; track has no duration, default is 300s → still listening
        var aiTime = DateTimeOffset.UtcNow.AddSeconds(-10);
        var events = Events(
            E("user-chat",   at: aiTime.AddSeconds(-5), content: "jazz"),
            E("ai-reply",    at: aiTime,                content: "Here"),
            E("track-added", at: aiTime.AddSeconds(2),  artist: "Miles", title: "So What", duration: null));

        var opts = new SessionMemoryOptions { DefaultTrackDurationSeconds = 300.0 };
        var context = await Build(events, options: opts).BuildAsync();

        Assert.Contains("I may still be listening to those tracks.", context.Preamble);
    }

    // ── Helpers ───────────────────────────────────────────────────────────

    private static IReadOnlyList<SessionEvent> Events(params SessionEvent[] items) => items;

    private static int _nextId = 1;

    private static SessionEvent E(
        string eventType,
        DateTimeOffset? at = null,
        string? content = null,
        string? artist = null,
        string? album = null,
        string? title = null,
        double? duration = null)
        => new(
            _nextId++,
            eventType,
            at ?? DateTimeOffset.UtcNow.AddMinutes(-1),
            "me",
            content,
            artist,
            album,
            title,
            duration,
            IsActive: true,
            ConversationBlock: null);
}
