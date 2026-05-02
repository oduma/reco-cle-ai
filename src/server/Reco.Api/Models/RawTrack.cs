using System.Text.Json.Serialization;

namespace Reco.Api.Models;

public record RawTrack(
    [property: JsonPropertyName("title")]  string  Title,
    [property: JsonPropertyName("artist")] string  Artist,
    [property: JsonPropertyName("album")]  string? Album
);
