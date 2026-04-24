namespace Reco.Api.Configuration;

public class GeminiOptions
{
    public const string SectionName = "Gemini";

    public string ApiKey { get; set; } = string.Empty;
    public string Model { get; set; } = "gemini-2.5-pro";
    public string BaseUrl { get; set; } = "https://generativelanguage.googleapis.com";
}
