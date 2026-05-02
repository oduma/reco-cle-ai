using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using NSubstitute;
using Reco.Api.Configuration;
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
    BuildService(OllamaOptions? ollamaOptions = null)
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

        var service = new RecommendationOrchestrationService(
            gemini, ollama, clementine, cache, lastFm,
            sessionCtxBuilder, sessionHistory,
            Options.Create(new ClementineOptions()),
            Options.Create(ollamaOptions ?? new OllamaOptions()),
            NullLogger<RecommendationOrchestrationService>.Instance);

        return (gemini, ollama, service);
    }

    [Fact]
    public async Task Inner_whisper_calls_ollama_with_whisper_model()
    {
        var opts = new OllamaOptions { WhisperModel = "llama3.1:8b", ShoutModel = "gemma4:e4b" };
        var (_, ollama, service) = BuildService(opts);

        await service.GetRecommendationsAsync("jazz", "inner-whisper");

        await ollama.Received(1).GetMusicRecommendationAsync(
            Arg.Any<string>(), Arg.Any<IReadOnlyList<ConversationTurn>>(),
            "llama3.1:8b", Arg.Any<CancellationToken>());
    }

    [Fact]
    public async Task Inner_shout_calls_ollama_with_shout_model()
    {
        var opts = new OllamaOptions { WhisperModel = "llama3.1:8b", ShoutModel = "gemma4:e4b" };
        var (_, ollama, service) = BuildService(opts);

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
}
