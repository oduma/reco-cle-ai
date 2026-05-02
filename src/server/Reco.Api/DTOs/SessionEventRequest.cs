using System.ComponentModel.DataAnnotations;

namespace Reco.Api.DTOs;

public record SessionEventRequest(
    [Required] string EventType,
    [Required] string Artist,
    string? Album,
    [Required] string Title,
    double? DurationSeconds,
    DateTimeOffset? Timestamp
)
{
    public static readonly HashSet<string> AllowedEventTypes =
        new(StringComparer.OrdinalIgnoreCase) { "track-added", "track-youtube" };
}
