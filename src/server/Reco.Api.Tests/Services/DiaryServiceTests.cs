using NSubstitute;
using NSubstitute.ExceptionExtensions;
using Reco.Api.DTOs;
using Reco.Api.Models;
using Reco.Api.Services;

namespace Reco.Api.Tests.Services;

public class DiaryServiceTests
{
    private static (IDiaryRepository repo, IGeminiGatewayService gemini, DiaryService service) Build()
    {
        var repo   = Substitute.For<IDiaryRepository>();
        var gemini = Substitute.For<IGeminiGatewayService>();
        var logger = Microsoft.Extensions.Logging.Abstractions.NullLogger<DiaryService>.Instance;
        var svc    = new DiaryService(repo, gemini, logger);
        return (repo, gemini, svc);
    }

    // ── GetActiveDates ────────────────────────────────────────────────────

    [Fact]
    public async Task GetActiveDates_delegates_to_repository()
    {
        var (repo, _, svc) = Build();
        repo.GetActiveDatesAsync().Returns(new List<string> { "2025-04-01", "2025-04-05" });

        var result = await svc.GetActiveDatesAsync();

        Assert.Equal(2, result.Count);
        Assert.Contains("2025-04-01", result);
    }

    // ── Cache hit ──────────────────────────────────────────────────────────

    [Fact]
    public async Task Returns_cached_entry_without_calling_gemini()
    {
        var (repo, gemini, svc) = Build();
        var past = DateOnly.FromDateTime(DateTime.UtcNow).AddDays(-1).ToString("yyyy-MM-dd");

        repo.GetCachedEntryContentAsync(past).Returns("Cached prose.");
        repo.GetEntryGeneratedAtAsync(past).Returns(DateTimeOffset.UtcNow.AddHours(-2));

        var result = await svc.GetOrGenerateEntryAsync(past, force: false);

        Assert.Equal("Cached prose.", result.Content);
        Assert.True(result.IsFromCache);
        await gemini.DidNotReceive().GenerateDiaryEntryAsync(Arg.Any<string>(), Arg.Any<CancellationToken>());
    }

    // ── Force flag bypasses cache ──────────────────────────────────────────

    [Fact]
    public async Task Force_flag_bypasses_cache_and_calls_gemini()
    {
        var (repo, gemini, svc) = Build();
        var past = DateOnly.FromDateTime(DateTime.UtcNow).AddDays(-1).ToString("yyyy-MM-dd");

        repo.GetCachedEntryContentAsync(past).Returns("Old prose.");
        var dayData = new DiaryDayData(past,
            [new DiaryPromptEntry("Jazz please", "normal", DateTimeOffset.UtcNow.AddDays(-1))]);
        repo.GetDayDataAsync(past).Returns(dayData);
        gemini.GenerateDiaryEntryAsync(Arg.Any<string>(), Arg.Any<CancellationToken>()).Returns("Fresh prose.");

        var result = await svc.GetOrGenerateEntryAsync(past, force: true);

        Assert.Equal("Fresh prose.", result.Content);
        Assert.False(result.IsFromCache);
        await repo.Received(1).SaveEntryAsync(past, "Fresh prose.", Arg.Any<DateTimeOffset>());
    }

    // ── Cache miss generates ──────────────────────────────────────────────

    [Fact]
    public async Task Cache_miss_generates_and_saves_entry()
    {
        var (repo, gemini, svc) = Build();
        var past = DateOnly.FromDateTime(DateTime.UtcNow).AddDays(-2).ToString("yyyy-MM-dd");

        repo.GetCachedEntryContentAsync(past).Returns((string?)null);
        var dayData = new DiaryDayData(past,
            [new DiaryPromptEntry("Blues mood", "noir", DateTimeOffset.UtcNow.AddDays(-2))]);
        repo.GetDayDataAsync(past).Returns(dayData);
        gemini.GenerateDiaryEntryAsync(Arg.Any<string>(), Arg.Any<CancellationToken>()).Returns("Blues diary entry.");

        var result = await svc.GetOrGenerateEntryAsync(past, force: false);

        Assert.Equal("Blues diary entry.", result.Content);
        Assert.False(result.IsFromCache);
        await repo.Received(1).SaveEntryAsync(past, "Blues diary entry.", Arg.Any<DateTimeOffset>());
    }

