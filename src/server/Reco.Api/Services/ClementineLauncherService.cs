using System.Diagnostics;
using System.Runtime.InteropServices;

namespace Reco.Api.Services;

public class ClementineLauncherService(IAppSettingsService settings, ILogger<ClementineLauncherService> logger)
    : IClementineLauncherService
{
    private static readonly string DefaultExePath = RuntimeInformation.IsOSPlatform(OSPlatform.Windows)
        ? @"C:\Program Files (x86)\Clementine\clementine.exe"
        : "clementine";

    public async Task<(bool success, string? error)> AddToPlaylistAsync(IEnumerable<string> filePaths)
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
                    return (false, $"Invalid file URI: {filePath}");
                }
            }

            if (!File.Exists(localPath))
            {
                logger.LogWarning("Track file not found: {LocalPath}", localPath);
                return (false, $"File not found: {localPath}");
            }

            localPaths.Add(localPath);
        }

        if (localPaths.Count == 0)
            return (false, "No valid file paths provided.");

        var exePath = await settings.GetStringAsync("CLEMENTINE_EXE_PATH", DefaultExePath);

        if (Path.IsPathRooted(exePath) && !File.Exists(exePath))
        {
            logger.LogWarning("Clementine executable not found at: {ExePath}", exePath);
            return (false, $"Clementine not found at: {exePath}");
        }

        try
        {
            var psi = new ProcessStartInfo
            {
                FileName        = exePath,
                UseShellExecute = false,
                CreateNoWindow  = true,
            };

            foreach (var path in localPaths)
            {
                psi.ArgumentList.Add("-a");
                psi.ArgumentList.Add(path);
            }

            Process.Start(psi);
            logger.LogInformation("Launched Clementine with {Count} track(s)", localPaths.Count);
            return (true, null);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Failed to launch Clementine");
            return (false, ex.Message);
        }
    }
}
