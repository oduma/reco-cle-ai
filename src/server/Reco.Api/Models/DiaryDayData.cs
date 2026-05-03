namespace Reco.Api.Models;

public record DiaryPromptEntry(string Prompt, string? Mood, DateTimeOffset Timestamp);

public record DiaryDayData(
    string Date,
    IReadOnlyList<DiaryPromptEntry> Prompts
);
