# start.ps1
# Starts the deployed Reco app.
# Run deploy.ps1 first if you haven't already, or after any code changes.

# ── Required (set once as a Windows system/user environment variable) ────────
# GEMINI_API_KEY is read automatically from your Windows environment.
# If you haven't set it yet, run this in an elevated PowerShell once:
#   [System.Environment]::SetEnvironmentVariable("GEMINI_API_KEY", "your-key", "User")
# Then restart this terminal and run start.ps1 again.

# ── Optional overrides (defaults shown, uncomment to change) ─────────────────
# $env:GEMINI_MODEL               = "gemini-2.5-pro"
# $env:CLEMENTINE_DB_PATH         = "C:\Code\clementine.db"
# $env:CLEMENTINE_MATCH_THRESHOLD = "0.75"
# $env:RECOMMENDATION_MIN_TRACKS  = "10"
# $env:RECOMMENDATION_MAX_TRACKS  = "20"

# ── Runtime config ────────────────────────────────────────────────────────────
$env:ASPNETCORE_ENVIRONMENT = "Production"
$env:ASPNETCORE_URLS        = "http://localhost:12500"

Write-Host "Starting Reco at http://localhost:12500 — press Ctrl+C to stop" -ForegroundColor Cyan

# cd into deploy\ so ASP.NET Core resolves wwwroot relative to the DLL, not the repo root
Push-Location "$PSScriptRoot\deploy"
try {
    dotnet Reco.Api.dll
} finally {
    Pop-Location
}
