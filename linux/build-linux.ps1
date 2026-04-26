# build-linux.ps1
# Run this on Windows to produce a self-contained Linux deployment.
# .NET and Node.js are NOT required on the Linux machine.
#
# Output goes to linux\dist\ — copy that folder to your Linux machine
# and follow the instructions in linux\deploy-linux.md.

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

Write-Host "`n=== Step 3: Publish .NET API — self-contained, linux-x64 ===" -ForegroundColor Cyan
$distOut = "$PSScriptRoot\dist"
dotnet publish "$repoRoot\src\server\Reco.Api\Reco.Api.csproj" `
    --configuration Release `
    --runtime linux-x64 `
    --self-contained true `
    --output $distOut
if ($LASTEXITCODE -ne 0) { Write-Error ".NET publish failed."; exit 1 }

# Copy the Linux start script into dist so it travels with the binary
Copy-Item "$PSScriptRoot\start.sh" "$distOut\start.sh"
Write-Host "Copied start.sh to dist"

Write-Host "`n=== Done ===" -ForegroundColor Green
Write-Host "Linux build output: $distOut"
Write-Host "Copy the entire 'linux\dist\' folder to your Linux machine."
Write-Host "Then follow the instructions in linux\deploy-linux.md."
