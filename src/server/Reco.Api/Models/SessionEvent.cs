namespace Reco.Api.Models;

public record SessionEvent(
    int Id,
    string EventType,          // 'user-chat' | 'ai-reply' | 'track-added' | 'track-youtube'
    DateTimeOffset Timestamp,
    string UserLabel,
    string? Content,           // prompt text or AI narrative
    string? Artist,
    string? Album,
    string? Title,
    double? DurationSeconds,
    bool IsActive,
    int? ConversationBlock     // id of the ai-reply that closes this block; null until assigned
);
