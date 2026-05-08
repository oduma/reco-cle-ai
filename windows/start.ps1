# start.ps1 — starts Reasonic on Windows 11.
# Must be placed in the same folder as Reco.Api.exe (the dist folder).
# See deploy-windows.md for full setup instructions.

$ScriptDir = Split-Path $MyInvocation.MyCommand.Path -Parent

# Load secrets from .env.local if it exists next to this script.
# Never commit .env.local — it contains your API keys.
$envFile = Join-Path $ScriptDir ".env.local"
if (Test-Path $envFile) {
    Write-Host "Loading environment from .env.local..." -ForegroundColor DarkGray
    foreach ($line in Get-Content $envFile) {
        $line = $line.Trim()
        # Skip comments and blank lines
        if ($line -match '^\s*#' -or $line -eq '') { continue }
        if ($line -match '^([^=]+)=(.*)$') {
            $key = $Matches[1].Trim()
            $val = $Matches[2].Trim().Trim('"').Trim("'")
            [System.Environment]::SetEnvironmentVariable($key, $val, 'Process')
        }
    }
}

# Warn if required API keys are missing.
# From Phase 11 onward these can also be entered via the in-app settings panel after startup.
if (-not $env:GEMINI_API_KEY) {
    Write-Warning "GEMINI_API_KEY is not set.`n  Add it to .env.local, or open the settings panel in the app after startup."
}
if (-not $env:LASTFM_API_KEY) {
    Write-Warning "LASTFM_API_KEY is not set. Album art will be unavailable.`n  Add it to .env.local, or open the settings panel in the app after startup."
}

$env:ASPNETCORE_ENVIRONMENT = "Production"
$env:ASPNETCORE_URLS        = "http://localhost:12500"

# Optional overrides — uncomment and edit as needed.
# From Phase 11 onward, all of these (except REASONIC_DB_PATH) can also be
# changed live via the in-app settings panel without restarting the app.
#
# $env:REASONIC_DB_PATH = "C:\Users\youruser\reasonic.db"   # default: reasonic.db next to binary (NOT UI-configurable)

Write-Host "Starting Reasonic at http://localhost:12500 — press Ctrl+C to stop" -ForegroundColor Cyan

# Locate the binary. When start.ps1 lives next to the binary (deployed scenario),
# use the script's own folder. When run from the repo's windows\ source folder
# during development, fall back to the windows\dist\ sub-folder.
$exePath = if (Test-Path "$ScriptDir\Reco.Api.exe") {
    "$ScriptDir\Reco.Api.exe"
} else {
    "$ScriptDir\dist\Reco.Api.exe"
}

# IMPORTANT: Set the working directory to the folder containing the binary.
# ASP.NET Core resolves ContentRootPath from Directory.GetCurrentDirectory(),
# so this must match the binary's folder for wwwroot to be found.
Set-Location (Split-Path $exePath -Parent)
& $exePath
