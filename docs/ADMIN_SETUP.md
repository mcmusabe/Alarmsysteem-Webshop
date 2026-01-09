# Admin Account Setup

## Service Role Key Ophalen

Om een admin account aan te maken, heb je de Supabase Service Role Key nodig:

1. Ga naar je Supabase Dashboard: https://supabase.com/dashboard
2. Selecteer je project
3. Ga naar **Settings** → **API**
4. Kopieer de **service_role** key (NIET de anon key!)
5. Voeg deze toe aan je `.env.local` bestand:

```env
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

⚠️ **BELANGRIJK**: De service_role key heeft volledige toegang tot je database. Deel deze NOOIT publiekelijk!

## Admin Account Aanmaken

Voer het volgende commando uit:

```bash
npm run create-admin
```

Dit maakt een admin account aan met:
- **Email**: `admin@alarmwebshop.nl`
- **Wachtwoord**: `Admin123!`

## Admin Account Gebruiken

1. Ga naar: http://localhost:3000/login
2. Log in met de admin credentials
3. Je wordt automatisch doorgestuurd naar het admin panel

## Admin Rol Toewijzen aan Bestaande Gebruiker

Als je een bestaande gebruiker admin rechten wilt geven:

1. Ga naar Supabase Dashboard → **Authentication** → **Users**
2. Zoek de gebruiker
3. Klik op de gebruiker
4. Scroll naar **User Metadata**
5. Voeg toe:
   ```json
   {
     "role": "admin"
   }
   ```
6. Klik op **Save**

## Admin Rol Verwijderen

Om admin rechten te verwijderen:

1. Ga naar Supabase Dashboard → **Authentication** → **Users**
2. Zoek de gebruiker
3. Verwijder `"role": "admin"` uit de User Metadata
4. Of verander naar `"role": "user"`
