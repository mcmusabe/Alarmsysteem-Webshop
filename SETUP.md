# Setup Instructies

## Vereisten Installeren

### 1. Node.js Installeren

Dit project heeft Node.js nodig om te draaien. Installeer Node.js versie 18 of hoger:

**Download Node.js:**
- Ga naar: https://nodejs.org/
- Download de LTS versie (aanbevolen)
- Installeer Node.js met de installer

**Verifieer installatie:**
Na installatie, open een nieuwe terminal/PowerShell en voer uit:
```bash
node --version
npm --version
```

Je zou versienummers moeten zien zoals:
- Node.js: v18.x.x of hoger
- npm: 9.x.x of hoger

### 2. Dependencies Installeren

Zodra Node.js geïnstalleerd is, voer uit in deze directory:

```bash
npm install
```

Dit installeert alle benodigde packages:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Supabase client
- React Hook Form
- Zod
- Zustand
- En alle andere dependencies

### 3. Environment Variables Instellen

Maak een `.env.local` bestand aan in de root directory met:

```env
NEXT_PUBLIC_SUPABASE_URL=https://kvcfjultqlxftokyxztj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_MLlcpJ_CpMDiHsk0r-xj0A_LzGqmHbj
```

### 4. Supabase Storage Bucket Aanmaken

**Via Supabase Dashboard:**

1. Ga naar: https://supabase.com/dashboard/project/kvcfjultqlxftokyxztj/storage/buckets
2. Klik op "New bucket"
3. **Naam:** `uploads`
4. **Public bucket:** ✅ Aan (belangrijk!)
5. **File size limit:** 10 MB
6. Klik op "Create bucket"

**Verifieer met script:**
```bash
npx tsx scripts/check-storage.ts
```

Zie `scripts/setup-storage.md` voor gedetailleerde instructies.

### 5. Development Server Starten

```bash
npm run dev
```

De applicatie draait dan op: http://localhost:3000

## Troubleshooting

### npm wordt niet herkend
- Zorg dat Node.js correct geïnstalleerd is
- Herstart je terminal/PowerShell na installatie
- Controleer of Node.js in je PATH staat

### Port 3000 al in gebruik
- Stop andere applicaties die poort 3000 gebruiken
- Of gebruik een andere poort: `npm run dev -- -p 3001`

### Supabase connectie fouten
- Controleer of `.env.local` correct is ingesteld
- Verifieer dat de Supabase project actief is
- Check of de API keys correct zijn

## Handige Commands

```bash
# Development server starten
npm run dev

# Production build maken
npm run build

# Production server starten
npm start

# Linting uitvoeren
npm run lint
```

## Volgende Stappen

Na installatie:
1. ✅ Dependencies geïnstalleerd
2. ✅ Environment variables ingesteld
3. ✅ Supabase Storage bucket aangemaakt
4. ✅ Development server gestart
5. Test de applicatie op http://localhost:3000
