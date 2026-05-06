using Microsoft.Extensions.Logging.Abstractions;
using NSubstitute;
using Reco.Api.DTOs;
using Reco.Api.Models;
using Reco.Api.Services;

namespace Reco.Api.Tests.Services;

public class MoodAnnotationTests
{
    private static readonly MusicRecommendationResult EmptyResult = new("narrative", []);

    private static (RecommendationOrchestrationService Service, Func<string> GetCapturedPrompt)
    BuildServiceWithPromptCapture()
    {
        var capturedPrompt = string.Empty;

        var gemini = Substitute.For<IGeminiGatewayService>();
        gemini.GetMusicRecommendationAsync(
                Arg.Do<string>(p => capturedPrompt = p),
                Arg.Any<IReadOnlyList<ConversationTurn>>(),
                Arg.Any<CancellationToken>())
              .Returns(Task.FromResult(EmptyResult));

        var ollama = Substitute.For<IOllamaGatewayService>();

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
        settings.GetStringAsync(Arg.Any<string>(), Arg.Any<string>())
                .Returns(callInfo => Task.FromResult(callInfo.ArgAt<string>(1)));
        settings.GetDoubleAsync(Arg.Any<string>(), Arg.Any<double>())
                .Returns(callInfo => Task.FromResult(callInfo.ArgAt<double>(1)));
        settings.GetIntAsync(Arg.Any<string>(), Arg.Any<int>())
                .Returns(callInfo => Task.FromResult(callInfo.ArgAt<int>(1)));

        var aiPrompts = Substitute.For<IAiPromptService>();
        aiPrompts.GetMoodAnnotationAsync(Arg.Any<string?>())
                 .Returns(callInfo =>
                 {
                     var m = callInfo.ArgAt<string?>(0);
                     if (string.IsNullOrWhiteSpace(m)) return Task.FromResult<string?>(null);
                     return Task.FromResult(AiPromptDefaults.GetMoodAnnotation(m));
                 });

        var service = new RecommendationOrchestrationService(
            gemini, ollama, clementine, cache, lastFm,
            sessionCtxBuilder, sessionHistory, settings, aiPrompts,
            NullLogger<RecommendationOrchestrationService>.Instance);

        return (service, () => capturedPrompt);
    }

    [Theory]
    [InlineData("poetic",      "I'm in a poetic mood")]
    [InlineData("humorous",    "I'm feeling playful and humorous")]
    [InlineData("cosmic",      "I'm in a cosmic mood")]
    [InlineData("minimalist",  "I'm in a minimalist mood")]
    [InlineData("romantic",    "I'm feeling romantic")]
    [InlineData("chaotic",     "I'm in a chaotic mood")]
    [InlineData("noir",        "I'm in a noir mood")]
    [InlineData("psychedelic", "I'm in a psychedelic mood")]
    public async Task Non_normal_mood_prepends_annotation_to_prompt(string mood, string expectedFragment)
    {
        var (service, getPrompt) = BuildServiceWithPromptCapture();

        await service.GetRecommendationsAsync("recommend some jazz", "gemini", mood);

        var actual = getPrompt();
        Assert.Contains(expectedFragment, actual);
        Assert.Contains("recommend some jazz", actual);
    }

    [Fact]
    public async Task Normal_mood_sends_prompt_without_annotation()
    {
        var (service, getPrompt) = BuildServiceWithPromptCapture();

        await service.GetRecommendationsAsync("recommend some jazz", "gemini", "normal");

        Assert.Equal("recommend some jazz", getPrompt());
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("UNKNOWN_MOOD_VALUE")]
    public async Task Null_empty_or_unknown_mood_sends_prompt_without_annotation(string? mood)
    {
        var (service, getPrompt) = BuildServiceWithPromptCapture();

        await service.GetRecommendationsAsync("recommend some jazz", "gemini", mood);

        Assert.Equal("recommend some jazz", getPrompt());
    }

    [Fact]
    public async Task Mood_annotation_is_case_insensitive()
    {
        var (service, getPrompt) = BuildServiceWithPromptCapture();

        await service.GetRecommendationsAsync("recommend some jazz", "gemini", "POETIC");

        Assert.Contains("I'm in a poetic mood", getPrompt());
    }
}
