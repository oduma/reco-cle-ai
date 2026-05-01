using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using NSubstitute;
using Reco.Api.Configuration;
using Reco.Api.DTOs;
using Reco.Api.Models;
using Reco.Api.Services;

namespace Reco.Api.Tests.Services;

/// <summary>
/// Verifies that RecommendationOrchestrationService enriches each returned
/// TrackSuggestion with an albumArtUrl from ILastFmGatewayService.
/// </summary>
public class AlbumArtEnrichmentTests
{
    private static readonly TrackSuggestion TrackA = new("Kind of Blue",   "Miles Davis",   "Kind of Blue");
    private static readonly TrackSuggestion TrackB = new("A Love Supreme", "John Coltrane", null);

    // ── Builder ──────────────────────────────────────────────────────────────

    private static RecommendationOrchestrationService BuildService(
        ILastFmGatewayService lastFm,
        IReadOnlyList<TrackSuggestion>? tracks = null)
    {
        var tracksToReturn = tracks ?? [TrackA, TrackB];

        var gemini = Substitute.For<IGeminiGatewayService>();
        gemini.GetMusicRecommendationAsync(
                Arg.Any<string>(), Arg.Any<IReadOnlyList<ConversationTurn>>(), Arg.Any<CancellationToken>())
              .Returns(Task.FromResult(new MusicRecommendationResult("narrative", tracksToReturn)));

        var ollama = Substitute.For<IOllamaGatewayService>();

        var clementine = Substitute.For<IClementineService>();
        clementine.LoadInventoryAsync(Arg.Any<CancellationToken>())
                  .Returns(Task.FromResult<IReadOnlyList<LocalTrack>>([]));

        var cache = Substitute.For<ISuggestionCacheService>();
        cache.ExcludeRecentlySuggested(Arg.Any<IReadOnlyList<TrackSuggestion>>())
             .Returns(info => info.ArgAt<IReadOnlyList<TrackSuggestion>>(0));

        return new RecommendationOrchestrationService(
            gemini, ollama, clementine, cache, lastFm,
            Options.Create(new ClementineOptions()),
            NullLogger<RecommendationOrchestrationService>.Instance);
    }

    // ── Tests ────────────────────────────────────────────────────────────────

    [Fact]
    public async Task Each_track_receives_albumArtUrl_from_lastfm()
    {
        var lastFm = Substitute.For<ILastFmGatewayService>();
        lastFm.GetAlbumArtUrlAsync("Miles Davis",   "Kind of Blue",   "Kind of Blue", Arg.Any<CancellationToken>())
              .Returns(Task.FromResult<string?>("https://img/miles.jpg"));
        lastFm.GetAlbumArtUrlAsync("John Coltrane", "A Love Supreme", null,           Arg.Any<CancellationToken>())
              .Returns(Task.FromResult<string?>(null));

        var response = await BuildService(lastFm)
            .GetRecommendationsAsync("jazz", [], cancellationToken: default);

        var miles    = response.Suggestions.Single(t => t.Artist == "Miles Davis");
        var coltrane = response.Suggestions.Single(t => t.Artist == "John Coltrane");

        Assert.Equal("https://img/miles.jpg", miles.AlbumArtUrl);
        Assert.Null(coltrane.AlbumArtUrl);
    }

    [Fact]
    public async Task LastFm_returning_null_for_all_tracks_does_not_break_response()
    {
        var lastFm = Substitute.For<ILastFmGatewayService>();
        lastFm.GetAlbumArtUrlAsync(Arg.Any<string>(), Arg.Any<string>(), Arg.Any<string?>(), Arg.Any<CancellationToken>())
              .Returns(Task.FromResult<string?>(null));

        var response = await BuildService(lastFm)
            .GetRecommendationsAsync("jazz", [], cancellationToken: default);

        Assert.Equal(2, response.Suggestions.Count);
        Assert.All(response.Suggestions, t => Assert.Null(t.AlbumArtUrl));
    }

    [Fact]
    public async Task Empty_track_list_does_not_call_lastfm()
    {
        var lastFm = Substitute.For<ILastFmGatewayService>();

        await BuildService(lastFm, tracks: [])
            .GetRecommendationsAsync("jazz", [], cancellationToken: default);

        await lastFm.DidNotReceive().GetAlbumArtUrlAsync(
            Arg.Any<string>(), Arg.Any<string>(), Arg.Any<string?>(), Arg.Any<CancellationToken>());
    }

    [Fact]
    public async Task LastFm_is_called_once_per_returned_track()
    {
        var lastFm = Substitute.For<ILastFmGatewayService>();
        lastFm.GetAlbumArtUrlAsync(Arg.Any<string>(), Arg.Any<string>(), Arg.Any<string?>(), Arg.Any<CancellationToken>())
              .Returns(Task.FromResult<string?>(null));

        await BuildService(lastFm).GetRecommendationsAsync("jazz", [], cancellationToken: default);

        await lastFm.Received(2).GetAlbumArtUrlAsync(
            Arg.Any<string>(), Arg.Any<string>(), Arg.Any<string?>(), Arg.Any<CancellationToken>());
    }
}
