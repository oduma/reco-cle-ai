using System.Runtime.InteropServices;

namespace Reco.Api.Configuration;

public class ClementineLauncherOptions
{
    public const string SectionName = "ClementineLauncher";

    public string ExePath { get; set; } = RuntimeInformation.IsOSPlatform(OSPlatform.Windows)
        ? @"C:\Program Files (x86)\Clementine\clementine.exe"
        : "clementine";
}
