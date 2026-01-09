# Railway Deployment Guide

Deze guide helpt je om de AlarmWebshop applicatie te deployen naar Railway.

## Vereisten

1. **Railway Account**: Maak een account aan op [railway.app](https://railway.app)
2. **GitHub Repository**: Je code moet op GitHub staan (al gedaan ✅)
3. **Supabase Project**: Je Supabase project moet klaar zijn

## Stap 1: Railway Project Aanmaken

1. Ga naar [railway.app](https://railway.app) en log in
2. Klik op "New Project"
3. Selecteer "Deploy from GitHub repo"
4. Kies je repository: `mcmusabe/Alarmsysteem-Webshop`
5. Railway detecteert automatisch dat het een Next.js project is

## Stap 2: Environment Variables Instellen

Railway detecteert automatisch dat je een Next.js project hebt. Je moet de volgende environment variables instellen:

### Verplichte Variables

1. Ga naar je Railway project
2. Klik op je service
3. Ga naar de "Variables" tab
4. Voeg de volgende variables toe:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NODE_ENV=production
```

### Optionele Variables (voor admin functionaliteit)

```env
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Waar vind je deze waarden?

- **NEXT_PUBLIC_SUPABASE_URL**: Supabase Dashboard → Project Settings → API → Project URL
- **NEXT_PUBLIC_SUPABASE_ANON_KEY**: Supabase Dashboard → Project Settings → API → anon/public key
- **SUPABASE_SERVICE_ROLE_KEY**: Supabase Dashboard → Project Settings → API → service_role key (⚠️ Geheim!)

## Stap 3: Build Settings

Railway detecteert automatisch:
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Node Version**: Automatisch gedetecteerd

Je kunt dit aanpassen in Railway → Settings → Build & Deploy als nodig.

## Stap 4: Domain Configureren

1. Ga naar je Railway project
2. Klik op je service
3. Ga naar de "Settings" tab
4. Scroll naar "Domains"
5. Klik op "Generate Domain" voor een gratis Railway domain
6. Of voeg je eigen custom domain toe

## Stap 5: Deploy

Railway deployt automatisch bij elke push naar de `main` branch. 

Voor de eerste deploy:
1. Railway start automatisch met builden zodra je de repository verbindt
2. Wacht tot de build klaar is (ongeveer 2-5 minuten)
3. Je applicatie is live op de gegenereerde Railway URL!

## Stap 6: Post-Deployment Checklist

Na de eerste deploy:

- [ ] Test de homepage: `https://your-app.railway.app`
- [ ] Test de configurator: `https://your-app.railway.app/configurator`
- [ ] Test de admin login: `https://your-app.railway.app/admin/login`
- [ ] Controleer of alle API endpoints werken
- [ ] Test de chatbot functionaliteit
- [ ] Controleer of afbeeldingen correct laden

## Monitoring & Logs

### Logs Bekijken

1. Ga naar je Railway project
2. Klik op je service
3. Ga naar de "Deployments" tab
4. Klik op een deployment om logs te zien

### Metrics

Railway toont automatisch:
- CPU gebruik
- Memory gebruik
- Network traffic
- Request count

## Troubleshooting

### Build Fails

**Probleem**: Build faalt met "Module not found"
**Oplossing**: 
- Controleer of alle dependencies in `package.json` staan
- Verwijder `node_modules` en `package-lock.json` lokaal
- Commit en push opnieuw

**Probleem**: Build faalt met "Environment variable missing"
**Oplossing**:
- Controleer of alle verplichte environment variables zijn ingesteld
- Zorg dat variabelen beginnen met `NEXT_PUBLIC_` voor client-side toegang

### Runtime Errors

**Probleem**: "Cannot connect to Supabase"
**Oplossing**:
- Controleer of `NEXT_PUBLIC_SUPABASE_URL` en `NEXT_PUBLIC_SUPABASE_ANON_KEY` correct zijn
- Controleer of je Supabase project actief is
- Controleer Supabase logs voor errors

**Probleem**: "500 Internal Server Error"
**Oplossing**:
- Bekijk Railway logs voor de exacte error
- Controleer of alle API routes correct werken
- Test lokaal met `npm run build && npm start`

### Performance Issues

**Probleem**: Trage laadtijden
**Oplossing**:
- Controleer Railway metrics voor resource gebruik
- Overweeg om een groter plan te upgraden
- Optimaliseer afbeeldingen (al gedaan in `next.config.js`)
- Controleer database queries in Supabase

## Database Setup

Zorg ervoor dat je Supabase database correct is ingesteld:

1. Alle tabellen zijn aangemaakt
2. Row Level Security (RLS) is correct geconfigureerd
3. Storage buckets zijn aangemaakt (voor uploads)
4. Alle benodigde data is ingevoerd (producten, settings)

Zie `docs/ADMIN_SETUP.md` voor database setup details.

## CI/CD

Railway deployt automatisch bij elke push naar `main`. 

Voor andere branches:
1. Maak een nieuwe service in Railway
2. Connect de branch
3. Configureer dezelfde environment variables

## Scaling

Railway schaalt automatisch, maar je kunt handmatig:
1. Ga naar Settings → Resources
2. Pas CPU en Memory aan
3. Railway past automatisch de prijs aan

## Backup & Recovery

### Database Backups

Supabase maakt automatisch backups. Je kunt ook handmatig:
1. Ga naar Supabase Dashboard
2. Settings → Database
3. Klik op "Backup" voor een snapshot

### Code Backups

Je code staat op GitHub, dus dat is al gebackupt!

## Kosten

Railway heeft een gratis tier met:
- $5 gratis credits per maand
- 500 hours compute time
- 100GB bandwidth

Voor productie gebruik, overweeg een betaald plan.

## Support

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Supabase Docs: https://supabase.com/docs

## Security Best Practices

1. **Never commit secrets**: Gebruik altijd environment variables
2. **Use HTTPS**: Railway gebruikt automatisch HTTPS
3. **Keep dependencies updated**: Run `npm audit` regelmatig
4. **Monitor logs**: Check Railway logs voor verdachte activiteit
5. **Database security**: Zorg dat RLS correct is ingesteld in Supabase

## Next Steps

Na succesvolle deployment:

1. ✅ Setup custom domain (optioneel)
2. ✅ Configure monitoring alerts
3. ✅ Setup database backups
4. ✅ Test alle functionaliteiten
5. ✅ Share de URL met je team!
