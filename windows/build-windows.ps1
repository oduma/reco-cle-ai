# build-windows.ps1
# Builds Reasonic as a self-contained Windows x64 deployment.
# .NET and Node.js are NOT required on the target machine.
#
# Output goes to windows\dist\ — copy that folder anywhere on a Windows 11 machine
# and run start.ps1. See windows\deploy-windows.md for full instructions.

param()
$ErrorActionPreference = "Stop"
$repoRoot = Split-Path $PSScriptRoot -Parent

Write-Host "`n=== Step 1: Angular production build ===" -ForegroundColor Cyan
Push-Location "$repoRoot\src\client"
npx ng build
if ($LASTEXITCODE -ne 0) { Write-Error "Angular build failed."; exit 1 }
Pop-Location

Write-Host "`n=== Step 2: Copy Angular output to API wwwroot ===" -ForegroundColor Cyan
$angularOut = "$repoRoot\src\client\dist\reco-client\browser"
$wwwroot    = "$repoRoot\src\server\Reco.Api\wwwroot"
if (Test-Path $wwwroot) { Remove-Item "$wwwroot\*" -Recurse -Force }
Copy-Item "$angularOut\*" $wwwroot -Recurse
Write-Host "Copied to $wwwroot"

Write-Host "`n=== Step 3: Publish .NET API — self-contained, win-x64 ===" -ForegroundColor Cyan
$distOut = "$PSScriptRoot\dist"
dotnet publish "$repoRoot\src\server\Reco.Api\Reco.Api.csproj" `
    --configuration Release `
    --runtime win-x64 `
    --self-contained true `
    --output $distOut
if ($LASTEXITCODE -ne 0) { Write-Error ".NET publish failed."; exit 1 }

# Copy the run script and deployment guide into dist so they travel with the binary
Copy-Item "$PSScriptRoot\start.ps1"          "$distOut\start.ps1"
Copy-Item "$PSScriptRoot\deploy-windows.md"  "$distOut\deploy-windows.md"
Write-Host "Copied start.ps1 and deploy-windows.md to dist"

Write-Host "`n=== Done ===" -ForegroundColor Green
Write-Host "Windows build output: $distOut"
Write-Host "Copy the entire 'windows\dist\' folder to the target machine."
Write-Host "Then follow the instructions in windows\dist\deploy-windows.md (or windows\deploy-windows.md)."
