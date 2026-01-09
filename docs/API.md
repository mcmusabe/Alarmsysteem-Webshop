# API Documentatie

## Overzicht

De API gebruikt Next.js API Routes en communiceert met Supabase voor data opslag.

## Base URL

Development: `http://localhost:3000/api`
Production: `https://your-domain.com/api`

## Endpoints

### Prijzen

#### GET /api/prices

Haal alle product prijzen op uit de database.

**Response:**
```json
{
  "success": true,
  "data": {
    "pirSensor": 59.95,
    "deurcontact": 0.00,
    "alarmcentrale": 0.00,
    "bedienpaneel": 0.00,
    "flitser": 0.00,
    "sirene": 0.00,
    "uurprijs": 72.00
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Fout bij ophalen producten: ..."
}
```

---

### Prijsberekening

#### POST /api/calculate-price

Bereken de totale prijs op basis van een configuratie.

**Request Body:**
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
    "componenten": {
      "deurcontacten": 2,
      "pirSensoren": 7,
      "alarmcentrale": 0,
      "flitser": 0,
      "sirene": 0,
      "bedienpaneel": 0
    },
    "installatieUren": 9,
    "installatieKosten": 648.00,
    "subtotaalComponenten": 469.65,
    "subtotaalInstallatie": 648.00,
    "prijsDetails": {
      "deurcontactenPrijs": 0.00,
      "pirSensorenPrijs": 419.65,
      "bedrijfComponentenPrijs": 0.00
    }
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "Ongeldige configuratie",
  "details": ["Aantal ruimtes moet minimaal 1 zijn"]
}
```

---

### Bestellingen

#### POST /api/orders

Maak een nieuwe bestelling aan.

**Request Body:**
```json
{
  "configuratie": {
    "type": "woning",
    "aantalDeuren": 2,
    "aantalRuimtes": 7,
    "kleur": "wit",
    "plattegrondUrl": "https://...",
    "afbeeldingenUrls": []
  },
  "customer": {
    "naam": "Jan Jansen",
    "email": "jan@example.com",
    "telefoon": "0612345678",
    "adres": "Straat 123",
    "postcode": "1234AB",
    "stad": "Amsterdam"
  },
  "type": "kopen"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "ordernummer": "ORD-2024-000001",
    "orderId": "uuid"
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Fout bij aanmaken order: ..."
}
```

---

### Klanten

#### POST /api/customers

Maak een nieuwe klant aan of haal bestaande klant op.

**Request Body:**
```json
{
  "naam": "Jan Jansen",
  "email": "jan@example.com",
  "telefoon": "0612345678"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid"
  }
}
```

---

### Afspraken

#### GET /api/appointments/available

Haal beschikbare tijdslots op voor een specifieke datum.

**Query Parameters:**
- `datum` (required): Datum in YYYY-MM-DD formaat

**Example:**
```
GET /api/appointments/available?datum=2024-01-15
```

**Response:**
```json
{
  "success": true,
  "data": {
    "datum": "2024-01-15",
    "beschikbareTijden": [
      "09:00",
      "10:00",
      "11:00",
      "14:00",
      "15:00"
    ]
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Datum parameter is verplicht"
}
```

---

#### POST /api/appointments

Maak een nieuwe afspraak aan.

**Request Body:**
```json
{
  "customerId": "uuid",
  "orderId": "uuid",
  "datum": "2024-01-15",
  "tijd": "10:00",
  "type": "installatie",
  "opmerkingen": "Graag 's ochtends"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "datum": "2024-01-15",
    "tijd": "10:00"
  }
}
```

**Error Response (409):**
```json
{
  "success": false,
  "error": "Dit tijdslot is al geboekt"
}
```

---

## Error Handling

Alle endpoints retourneren een consistente error response:

```json
{
  "success": false,
  "error": "Error message"
}
```

HTTP Status Codes:
- `200` - Success
- `400` - Bad Request (validatie fout)
- `409` - Conflict (bijv. dubbele afspraak)
- `500` - Internal Server Error

## Validatie

### Configuratie Validatie

- `type`: Moet "woning" of "bedrijf" zijn
- `aantalDeuren`: Moet tussen 0 en 100 zijn (integer)
- `aantalRuimtes`: Moet tussen 1 en 50 zijn (integer)
- `kleur`: Moet "zwart" of "wit" zijn

### Customer Validatie

- `naam`: Minimaal 2 karakters
- `email`: Geldig email formaat
- `postcode`: Nederlands postcode formaat (1234AB)

### Afspraak Validatie

- `datum`: Geldige datum in YYYY-MM-DD formaat
- `tijd`: Geldige tijd in HH:MM formaat
- `type`: Moet "installatie" of "advies" zijn

## Rate Limiting

Momenteel geen rate limiting geïmplementeerd. Overweeg dit toe te voegen voor productie.

## Authentication

Momenteel geen authenticatie vereist. Overweeg dit toe te voegen voor productie, vooral voor admin endpoints.
