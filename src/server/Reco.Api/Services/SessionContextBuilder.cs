using System.Text;
using Microsoft.Extensions.Options;
using Reco.Api.Configuration;
using Reco.Api.DTOs;
using Reco.Api.Models;

namespace Reco.Api.Services;

public class SessionContextBuilder : ISessionContextBuilder
{
    private readonly ISessionHistoryService _session;
    private readonly SessionMemoryOptions _options;

    public SessionContextBuilder(ISessionHistoryService session, IOptions<SessionMemoryOptions> options)
    {
        _session = session;
        _options = options.Value;
    }

    public async Task<SessionContext> BuildAsync(CancellationToken cancellationToken = default)
    {
        var events = await _session.GetActiveEventsAsync();
        var memoryStatus = await _session.GetMemoryStatusAsync();

        if (events.Count == 0)
            return new SessionContext([], null, memoryStatus);

        var history = BuildHistory(events);
        var preamble = BuildPreamble(events);

        return new SessionContext(history, preamble, memoryStatus);
    }

    private static IReadOnlyList<ConversationTurn> BuildHistory(IReadOnlyList<SessionEvent> events) =>
        events
            .Where(e => e.EventType is "user-chat" or "ai-reply")
            .Select(e => new ConversationTurn(
                e.EventType == "user-chat" ? "user" : "model",
                e.Content ?? string.Empty))
            .ToList();

    private string BuildPreamble(IReadOnlyList<SessionEvent> events)
    {
        var sb = new StringBuilder();
        var now = DateTimeOffset.UtcNow;

        sb.AppendLine($"[{now:dddd dd MMMM yyyy, HH:mm} UTC]");
        sb.AppendLine();
        sb.AppendLine("Full session history:");

        foreach (var e in events)
        {
            var t = e.Timestamp.ToString("HH:mm");
            switch (e.EventType)
            {
                case "user-chat":
                    sb.AppendLine($"- {t} — me: \"{e.Content}\"");
                    break;

                case "ai-reply":
                    var narrative = e.Content ?? string.Empty;
                    var excerpt = narrative.Length > 120
                        ? narrative[..120].TrimEnd() + "..."
                        : narrative;
                    sb.AppendLine($"- {t} — Reasonic: \"{excerpt}\"");
                    break;

                case "track-added":
                    var addAlbum = e.Album is not null ? $" · {e.Album}" : string.Empty;
                    sb.AppendLine($"- {t} — me: added \"{e.Title}\" · {e.Artist}{addAlbum}");
                    break;

                case "track-youtube":
                    sb.AppendLine($"- {t} — me: looked up \"{e.Title}\" · {e.Artist} on YouTube");
                    break;
            }
        }

        // "Since your last reply" section — only when track events followed the last AI reply
        var lastAiReply = events.LastOrDefault(e => e.EventType == "ai-reply");
        if (lastAiReply is not null)
        {
            var tracksSince = events
                .Where(e => e.Timestamp > lastAiReply.Timestamp &&
                            e.EventType is "track-added" or "track-youtube")
                .ToList();

            if (tracksSince.Count > 0)
            {
                sb.AppendLine();
                sb.AppendLine($"Since your last reply ({lastAiReply.Timestamp:HH:mm}):");

                foreach (var e in tracksSince)
                {
                    var t = e.Timestamp.ToString("HH:mm");
                    if (e.EventType == "track-added")
                        sb.AppendLine($"- {t} — me: added \"{e.Title}\" · {e.Artist}");
                    else
                        sb.AppendLine($"- {t} — me: looked up \"{e.Title}\" · {e.Artist} on YouTube");
                }

                var totalTrackSec = tracksSince.Sum(e => e.DurationSeconds ?? _options.DefaultTrackDurationSeconds);
                var elapsedSec    = (now - lastAiReply.Timestamp).TotalSeconds;
                var totalMin      = (int)Math.Round(totalTrackSec / 60.0);
                var elapsedMin    = (int)Math.Round(elapsedSec    / 60.0);
                var stillListening = totalTrackSec > elapsedSec;

                sb.Append($"→ ~{totalMin} min of music. {elapsedMin} min has passed — ");
                sb.AppendLine(stillListening
                    ? "I may still be listening to those tracks."
                    : "I have most likely finished listening.");
            }
        }

        return sb.ToString().TrimEnd();
    }
}
