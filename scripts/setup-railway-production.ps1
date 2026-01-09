# Railway Production Setup Script
# Dit script helpt je om je Railway project in te stellen voor productie

Write-Host "🚂 Railway Production Setup" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan
Write-Host ""

# Check if Railway CLI is installed
Write-Host "📦 Controleren Railway CLI..." -ForegroundColor Yellow
$railwayInstalled = Get-Command railway -ErrorAction SilentlyContinue
if (-not $railwayInstalled) {
    Write-Host "❌ Railway CLI is niet geïnstalleerd!" -ForegroundColor Red
    Write-Host "   Installeer met: npm install -g @railway/cli" -ForegroundColor Yellow
    exit 1
}
Write-Host "✅ Railway CLI is geïnstalleerd" -ForegroundColor Green
Write-Host ""

# Check if logged in
Write-Host "🔐 Controleren Railway login..." -ForegroundColor Yellow
$loginCheck = railway whoami 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Je bent niet ingelogd bij Railway" -ForegroundColor Yellow
    Write-Host "   Voer uit: railway login" -ForegroundColor Yellow
    Write-Host "   En voer dit script daarna opnieuw uit" -ForegroundColor Yellow
    exit 1
}
Write-Host "✅ Ingelogd bij Railway" -ForegroundColor Green
Write-Host ""

# Supabase credentials (from your project)
$SUPABASE_URL = "https://kvcfjultqlxftokyxztj.supabase.co"
$SUPABASE_ANON_KEY = "sb_publishable_MLlcpJ_CpMDiHsk0r-xj0A_LzGqmHbj"

Write-Host "📋 Environment Variables voor Railway:" -ForegroundColor Cyan
Write-Host ""
Write-Host "NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL" -ForegroundColor White
Write-Host "NEXT_PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY" -ForegroundColor White
Write-Host "NODE_ENV=production" -ForegroundColor White
Write-Host ""

# Check if project is linked
Write-Host "🔗 Controleren Railway project link..." -ForegroundColor Yellow
$projectCheck = railway status 2>&1
if ($LASTEXITCODE -ne 0 -or $projectCheck -match "No project linked") {
    Write-Host "⚠️  Geen Railway project gekoppeld" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Opties:" -ForegroundColor Cyan
    Write-Host "1. Link bestaand project: railway link" -ForegroundColor White
    Write-Host "2. Maak nieuw project: railway init" -ForegroundColor White
    Write-Host ""
    $choice = Read-Host "Wil je nu een project linken? (y/n)"
    if ($choice -eq "y" -or $choice -eq "Y") {
        railway link
    } else {
        Write-Host "⚠️  Je moet eerst een project linken voordat je verder gaat" -ForegroundColor Yellow
        exit 1
    }
} else {
    Write-Host "✅ Railway project is gekoppeld" -ForegroundColor Green
    railway status
}
Write-Host ""

# Set environment variables
Write-Host "🔧 Environment variables instellen..." -ForegroundColor Yellow
Write-Host ""

railway variables set "NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL"
railway variables set "NEXT_PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY"
railway variables set "NODE_ENV=production"

Write-Host ""
Write-Host "✅ Environment variables ingesteld!" -ForegroundColor Green
Write-Host ""

# Generate domain
Write-Host "🌐 Domain genereren..." -ForegroundColor Yellow
railway domain
Write-Host ""

# Show current variables
Write-Host "📊 Huidige environment variables:" -ForegroundColor Cyan
railway variables
Write-Host ""

# Deploy
Write-Host "🚀 Klaar om te deployen!" -ForegroundColor Green
Write-Host ""
Write-Host "Volgende stappen:" -ForegroundColor Cyan
Write-Host "1. Deploy naar Railway: railway up" -ForegroundColor White
Write-Host "2. Of push naar GitHub (als CI/CD is ingesteld)" -ForegroundColor White
Write-Host "3. Check logs: railway logs" -ForegroundColor White
Write-Host ""

Write-Host "✅ Setup compleet!" -ForegroundColor Green
