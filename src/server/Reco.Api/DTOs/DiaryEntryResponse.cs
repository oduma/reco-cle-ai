namespace Reco.Api.DTOs;

public record DiaryEntryResponse(
    string Content,
    bool IsFromCache,
    DateTimeOffset GeneratedAt
);
