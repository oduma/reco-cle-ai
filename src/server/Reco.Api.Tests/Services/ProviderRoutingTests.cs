using Microsoft.Extensions.Logging.Abstractions;
using NSubstitute;
using Reco.Api.DTOs;
using Reco.Api.Models;
using Reco.Api.Services;

namespace Reco.Api.Tests.Services;

public class ProviderRoutingTests
{
    private static readonly MusicRecommendationResult EmptyResult =
        new("narrative", []);

    private static (
        IGeminiGatewayService Gemini,
        IOllamaGatewayService Ollama,
        RecommendationOrchestrationService Service)
    BuildService(string whisperModel = "llama3.1:8b", string shoutModel = "gemma4:e4b")
    {
        var gemini = Substitute.For<IGeminiGatewayService>();
        gemini.GetMusicRecommendationAsync(
                Arg.Any<string>(), Arg.Any<IReadOnlyList<ConversationTurn>>(), Arg.Any<CancellationToken>())
              .Returns(Task.FromResult(EmptyResult));

        var ollama = Substitute.For<IOllamaGatewayService>();
        ollama.GetMusicRecommendationAsync(
                Arg.Any<string>(), Arg.Any<IReadOnlyList<ConversationTurn>>(),
                Arg.Any<string>(), Arg.Any<CancellationToken>())
              .Returns(Task.FromResult(EmptyResult));

        var clementine = Substitute.For<IClementineService>();
        clementine.LoadInventoryAsync(Arg.Any<CancellationToken>())
                  .Returns(Task.FromResult<IReadOnlyList<LocalTrack>>([]));

        var cache = Substitute.For<ISuggestionCacheService>();
        cache.ExcludeRecentlySuggested(Arg.Any<IReadOnlyList<TrackSuggestion>>())
             .Returns(info => info.ArgAt<IReadOnlyList<TrackSuggestion>>(0));

        var lastFm = Substitute.For<ILastFmGatewayService>();

        var sessionCtxBuilder = Substitute.For<ISessionContextBuilder>();
        sessionCtxBuilder.BuildAsync(Arg.Any<CancellationToken>())
                         .Returns(Task.FromResult(new SessionContext([], null, new MemoryStatus(0, 25))));

        var sessionHistory = Substitute.For<ISessionHistoryService>();
        sessionHistory.LogAiReplyAsync(Arg.Any<string>(), Arg.Any<DateTimeOffset>())
                      .Returns(Task.FromResult(1));

        var settings = Substitute.For<IAppSettingsService>();
        settings.GetStringAsync("OLLAMA_WHISPER_MODEL", Arg.Any<string>())
                .Returns(Task.FromResult(whisperModel));
        settings.GetStringAsync("OLLAMA_SHOUT_MODEL", Arg.Any<string>())
                .Returns(Task.FromResult(shoutModel));
        settings.GetDoubleAsync("CLEMENTINE_MATCH_THRESHOLD", Arg.Any<double>())
                .Returns(Task.FromResult(0.75));
        settings.GetIntAsync(Arg.Any<string>(), Arg.Any<int>())
                .Returns(callInfo => Task.FromResult(callInfo.ArgAt<int>(1)));

        var service = new RecommendationOrchestrationService(
            gemini, ollama, clementine, cache, lastFm,
            sessionCtxBuilder, sessionHistory,
            settings,
            NullLogger<RecommendationOrchestrationService>.Instance);

        return (gemini, ollama, service);
    }

    [Fact]
    public async Task Inner_whisper_calls_ollama_with_whisper_model()
    {
        var (_, ollama, service) = BuildService("llama3.1:8b", "gemma4:e4b");

        await service.GetRecommendationsAsync("jazz", "inner-whisper");

        await ollama.Received(1).GetMusicRecommendationAsync(
            Arg.Any<string>(), Arg.Any<IReadOnlyList<ConversationTurn>>(),
            "llama3.1:8b", Arg.Any<CancellationToken>());
    }

    [Fact]
    public async Task Inner_shout_calls_ollama_with_shout_model()
    {
        var (_, ollama, service) = BuildService("llama3.1:8b", "gemma4:e4b");

        await service.GetRecommendationsAsync("jazz", "inner-shout");

        await ollama.Received(1).GetMusicRecommendationAsync(
            Arg.Any<string>(), Arg.Any<IReadOnlyList<ConversationTurn>>(),
            "gemma4:e4b", Arg.Any<CancellationToken>());
    }

    [Fact]
    public async Task Gemini_provider_does_not_call_ollama()
    {
        var (gemini, ollama, service) = BuildService();

        await service.GetRecommendationsAsync("jazz", "gemini");

        await gemini.Received(1).GetMusicRecommendationAsync(
            Arg.Any<string>(), Arg.Any<IReadOnlyList<ConversationTurn>>(), Arg.Any<CancellationToken>());
        await ollama.DidNotReceive().GetMusicRecommendationAsync(
            Arg.Any<string>(), Arg.Any<IReadOnlyList<ConversationTurn>>(),
            Arg.Any<string>(), Arg.Any<CancellationToken>());
    }

    [Fact]
    public async Task Inner_whisper_providerUsed_is_returned_in_response()
    {
        var (_, _, service) = BuildService();

        var response = await service.GetRecommendationsAsync("jazz", "inner-whisper");

        Assert.Equal("inner-whisper", response.ProviderUsed);
    }

    [Fact]
    public async Task Inner_shout_providerUsed_is_returned_in_response()
    {
        var (_, _, service) = BuildService();

        var response = await service.GetRecommendationsAsync("jazz", "inner-shout");

        Assert.Equal("inner-shout", response.ProviderUsed);
    }

    // ── Phase 9 ──────────────────────────────────────────────────────────────

    [Fact]
    public async Task AiReplyEventId_is_present_in_gemini_response()
    {
        var (_, _, service) = BuildService();

        var response = await service.GetRecommendationsAsync("jazz", "gemini");

        Assert.True(response.AiReplyEventId >= 0);
    }

    [Fact]
    public async Task AiReplyEventId_is_present_in_inner_whisper_response()
    {
        var (_, _, service) = BuildService();

        var response = await service.GetRecommendationsAsync("jazz", "inner-whisper");

        Assert.True(response.AiReplyEventId >= 0);
    }
}
