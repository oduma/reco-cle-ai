namespace Reco.Api.Configuration;

public class ClementineOptions
{
    public const string SectionName = "Clementine";

    public string DbPath { get; set; } = @"C:\Code\clementine.db";

    /// <summary>
    /// Minimum Jaccard-token similarity (0–1) required for both artist and title
    /// for a Gemini suggestion to be considered a local library match.
    /// </summary>
    public double MatchThreshold { get; set; } = 0.75;
}
