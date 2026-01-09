# Railway Production Setup - Complete Guide

Deze guide helpt je om je AlarmWebshop applicatie volledig in te stellen voor productie op Railway.

## ✅ Pre-requisites

1. **Railway Account**: Maak een account aan op [railway.app](https://railway.app)
2. **Railway CLI**: Geïnstalleerd via `npm install -g @railway/cli` ✅
3. **Supabase Project**: Actief en klaar voor productie ✅
4. **GitHub Repository**: Code staat op GitHub

## 🚀 Stap 1: Railway Login

Open PowerShell en log in bij Railway:

```powershell
railway login
```

Dit opent je browser voor authenticatie. Na inloggen kun je verder.

## 🔗 Stap 2: Project Linken of Aanmaken

### Optie A: Link Bestaand Project

Als je al een Railway project hebt:

```powershell
railway link
```

Selecteer je project uit de lijst.

### Optie B: Nieuw Project Aanmaken

```powershell
railway init
```

Of gebruik de web interface:
1. Ga naar [railway.app](https://railway.app)
2. Klik "New Project"
3. Selecteer "Deploy from GitHub repo"
4. Kies je repository

## 🔧 Stap 3: Environment Variables Instellen

### Automatisch (Aanbevolen)

Gebruik het setup script:

```powershell
npm run setup-railway
```

Dit script:
- ✅ Controleert Railway CLI installatie
- ✅ Controleert login status
- ✅ Linkt project (als nodig)
- ✅ Stelt alle environment variables in
- ✅ Genereert domain

### Handmatig

Of stel handmatig in via Railway dashboard of CLI:

```powershell
railway variables set "NEXT_PUBLIC_SUPABASE_URL=https://kvcfjultqlxftokyxztj.supabase.co"
railway variables set "NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_MLlcpJ_CpMDiHsk0r-xj0A_LzGqmHbj"
railway variables set "NODE_ENV=production"
```

### Via Railway Dashboard

1. Ga naar je Railway project
2. Klik op je service
3. Ga naar "Variables" tab
4. Voeg de volgende variables toe:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://kvcfjultqlxftokyxztj.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_MLlcpJ_CpMDiHsk0r-xj0A_LzGqmHbj` |
| `NODE_ENV` | `production` |

## 🌐 Stap 4: Domain Genereren

Genereer een gratis Railway domain:

```powershell
railway domain
```

Of via dashboard:
1. Ga naar Settings → Domains
2. Klik "Generate Domain"
3. Kopieer de URL (bijv. `your-app.railway.app`)

## 🚢 Stap 5: Deployen

### Via CLI

```powershell
railway up
```

### Via GitHub (CI/CD)

Als je GitHub hebt gekoppeld:
1. Push naar `main` branch
2. Railway deployt automatisch

### Via Railway Dashboard

1. Ga naar je project
2. Klik "Deploy"
3. Wacht tot build klaar is (2-5 minuten)

## ✅ Stap 6: Verificatie

### 1. Health Check

Test de health endpoint:
```bash
curl https://your-app.railway.app/api/health
```

Verwacht response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-06T...",
  "uptime": 123.45,
  "environment": "production"
}
```

### 2. Test Homepage

Open in browser: `https://your-app.railway.app`

### 3. Test Functionaliteiten

- [ ] Homepage laadt
- [ ] Configurator werkt
- [ ] Prijsberekening werkt
- [ ] Login werkt
- [ ] Bestellen werkt
- [ ] Admin panel werkt (als ingelogd als admin)

## 📊 Stap 7: Monitoring

### Logs Bekijken

```powershell
railway logs
```

Of via dashboard:
1. Ga naar je service
2. Klik "Deployments"
3. Klik op een deployment voor logs

### Metrics

Railway toont automatisch:
- CPU gebruik
- Memory gebruik
- Network traffic
- Request count

## 🔒 Stap 8: Supabase Auth Configuratie

Voor productie moet je de auth redirect URLs updaten in Supabase:

1. Ga naar Supabase Dashboard
2. Authentication → URL Configuration
3. Voeg toe aan "Redirect URLs":
   - `https://your-app.railway.app/auth/callback`
   - `https://your-app.railway.app/**` (wildcard)

4. Als je Google OAuth gebruikt:
   - Update Google Cloud Console
   - Voeg toe: `https://your-app.railway.app/auth/callback`

## 🛠️ Troubleshooting

### Build Fails

**Probleem**: Build faalt met errors

**Oplossing**:
```powershell
# Check logs
railway logs --deploy build

# Test lokaal
npm run build
```

### Environment Variables Niet Gezet

**Probleem**: App werkt niet, missing environment variables

**Oplossing**:
```powershell
# Check variables
railway variables

# Set opnieuw
railway variables set "NEXT_PUBLIC_SUPABASE_URL=..."
```

### Database Connectie Fouten

**Probleem**: "Cannot connect to Supabase"

**Oplossing**:
1. Controleer environment variables
2. Verifieer Supabase project is actief
3. Check Supabase logs

### App Crasht Direct

**Probleem**: App start niet of crasht direct

**Oplossing**:
```powershell
# Check logs
railway logs

# Check health endpoint
curl https://your-app.railway.app/api/health
```

## 📝 Production Checklist

Gebruik deze checklist om te verifiëren dat alles werkt:

- [ ] Railway CLI geïnstalleerd en ingelogd
- [ ] Project gelinkt
- [ ] Environment variables ingesteld
- [ ] Domain gegenereerd
- [ ] Build succesvol
- [ ] App draait op Railway URL
- [ ] Health endpoint werkt
- [ ] Homepage laadt
- [ ] Configurator werkt
- [ ] Prijsberekening werkt
- [ ] Login werkt
- [ ] Supabase auth redirect URLs geüpdatet
- [ ] Admin panel werkt (als admin)
- [ ] Logs zijn schoon (geen errors)
- [ ] Performance is acceptabel

## 🔄 Updates Deployen

Voor toekomstige updates:

1. **Via GitHub (Aanbevolen)**:
   ```bash
   git add .
   git commit -m "Update voor productie"
   git push origin main
   ```
   Railway deployt automatisch.

2. **Via CLI**:
   ```powershell
   railway up
   ```

## 📚 Handige Commands

```powershell
# Status checken
railway status

# Variables bekijken
railway variables

# Variables instellen
railway variables set "KEY=value"

# Logs bekijken
railway logs

# Domain genereren
railway domain

# Deployen
railway up

# Project info
railway whoami
```

## 🆘 Support

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Supabase Docs: https://supabase.com/docs

## ✨ Next Steps

Na succesvolle deployment:

1. ✅ Setup custom domain (optioneel)
2. ✅ Configure monitoring alerts
3. ✅ Test alle functionaliteiten
4. ✅ Share URL met team/klanten
5. ✅ Monitor performance en errors

---

**Gemaakt voor**: AlarmWebshop Production Deployment
**Datum**: 2024-01-06
**Versie**: 1.0