    // ── Today is rejected ────────────────────────────────────────────────

    [Fact]
    public async Task Today_date_throws_ArgumentException()
    {
        var (_, _, svc) = Build();
        var today = DateOnly.FromDateTime(DateTime.UtcNow).ToString("yyyy-MM-dd");

        await Assert.ThrowsAsync<ArgumentException>(() =>
            svc.GetOrGenerateEntryAsync(today, force: false));
    }

    // ── Future date is rejected ───────────────────────────────────────────

    [Fact]
    public async Task Future_date_throws_ArgumentException()
    {
        var (_, _, svc) = Build();
        var future = DateOnly.FromDateTime(DateTime.UtcNow).AddDays(1).ToString("yyyy-MM-dd");

        await Assert.ThrowsAsync<ArgumentException>(() =>
            svc.GetOrGenerateEntryAsync(future, force: false));
    }

    // ── Invalid date format is rejected ───────────────────────────────────

    [Fact]
    public async Task Invalid_date_throws_ArgumentException()
    {
        var (_, _, svc) = Build();

        await Assert.ThrowsAsync<ArgumentException>(() =>
            svc.GetOrGenerateEntryAsync("not-a-date", force: false));
    }

    // ── No day data throws ────────────────────────────────────────────────

    [Fact]
    public async Task No_day_data_throws_InvalidOperationException()
    {
        var (repo, _, svc) = Build();
        var past = DateOnly.FromDateTime(DateTime.UtcNow).AddDays(-1).ToString("yyyy-MM-dd");

        repo.GetCachedEntryContentAsync(past).Returns((string?)null);
        repo.GetDayDataAsync(past).Returns((DiaryDayData?)null);

        await Assert.ThrowsAsync<InvalidOperationException>(() =>
            svc.GetOrGenerateEntryAsync(past, force: false));
    }

    // ── Prompt includes mood annotation ──────────────────────────────────

    [Fact]
    public async Task Prompt_includes_mood_annotation_for_non_normal_mood()
    {
        var (repo, gemini, svc) = Build();
        var past = DateOnly.FromDateTime(DateTime.UtcNow).AddDays(-1).ToString("yyyy-MM-dd");
        var ts = new DateTimeOffset(DateTime.SpecifyKind(DateTime.Parse(past + "T14:30:00"), DateTimeKind.Utc));

        repo.GetCachedEntryContentAsync(past).Returns((string?)null);
        var dayData = new DiaryDayData(past,
            [new DiaryPromptEntry("Dark jazz vibes", "noir", ts)]);
        repo.GetDayDataAsync(past).Returns(dayData);

        string? capturedPrompt = null;
        gemini.GenerateDiaryEntryAsync(Arg.Do<string>(p => capturedPrompt = p), Arg.Any<CancellationToken>())
              .Returns("entry");

        await svc.GetOrGenerateEntryAsync(past, force: false);

        Assert.NotNull(capturedPrompt);
        Assert.Contains("[noir]", capturedPrompt);
        Assert.Contains("Dark jazz vibes", capturedPrompt);
    }

    // ── Normal mood has no annotation ────────────────────────────────────

    [Fact]
    public async Task Normal_mood_has_no_bracket_annotation()
    {
        var (repo, gemini, svc) = Build();
        var past = DateOnly.FromDateTime(DateTime.UtcNow).AddDays(-1).ToString("yyyy-MM-dd");
        var ts = new DateTimeOffset(DateTime.SpecifyKind(DateTime.Parse(past + "T09:00:00"), DateTimeKind.Utc));

        repo.GetCachedEntryContentAsync(past).Returns((string?)null);
        var dayData = new DiaryDayData(past,
            [new DiaryPromptEntry("Morning folk", "normal", ts)]);
        repo.GetDayDataAsync(past).Returns(dayData);

        string? capturedPrompt = null;
        gemini.GenerateDiaryEntryAsync(Arg.Do<string>(p => capturedPrompt = p), Arg.Any<CancellationToken>())
              .Returns("entry");

        await svc.GetOrGenerateEntryAsync(past, force: false);

        Assert.NotNull(capturedPrompt);
        Assert.DoesNotContain("[normal]", capturedPrompt);
        Assert.Contains("Morning folk", capturedPrompt);
    }
}
