namespace Reco.Api.Configuration;

public class OllamaOptions
{
    public const string SectionName = "Ollama";

    public string BaseUrl { get; set; } = "http://localhost:11434";
    public string WhisperModel { get; set; } = "llama3.1:8b";
    public string ShoutModel { get; set; } = "gemma4:e4b";
}
