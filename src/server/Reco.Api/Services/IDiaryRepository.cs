using Reco.Api.Models;

namespace Reco.Api.Services;

public interface IDiaryRepository
{
    Task<IReadOnlyList<string>> GetActiveDatesAsync();
    Task<DiaryDayData?> GetDayDataAsync(string date);
    Task<string?> GetCachedEntryContentAsync(string date);
    Task SaveEntryAsync(string date, string content, DateTimeOffset generatedAt);
    Task<DateTimeOffset?> GetEntryGeneratedAtAsync(string date);
}
