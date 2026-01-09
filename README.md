# AlarmWebshop

Een moderne webshop voor het configureren en bestellen van alarmsystemen.

## Features

- **Configurator Wizard**: Stap-voor-stap wizard om alarmsysteem samen te stellen
- **Real-time Prijsberekening**: Automatische prijsberekening op basis van configuratie
- **Bestellen**: Bestel functionaliteit voor kopen of huren
- **Afspraken**: Kalender systeem voor het inplannen van installatie afspraken
- **Mobiel-vriendelijk**: Volledig responsive design voor alle apparaten
- **Flexibel Prijs Systeem**: Database-gebaseerd prijs systeem, klaar voor externe koppeling

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Backend/Database**: Supabase (PostgreSQL)
- **Formulieren**: React Hook Form + Zod
- **State Management**: Zustand

## Project Setup

### Vereisten

- Node.js 18+ 
- npm of yarn
- Supabase account

### Installatie

1. Clone het project:
```bash
git clone <repository-url>
cd alarmsyst
```

2. Installeer dependencies:
```bash
npm install
```

3. Maak een `.env.local` bestand aan:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start de development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in je browser.

## Database Setup

Het project gebruikt Supabase voor de database. De volgende tabellen zijn nodig:

- `products` - Product prijzen
- `settings` - Configuratie instellingen (uurprijs)
- `configurations` - Opgeslagen configuraties
- `customers` - Klant gegevens
- `orders` - Bestellingen
- `appointments` - Afspraken

Zie `docs/PROJECT_DOCUMENTATIE.md` voor het volledige database schema.

## Project Structuur

```
alarmsyst/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── configurator/      # Configurator wizard
│   ├── bestellen/         # Bestel pagina's
│   └── afspraak/          # Afspraak pagina's
├── components/            # React componenten
│   ├── ui/               # Basis UI componenten
│   ├── Configurator/     # Wizard componenten
│   ├── PriceCalculator/   # Prijs componenten
│   ├── Order/            # Bestel componenten
│   └── Appointment/      # Afspraak componenten
├── lib/                  # Utility functies
│   ├── pricing/          # Prijsberekening logica
│   ├── supabase/         # Supabase clients
│   └── validation.ts     # Validatie logica
└── hooks/                # Custom React hooks
```

## API Endpoints

### GET /api/prices
Haal alle product prijzen op.

**Response:**
```json
{
  "success": true,
  "data": {
    "pirSensor": 59.95,
    "deurcontact": 0,
    "alarmcentrale": 0,
    "bedienpaneel": 0,
    "flitser": 0,
    "sirene": 0,
    "uurprijs": 72.00
  }
}
```

### POST /api/calculate-price
Bereken prijs op basis van configuratie.

**Request:**
```json
{
  "type": "woning",
  "aantalDeuren": 2,
  "aantalRuimtes": 7,
  "kleur": "wit"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totaalPrijs": 1117.65,
    "componenten": {...},
    "installatieUren": 9,
    "installatieKosten": 648.00,
    ...
  }
}
```

### POST /api/orders
Maak nieuwe bestelling.

**Request:**
```json
{
  "configuratie": {...},
  "customer": {
    "naam": "Jan Jansen",
    "email": "jan@example.com",
    ...
  },
  "type": "kopen"
}
```

### GET /api/appointments/available?datum=2024-01-15
Haal beschikbare tijdslots op voor een datum.

### POST /api/appointments
Maak nieuwe afspraak.

Zie `docs/API.md` voor volledige API documentatie.

## Configurator Wizard

De wizard bestaat uit 6 stappen:

1. **Type Selectie**: Woning of Bedrijf
2. **Aantal Deuren**: 0-100 deuren
3. **Aantal Ruimtes**: 1-50 ruimtes
4. **Kleur**: Zwart of Wit
5. **Upload** (Optioneel): Plattegrond en afbeeldingen
6. **Overzicht**: Configuratie samenvatting en prijs

## Prijsberekening

De prijsberekening werkt als volgt:

**Voor Woning:**
- Componenten: (aantal_deuren × deurcontact_prijs) + (aantal_ruimtes × PIR_sensor_prijs)
- Installatie: (aantal_deuren + aantal_ruimtes) × 1 uur × uurprijs

**Voor Bedrijf:**
- Componenten: alarmcentrale + flitser + sirene + bedienpaneel + (aantal_deuren × deurcontact_prijs) + (aantal_ruimtes × PIR_sensor_prijs)
- Installatie: ((aantal_deuren + aantal_ruimtes + 4) × 1 uur + 1 uur) × uurprijs

## Mobiele Optimalisatie

- Responsive design met mobile-first approach
- Touch-vriendelijke elementen (minimaal 44x44px)
- Hamburger menu voor navigatie
- Sticky prijs display op mobiel
- Stap-voor-stap wizard zonder sidebar op mobiel

## Development

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build voor productie
- `npm run start` - Start productie server
- `npm run lint` - Run ESLint

### Code Style

Het project gebruikt:
- TypeScript voor type safety
- ESLint voor code kwaliteit
- Prettier voor code formatting (aanbevolen)

## Deployment

### Railway (Aanbevolen)

Het project is geconfigureerd voor deployment naar Railway. Zie [docs/RAILWAY_DEPLOYMENT.md](docs/RAILWAY_DEPLOYMENT.md) voor een complete deployment guide.

**Quick Start:**
1. Maak een Railway account op [railway.app](https://railway.app)
2. Maak een nieuw project en verbind je GitHub repository
3. Stel environment variables in:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NODE_ENV=production`
4. Railway deployt automatisch!

### Andere Platforms

Het project kan ook worden gedeployed naar:
- **Vercel** (aanbevolen voor Next.js)
- **Netlify**
- **AWS Amplify**
- Andere platforms die Next.js ondersteunen

Zorg ervoor dat de environment variables correct zijn ingesteld in je deployment platform.

### Production Checklist

Zie [docs/PRODUCTION_CHECKLIST.md](docs/PRODUCTION_CHECKLIST.md) voor een complete checklist voordat je naar productie deployt.

## Licentie

Copyright © 2026 AlarmWebshop

## Contact

- Website: https://www.demeestersintechniek.nl/
- Email: info@demeestersintechniek.nl
- Telefoon: 0573 - 21 51 00
