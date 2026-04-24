using System.Text.RegularExpressions;
using Reco.Api.DTOs;
using Reco.Api.Models;

namespace Reco.Api.Services;

public static class TrackMatcher
{
    private static readonly Regex NonWordChars = new(@"[^\w\s]", RegexOptions.Compiled);
    private static readonly Regex MultipleSpaces = new(@"\s+", RegexOptions.Compiled);

    public static string Normalize(string input)
    {
        if (string.IsNullOrWhiteSpace(input)) return string.Empty;
        var s = input.ToLowerInvariant();
        s = NonWordChars.Replace(s, " ");
        s = MultipleSpaces.Replace(s, " ").Trim();
        return s;
    }

    /// <summary>
    /// Returns a similarity score between 0 and 1 for two pre-normalised strings.
    /// Exact match → 1.0, one contains the other → 0.9, otherwise Jaccard token overlap.
    /// </summary>
    public static double Similarity(string a, string b)
    {
        if (string.IsNullOrEmpty(a) && string.IsNullOrEmpty(b)) return 1.0;
        if (string.IsNullOrEmpty(a) || string.IsNullOrEmpty(b)) return 0.0;
        if (a == b) return 1.0;
        if (a.Contains(b) || b.Contains(a)) return 0.9;

        var tokensA = a.Split(' ', StringSplitOptions.RemoveEmptyEntries).ToHashSet();
        var tokensB = b.Split(' ', StringSplitOptions.RemoveEmptyEntries).ToHashSet();
        var intersection = tokensA.Intersect(tokensB).Count();
        var union = tokensA.Union(tokensB).Count();
        return union == 0 ? 0.0 : (double)intersection / union;
    }

    /// <summary>
    /// Returns true when a Gemini suggestion matches a local track at or above the threshold.
    /// Both artist and title must individually meet the threshold.
    /// </summary>
    public static bool IsMatch(TrackSuggestion suggestion, LocalTrack local, double threshold)
    {
        var normTitle = Normalize(suggestion.Title);
        var normArtist = Normalize(suggestion.Artist);

        return Similarity(normArtist, local.NormalizedArtist) >= threshold
            && Similarity(normTitle, local.NormalizedTitle) >= threshold;
    }
}
