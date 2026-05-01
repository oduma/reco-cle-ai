namespace Reco.Api.Configuration;

public class LastFmOptions
{
    public const string SectionName = "LastFm";

    public string ApiKey { get; set; } = string.Empty;
    public string BaseUrl { get; set; } = "https://ws.audioscrobbler.com/2.0/";
}
