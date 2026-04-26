using Reco.Api.DTOs;

namespace Reco.Api.Services;

public interface ISuggestionCacheService
{
    IReadOnlyList<TrackSuggestion> ExcludeRecentlySuggested(IReadOnlyList<TrackSuggestion> tracks);
    void MarkAsSuggested(IEnumerable<TrackSuggestion> tracks);
}
