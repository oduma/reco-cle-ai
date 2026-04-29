namespace Reco.Api.Models;

public record LocalTrack(
    string Title,
    string Artist,
    string? Album,
    string NormalizedTitle,
    string NormalizedArtist,
    string? NormalizedAlbum,
    string? FilePath
);
