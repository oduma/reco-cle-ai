namespace Reco.Api.Services;

public interface IClementineLauncherService
{
    Task<(bool success, string? error)> AddToPlaylistAsync(IEnumerable<string> filePaths);
}
