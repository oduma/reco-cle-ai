using Reco.Api.DTOs;
using Reco.Api.Models;

namespace Reco.Api.Services;

public interface ITrackEnrichmentService
{
    Task<IReadOnlyList<TrackSuggestion>> EnrichAsync(
        IReadOnlyList<RawTrack> rawTracks,
        CancellationToken cancellationToken = default);
}
