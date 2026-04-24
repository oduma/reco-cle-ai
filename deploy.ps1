# deploy.ps1
# Builds the Angular frontend and publishes the .NET API into the deploy\ folder.
# Run this whenever you want to refresh the deployed version.
# After running, edit start.ps1 with your secrets and run it.

param()
$ErrorActionPreference = "Stop"
$repoRoot = $PSScriptRoot

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

Write-Host "`n=== Step 3: Publish .NET API to deploy\ ===" -ForegroundColor Cyan
$deployOut = "$repoRoot\deploy"
dotnet publish "$repoRoot\src\server\Reco.Api\Reco.Api.csproj" `
    --configuration Release `
    --output $deployOut
if ($LASTEXITCODE -ne 0) { Write-Error ".NET publish failed."; exit 1 }

Write-Host "`n=== Done ===" -ForegroundColor Green
Write-Host "Deployed to: $deployOut"
Write-Host "Run .\start.ps1 to start the app at http://localhost:12500"
