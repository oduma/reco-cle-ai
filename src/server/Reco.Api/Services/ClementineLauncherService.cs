using System.Diagnostics;
using Microsoft.Extensions.Options;
using Reco.Api.Configuration;

namespace Reco.Api.Services;

public class ClementineLauncherService(IOptions<ClementineLauncherOptions> options, ILogger<ClementineLauncherService> logger)
    : IClementineLauncherService
{
    private readonly ClementineLauncherOptions _options = options.Value;

    public Task<(bool success, string? error)> AddToPlaylistAsync(IEnumerable<string> filePaths)
    {
        var localPaths = new List<string>();

        foreach (var filePath in filePaths)
        {
            var localPath = filePath;

            if (filePath.StartsWith("file://", StringComparison.OrdinalIgnoreCase))
            {
                try { localPath = new Uri(filePath).LocalPath; }
                catch (UriFormatException ex)
                {
                    logger.LogWarning(ex, "Could not parse file URI: {FilePath}", filePath);
                    return Task.FromResult<(bool, string?)>((false, $"Invalid file URI: {filePath}"));
                }
            }

            if (!File.Exists(localPath))
            {
                logger.LogWarning("Track file not found: {LocalPath}", localPath);
                return Task.FromResult<(bool, string?)>((false, $"File not found: {localPath}"));
            }

            localPaths.Add(localPath);
        }

        if (localPaths.Count == 0)
            return Task.FromResult<(bool, string?)>((false, "No valid file paths provided."));

        // When ExePath is a bare command name (Linux PATH resolution), skip file-exists check
        if (Path.IsPathRooted(_options.ExePath) && !File.Exists(_options.ExePath))
        {
            logger.LogWarning("Clementine executable not found at: {ExePath}", _options.ExePath);
            return Task.FromResult<(bool, string?)>((false, $"Clementine not found at: {_options.ExePath}"));
        }

        try
        {
            var psi = new ProcessStartInfo
            {
                FileName = _options.ExePath,
                UseShellExecute = false,
                CreateNoWindow = true,
            };

            // ArgumentList handles proper quoting on both Windows and Linux
            foreach (var path in localPaths)
            {
                psi.ArgumentList.Add("-a");
                psi.ArgumentList.Add(path);
            }

            Process.Start(psi);
            logger.LogInformation("Launched Clementine with {Count} track(s)", localPaths.Count);
            return Task.FromResult<(bool, string?)>((true, null));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Failed to launch Clementine");
            return Task.FromResult<(bool, string?)>((false, ex.Message));
        }
    }
}
