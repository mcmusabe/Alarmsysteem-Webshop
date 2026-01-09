# Quick Deploy Script voor Railway
# Voer dit uit NA `railway login` in een interactieve terminal

Write-Host "🚀 Quick Deploy naar Railway" -ForegroundColor Cyan
Write-Host "===========================" -ForegroundColor Cyan
Write-Host ""

# Check login
$whoami = railway whoami 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Je bent niet ingelogd!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Open een NIEUWE PowerShell terminal en voer uit:" -ForegroundColor Yellow
    Write-Host "  railway login" -ForegroundColor White
    Write-Host ""
    Write-Host "Na het inloggen, voer dit script opnieuw uit." -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Ingelogd als: $($whoami -join ' ')" -ForegroundColor Green
Write-Host ""

# Check/link project
$status = railway status 2>&1
if ($LASTEXITCODE -ne 0 -or $status -match "No project linked") {
    Write-Host "⚠️  Geen project gekoppeld" -ForegroundColor Yellow
    Write-Host "Voer uit: railway link" -ForegroundColor White
    exit 1
}

Write-Host "✅ Project gekoppeld" -ForegroundColor Green
railway status
Write-Host ""

# Set variables (idempotent)
Write-Host "🔧 Environment variables instellen..." -ForegroundColor Yellow
railway variables set "NEXT_PUBLIC_SUPABASE_URL=https://kvcfjultqlxftokyxztj.supabase.co" 2>&1 | Out-Null
railway variables set "NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_MLlcpJ_CpMDiHsk0r-xj0A_LzGqmHbj" 2>&1 | Out-Null
railway variables set "NODE_ENV=production" 2>&1 | Out-Null
Write-Host "✅ Variables ingesteld" -ForegroundColor Green
Write-Host ""

# Generate domain if needed
Write-Host "🌐 Domain controleren..." -ForegroundColor Yellow
railway domain 2>&1 | Out-Null
Write-Host ""

# Deploy
Write-Host "🚀 Deployen naar Railway..." -ForegroundColor Cyan
Write-Host ""
railway up

Write-Host ""
Write-Host "✅ Deployment gestart!" -ForegroundColor Green
Write-Host ""
Write-Host "Bekijk progress:" -ForegroundColor Cyan
Write-Host "  railway logs" -ForegroundColor White
Write-Host ""
