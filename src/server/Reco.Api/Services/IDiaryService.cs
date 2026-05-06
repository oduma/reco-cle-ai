using Reco.Api.DTOs;

namespace Reco.Api.Services;

public interface IDiaryService
{
    Task<IReadOnlyList<string>> GetActiveDatesAsync();
    Task<DiaryEntryResponse> GetOrGenerateEntryAsync(string date, bool force, string? provider = null, CancellationToken cancellationToken = default);
}
