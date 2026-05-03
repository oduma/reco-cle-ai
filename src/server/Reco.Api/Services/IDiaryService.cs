using Reco.Api.DTOs;

namespace Reco.Api.Services;

public interface IDiaryService
{
    Task<IReadOnlyList<string>> GetActiveDatesAsync();
    Task<DiaryEntryResponse> GetOrGenerateEntryAsync(string date, bool force, CancellationToken cancellationToken = default);
}
