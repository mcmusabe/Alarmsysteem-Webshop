# Railway Deployment Script
# Voer dit script uit na `railway login`

Write-Host "🚂 Railway Deployment" -ForegroundColor Cyan
Write-Host "====================" -ForegroundColor Cyan
Write-Host ""

# Check if logged in
Write-Host "🔐 Controleren login status..." -ForegroundColor Yellow
$whoami = railway whoami 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Je bent niet ingelogd bij Railway!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Voer eerst uit:" -ForegroundColor Yellow
    Write-Host "  railway login" -ForegroundColor White
    Write-Host ""
    Write-Host "En voer dit script daarna opnieuw uit." -ForegroundColor Yellow
    exit 1
}
Write-Host "✅ Ingelogd als: $($whoami -join ' ')" -ForegroundColor Green
Write-Host ""

# Check if project is linked
Write-Host "🔗 Controleren project link..." -ForegroundColor Yellow
$status = railway status 2>&1
if ($LASTEXITCODE -ne 0 -or $status -match "No project linked") {
    Write-Host "⚠️  Geen project gekoppeld" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Opties:" -ForegroundColor Cyan
    Write-Host "1. Link bestaand project: railway link" -ForegroundColor White
    Write-Host "2. Maak nieuw project: railway init" -ForegroundColor White
    Write-Host ""
    $choice = Read-Host "Wil je nu een project linken? (y/n)"
    if ($choice -eq "y" -or $choice -eq "Y") {
        railway link
        if ($LASTEXITCODE -ne 0) {
            Write-Host "❌ Project linken mislukt" -ForegroundColor Red
            exit 1
        }
    } else {
        Write-Host "⚠️  Je moet eerst een project linken" -ForegroundColor Yellow
        exit 1
    }
} else {
    Write-Host "✅ Project is gekoppeld" -ForegroundColor Green
    railway status
}
Write-Host ""

# Check environment variables
Write-Host "🔧 Controleren environment variables..." -ForegroundColor Yellow
$vars = railway variables 2>&1
$hasSupabaseUrl = $vars -match "NEXT_PUBLIC_SUPABASE_URL"
$hasSupabaseKey = $vars -match "NEXT_PUBLIC_SUPABASE_ANON_KEY"
$hasNodeEnv = $vars -match "NODE_ENV"

if (-not $hasSupabaseUrl -or -not $hasSupabaseKey -or -not $hasNodeEnv) {
    Write-Host "⚠️  Environment variables ontbreken" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Instellen van environment variables..." -ForegroundColor Cyan
    
    railway variables set "NEXT_PUBLIC_SUPABASE_URL=https://kvcfjultqlxftokyxztj.supabase.co"
    railway variables set "NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_MLlcpJ_CpMDiHsk0r-xj0A_LzGqmHbj"
    railway variables set "NODE_ENV=production"
    
    Write-Host "✅ Environment variables ingesteld" -ForegroundColor Green
} else {
    Write-Host "✅ Environment variables zijn ingesteld" -ForegroundColor Green
}
Write-Host ""

# Check domain
Write-Host "🌐 Controleren domain..." -ForegroundColor Yellow
$domain = railway domain 2>&1
if ($LASTEXITCODE -eq 0 -and $domain -notmatch "No domain") {
    Write-Host "✅ Domain: $domain" -ForegroundColor Green
} else {
    Write-Host "⚠️  Geen domain gevonden, genereren..." -ForegroundColor Yellow
    railway domain
}
Write-Host ""

# Deploy
Write-Host "🚀 Starten deployment..." -ForegroundColor Cyan
Write-Host ""
railway up

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Deployment gestart!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Volgende stappen:" -ForegroundColor Cyan
    Write-Host "1. Wacht tot deployment klaar is (2-5 minuten)" -ForegroundColor White
    Write-Host "2. Check logs: railway logs" -ForegroundColor White
    Write-Host "3. Test je app op de Railway URL" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ Deployment mislukt" -ForegroundColor Red
    Write-Host "Check logs: railway logs" -ForegroundColor Yellow
    exit 1
}
