# Railway Inloggen en Deployen

## ⚠️ Belangrijk: Railway Login vereist interactieve terminal

Railway login werkt niet automatisch. Je moet handmatig inloggen in een **interactieve PowerShell terminal**.

## Stap 1: Open een NIEUWE PowerShell Terminal

1. Open PowerShell (niet via Cursor, maar een normale PowerShell window)
2. Navigeer naar je project:
   ```powershell
   cd C:\Users\Gebruiker\Documents\alarmsyst
   ```

## Stap 2: Log in bij Railway

```powershell
railway login
```

Dit opent je browser voor authenticatie. Volg de instructies.

## Stap 3: Deploy

Na succesvol inloggen, voer uit:

```powershell
npm run deploy
```

Of gebruik het quick deploy script:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/quick-deploy.ps1
```

## Alternatief: Handmatige Commands

Als je liever handmatig werkt:

```powershell
# 1. Check login
railway whoami

# 2. Link project (als eerste keer)
railway link

# 3. Stel environment variables in
railway variables set "NEXT_PUBLIC_SUPABASE_URL=https://kvcfjultqlxftokyxztj.supabase.co"
railway variables set "NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_MLlcpJ_CpMDiHsk0r-xj0A_LzGqmHbj"
railway variables set "NODE_ENV=production"

# 4. Genereer domain
railway domain

# 5. Deploy
railway up
```

## Troubleshooting

### "Cannot login in non-interactive mode"
- Open een **normale PowerShell terminal** (niet via Cursor)
- Voer `railway login` uit in die terminal

### "No project linked"
- Voer `railway link` uit
- Selecteer een bestaand project of maak een nieuw project aan

### "Unauthorized"
- Je token is verlopen
- Voer `railway login` opnieuw uit

## Na Deployment

1. Wacht 2-5 minuten voor de build
2. Check logs: `railway logs`
3. Test je app op de Railway URL
4. Update Supabase redirect URLs met je Railway domain
