namespace Reco.Api.Services;

public interface ILastFmGatewayService
{
    /// <summary>
    /// Returns the album art URL for a track, or null when art is unavailable or the call fails.
    /// Never throws.
    /// </summary>
    Task<string?> GetAlbumArtUrlAsync(
        string artist,
        string title,
        string? album = null,
        CancellationToken cancellationToken = default);
}
