# Git Setup Script voor Alarmsysteem-Webshop
# Dit script initialiseert git, voegt alle bestanden toe, maakt een commit en pusht naar GitHub

Write-Host "Git Repository Setup..." -ForegroundColor Cyan

# Check of git is geïnstalleerd
try {
    $gitVersion = git --version
    Write-Host "Git gevonden: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "Git is niet geïnstalleerd!" -ForegroundColor Red
    Write-Host "Download Git van: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

# Check of er al een .git directory bestaat
if (Test-Path .git) {
    Write-Host "Git repository bestaat al" -ForegroundColor Green
} else {
    Write-Host "Initialiseren van Git repository..." -ForegroundColor Cyan
    git init
}

# Remote toevoegen (als deze nog niet bestaat)
$remoteUrl = "https://github.com/mcmusabe/Alarmsysteem-Webshop.git"
$existingRemote = git remote get-url origin 2>$null

if ($LASTEXITCODE -ne 0 -or !$existingRemote) {
    Write-Host "Remote repository toevoegen..." -ForegroundColor Cyan
    git remote add origin $remoteUrl
} else {
    Write-Host "Remote repository bestaat al: $existingRemote" -ForegroundColor Green
    # Update remote URL als deze anders is
    if ($existingRemote -ne $remoteUrl) {
        Write-Host "Remote URL bijwerken..." -ForegroundColor Cyan
        git remote set-url origin $remoteUrl
    }
}

# .gitignore aanmaken als deze niet bestaat
if (!(Test-Path .gitignore)) {
    Write-Host ".gitignore aanmaken..." -ForegroundColor Cyan
    $gitignoreContent = @"
# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env*.local
.env

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
Thumbs.db
"@
    $gitignoreContent | Out-File -FilePath .gitignore -Encoding UTF8
}

# Alle bestanden toevoegen
Write-Host "Bestanden toevoegen aan staging area..." -ForegroundColor Cyan
git add .

# Status tonen
Write-Host ""
Write-Host "Git Status:" -ForegroundColor Cyan
git status

# Commit maken
Write-Host ""
Write-Host "Commit maken..." -ForegroundColor Cyan
$commitMessage = "Initial commit: Alarmsysteem Webshop met admin panel, chatbot, en alle features"
git commit -m $commitMessage

if ($LASTEXITCODE -eq 0) {
    Write-Host "Commit succesvol!" -ForegroundColor Green
    
    # Push naar GitHub
    Write-Host ""
    Write-Host "Pushen naar GitHub..." -ForegroundColor Cyan
    Write-Host "Let op: Je moet mogelijk authenticatie instellen (SSH key of Personal Access Token)" -ForegroundColor Yellow
    
    # Probeer te pushen
    git push -u origin main
    
    if ($LASTEXITCODE -ne 0) {
        # Probeer master branch
        git push -u origin master
        
        if ($LASTEXITCODE -ne 0) {
            Write-Host ""
            Write-Host "Push mislukt. Mogelijke oorzaken:" -ForegroundColor Yellow
            Write-Host "  1. Je bent niet ingelogd bij GitHub" -ForegroundColor Yellow
            Write-Host "  2. Je hebt geen toegang tot de repository" -ForegroundColor Yellow
            Write-Host "  3. De repository bestaat nog niet op GitHub" -ForegroundColor Yellow
            Write-Host ""
            Write-Host "Oplossingen:" -ForegroundColor Cyan
            Write-Host "  - Maak de repository aan op GitHub: https://github.com/new" -ForegroundColor Cyan
            Write-Host "  - Gebruik GitHub Desktop of VS Code Git extensie" -ForegroundColor Cyan
            Write-Host "  - Of push handmatig: git push -u origin main" -ForegroundColor Cyan
        } else {
            Write-Host "Code succesvol gepusht naar GitHub!" -ForegroundColor Green
        }
    } else {
        Write-Host "Code succesvol gepusht naar GitHub!" -ForegroundColor Green
    }
} else {
    Write-Host "Commit mislukt. Mogelijk zijn er geen wijzigingen om te committen." -ForegroundColor Red
}

Write-Host ""
Write-Host "Klaar!" -ForegroundColor Green
