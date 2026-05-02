using System.Net;
using Microsoft.Extensions.Logging.Abstractions;
using NSubstitute;
using Reco.Api.Services;

namespace Reco.Api.Tests.Services;

public class LastFmGatewayServiceTests
{
    private static LastFmGatewayService BuildService(
        HttpMessageHandler handler,
        string apiKey = "test-key",
        string? baseUrl = null)
    {
        var client = new HttpClient(handler) { BaseAddress = null };

        var settings = Substitute.For<IAppSettingsService>();
        settings.GetStringAsync("LASTFM_API_KEY", Arg.Any<string>())
                .Returns(Task.FromResult(apiKey));
        settings.GetStringAsync("LASTFM_BASE_URL", Arg.Any<string>())
                .Returns(Task.FromResult(baseUrl ?? "https://ws.audioscrobbler.com/2.0/"));

        return new LastFmGatewayService(client, settings, NullLogger<LastFmGatewayService>.Instance);
    }

    [Fact]
    public async Task Returns_extralarge_art_url_from_album_getInfo()
    {
        var json = BuildAlbumResponse([
            ("small", "https://img/small.jpg"),
            ("large", "https://img/large.jpg"),
            ("extralarge", "https://img/extralarge.jpg"),
        ]);

        var svc = BuildService(new FakeHandler(json));

        var result = await svc.GetAlbumArtUrlAsync("Miles Davis", "Kind of Blue", "Kind of Blue");

        Assert.Equal("https://img/extralarge.jpg", result);
    }

    [Fact]
    public async Task Falls_back_to_large_when_extralarge_absent()
    {
        var json = BuildAlbumResponse([
            ("small", "https://img/small.jpg"),
            ("large", "https://img/large.jpg"),
        ]);

        var svc = BuildService(new FakeHandler(json));

        var result = await svc.GetAlbumArtUrlAsync("Miles Davis", "Kind of Blue", "Kind of Blue");

        Assert.Equal("https://img/large.jpg", result);
    }

    [Fact]
    public async Task Returns_null_when_all_image_urls_are_empty()
    {
        var json = BuildAlbumResponse([
            ("small", ""),
            ("extralarge", ""),
        ]);

        var svc = BuildService(new FakeHandler(json));

        var result = await svc.GetAlbumArtUrlAsync("Miles Davis", "Kind of Blue", "Kind of Blue");

        Assert.Null(result);
    }

    [Fact]
    public async Task Returns_null_when_lastfm_returns_error_object()
    {
        const string json = """{"error":6,"message":"Track not found"}""";

        var svc = BuildService(new FakeHandler(json));

        var result = await svc.GetAlbumArtUrlAsync("Unknown Artist", "Unknown Track");

        Assert.Null(result);
    }

    [Fact]
    public async Task Returns_null_and_does_not_throw_on_http_error()
    {
        var svc = BuildService(new FakeHandler(HttpStatusCode.ServiceUnavailable));

        var result = await svc.GetAlbumArtUrlAsync("Miles Davis", "Kind of Blue");

        Assert.Null(result);
    }

    [Fact]
    public async Task Returns_null_when_api_key_is_empty()
    {
        var svc = BuildService(new FakeHandler("{}"), apiKey: "");

        var result = await svc.GetAlbumArtUrlAsync("Miles Davis", "Kind of Blue");

        Assert.Null(result);
    }

    [Fact]
    public async Task Caches_result_on_second_call()
    {
        var callCount = 0;
        var json = BuildAlbumResponse([("extralarge", "https://img/art.jpg")]);

        var svc = BuildService(new FakeHandler(_ =>
        {
            callCount++;
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json")
            };
        }));

        var first  = await svc.GetAlbumArtUrlAsync("Miles Davis", "Kind of Blue", "Kind of Blue");
        var second = await svc.GetAlbumArtUrlAsync("Miles Davis", "Kind of Blue", "Kind of Blue");

        Assert.Equal("https://img/art.jpg", first);
        Assert.Equal(first, second);
        Assert.Equal(1, callCount); // only one real HTTP call
    }

    [Fact]
    public async Task Falls_back_to_track_getInfo_when_album_is_null()
    {
        var trackJson = BuildTrackResponse([("extralarge", "https://img/track-art.jpg")]);

        var svc = BuildService(new FakeHandler(trackJson));

        var result = await svc.GetAlbumArtUrlAsync("John Coltrane", "A Love Supreme", album: null);

        Assert.Equal("https://img/track-art.jpg", result);
    }

    [Fact]
    public async Task Falls_back_to_track_getInfo_when_album_getInfo_returns_no_art()
    {
        // First call (album.getInfo) returns no images; second call (track.getInfo) returns art
        var albumJson = BuildAlbumResponse([]);
        var trackJson = BuildTrackResponse([("extralarge", "https://img/track-art.jpg")]);

        var calls = new Queue<string>([albumJson, trackJson]);
        var svc = BuildService(new FakeHandler(_ =>
            new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(calls.Dequeue(), System.Text.Encoding.UTF8, "application/json")
            }));

        var result = await svc.GetAlbumArtUrlAsync("Miles Davis", "Kind of Blue", "Kind of Blue");

        Assert.Equal("https://img/track-art.jpg", result);
    }

    // ─── Helpers ────────────────────────────────────────────────────────────

    private static string BuildAlbumResponse(IEnumerable<(string size, string url)> images)
    {
        var imageArray = images
            .Select(i => $"{{\"#text\":\"{i.url}\",\"size\":\"{i.size}\"}}")
            .ToList();

        return $"{{\"album\":{{\"image\":[{string.Join(",", imageArray)}]}}}}";
    }

    private static string BuildTrackResponse(IEnumerable<(string size, string url)> images)
    {
        var imageArray = images
            .Select(i => $"{{\"#text\":\"{i.url}\",\"size\":\"{i.size}\"}}")
            .ToList();

        return $"{{\"track\":{{\"album\":{{\"image\":[{string.Join(",", imageArray)}]}}}}}}";
    }

    private sealed class FakeHandler : HttpMessageHandler
    {
        private readonly Func<HttpRequestMessage, HttpResponseMessage> _factory;

        public FakeHandler(string json)
            : this(_ => new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json")
            })
        { }

        public FakeHandler(HttpStatusCode statusCode)
            : this(_ => new HttpResponseMessage(statusCode))
        { }

        public FakeHandler(Func<HttpRequestMessage, HttpResponseMessage> factory)
            => _factory = factory;

        protected override Task<HttpResponseMessage> SendAsync(
            HttpRequestMessage request,
            CancellationToken cancellationToken)
            => Task.FromResult(_factory(request));
    }
}
