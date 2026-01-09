# Production Deployment Checklist

Gebruik deze checklist voordat je naar productie deployt.

## Pre-Deployment

### Code Quality
- [ ] Alle tests zijn geslaagd (als je tests hebt)
- [ ] Linting is geslaagd: `npm run lint`
- [ ] Build is succesvol: `npm run build`
- [ ] Geen console errors of warnings
- [ ] Alle TypeScript errors zijn opgelost

### Environment Variables
- [ ] Alle environment variables zijn gedocumenteerd
- [ ] `.env.production.example` is up-to-date
- [ ] Geen hardcoded secrets in code
- [ ] Supabase credentials zijn correct

### Database
- [ ] Alle database migraties zijn uitgevoerd
- [ ] Row Level Security (RLS) is correct ingesteld
- [ ] Test data is verwijderd (of gescheiden van productie)
- [ ] Database backups zijn ingesteld
- [ ] Alle benodigde data is ingevoerd (producten, settings)

### Security
- [ ] Geen API keys of secrets in code
- [ ] CORS is correct geconfigureerd
- [ ] Rate limiting is ingesteld (indien nodig)
- [ ] Input validatie is overal geïmplementeerd
- [ ] SQL injection preventie (gebruik Supabase queries)
- [ ] XSS preventie (React escapt automatisch)

### Performance
- [ ] Images zijn geoptimaliseerd
- [ ] Code splitting is geïmplementeerd
- [ ] Lazy loading voor zware componenten
- [ ] API caching is ingesteld
- [ ] Database queries zijn geoptimaliseerd
- [ ] Bundle size is gecontroleerd

### Functionality
- [ ] Alle features werken correct
- [ ] Configurator wizard werkt end-to-end
- [ ] Prijsberekening is correct
- [ ] Bestellen functionaliteit werkt
- [ ] Afspraak systeem werkt
- [ ] Admin panel werkt
- [ ] Chatbot werkt
- [ ] Authentication werkt (login, register, logout)
- [ ] Email functionaliteit werkt (als gebruikt)

### UI/UX
- [ ] Responsive design werkt op alle devices
- [ ] Alle links werken
- [ ] Formulieren hebben error handling
- [ ] Loading states zijn geïmplementeerd
- [ ] Error messages zijn gebruiksvriendelijk
- [ ] Accessibility (a11y) is gecontroleerd

### Browser Compatibility
- [ ] Werkt in Chrome
- [ ] Werkt in Firefox
- [ ] Werkt in Safari
- [ ] Werkt in Edge
- [ ] Mobiele browsers getest

## Railway Deployment

### Setup
- [ ] Railway account is aangemaakt
- [ ] GitHub repository is verbonden
- [ ] Railway project is aangemaakt
- [ ] Service is geconfigureerd

### Environment Variables
- [ ] `NEXT_PUBLIC_SUPABASE_URL` is ingesteld
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` is ingesteld
- [ ] `NODE_ENV=production` is ingesteld
- [ ] `SUPABASE_SERVICE_ROLE_KEY` is ingesteld (als nodig)
- [ ] Alle andere benodigde variables zijn ingesteld

### Build & Deploy
- [ ] Build command is correct: `npm run build`
- [ ] Start command is correct: `npm start`
- [ ] Node version is ingesteld (20.x)
- [ ] Eerste deploy is succesvol
- [ ] Geen build errors in logs

### Post-Deployment

### Testing
- [ ] Homepage laadt correct
- [ ] Configurator werkt
- [ ] Prijsberekening werkt
- [ ] Bestellen werkt
- [ ] Afspraak systeem werkt
- [ ] Admin login werkt
- [ ] Alle API endpoints werken
- [ ] Images laden correct
- [ ] Forms werken correct
- [ ] Authentication werkt

### Monitoring
- [ ] Railway logs zijn gecontroleerd
- [ ] Geen errors in logs
- [ ] Performance metrics zijn gecontroleerd
- [ ] Supabase logs zijn gecontroleerd
- [ ] Error tracking is ingesteld (optioneel)

### Domain & SSL
- [ ] Custom domain is ingesteld (als gebruikt)
- [ ] SSL certificaat is actief
- [ ] HTTPS redirect werkt
- [ ] Domain DNS is correct

### Documentation
- [ ] README is up-to-date
- [ ] Deployment guide is compleet
- [ ] API documentatie is up-to-date
- [ ] Environment variables zijn gedocumenteerd

## Post-Launch

### Week 1
- [ ] Monitor error rates dagelijks
- [ ] Check performance metrics
- [ ] Test alle features regelmatig
- [ ] Verzamel user feedback
- [ ] Fix kritieke bugs direct

### Ongoing
- [ ] Regelmatige security updates
- [ ] Dependency updates
- [ ] Performance monitoring
- [ ] Database backups controleren
- [ ] User feedback verwerken

## Rollback Plan

Als er problemen zijn:
1. [ ] Identificeer het probleem in Railway logs
2. [ ] Ga naar Railway → Deployments
3. [ ] Klik op de vorige succesvolle deployment
4. [ ] Klik op "Redeploy"
5. [ ] Test of alles weer werkt

## Emergency Contacts

- Railway Support: https://railway.app/help
- Supabase Support: https://supabase.com/support
- GitHub Issues: Voor code problemen

## Notes

Voeg hier specifieke notities toe voor je deployment:
