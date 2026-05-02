using Microsoft.Extensions.Options;
using Reco.Api.Configuration;
using Reco.Api.DTOs;
using Reco.Api.Models;

namespace Reco.Api.Services;

public class TrackEnrichmentService : ITrackEnrichmentService
{
    private readonly IClementineService _clementine;
    private readonly ILastFmGatewayService _lastFm;
    private readonly ClementineOptions _clementineOptions;
    private readonly ILogger<TrackEnrichmentService> _logger;

    public TrackEnrichmentService(
        IClementineService clementine,
        ILastFmGatewayService lastFm,
        IOptions<ClementineOptions> clementineOptions,
        ILogger<TrackEnrichmentService> logger)
    {
        _clementine = clementine;
        _lastFm = lastFm;
        _clementineOptions = clementineOptions.Value;
        _logger = logger;
    }

    public async Task<IReadOnlyList<TrackSuggestion>> EnrichAsync(
        IReadOnlyList<RawTrack> rawTracks,
        CancellationToken cancellationToken = default)
    {
        if (rawTracks.Count == 0) return [];

        IReadOnlyList<TrackSuggestion> annotated;
        try
        {
            var inventory = await _clementine.LoadInventoryAsync(cancellationToken);
            var threshold = _clementineOptions.MatchThreshold;

            annotated = rawTracks
                .Select(r =>
                {
                    var stub = new TrackSuggestion(r.Title, r.Artist, r.Album);
                    var match = inventory.FirstOrDefault(local => TrackMatcher.IsMatch(stub, local, threshold));
                    return stub with
                    {
                        InLocalLibrary  = match is not null,
                        FilePath        = match?.FilePath,
                        DurationSeconds = match?.DurationSeconds,
                    };
                })
                .ToList();
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "[TrackEnrichment] Local library unavailable — showing all as discovery");
            annotated = rawTracks
                .Select(r => new TrackSuggestion(r.Title, r.Artist, r.Album) with { InLocalLibrary = false })
                .ToList();
        }

        var artTasks = annotated
            .Select(t => _lastFm.GetAlbumArtUrlAsync(t.Artist, t.Title, t.Album, cancellationToken))
            .ToArray();
        var artUrls = await Task.WhenAll(artTasks);

        _logger.LogInformation(
            "[TrackEnrichment] Album art enriched: {Found}/{Total} tracks have art",
            artUrls.Count(u => u is not null), annotated.Count);

        return annotated
            .Select((t, i) => t with { AlbumArtUrl = artUrls[i] })
            .ToList();
    }
}
