# Google OAuth Setup Instructies

Om Google login te activeren, moet je Google OAuth credentials configureren in zowel Google Cloud Console als Supabase.

## Stap 1: Google Cloud Console Setup

1. **Ga naar Google Cloud Console:**
   - https://console.cloud.google.com/

2. **Maak een nieuw project aan** (of gebruik bestaand project)

3. **Enable Google+ API:**
   - Ga naar "APIs & Services" > "Library"
   - Zoek naar "Google+ API" en enable deze

4. **Maak OAuth 2.0 Credentials:**
   - Ga naar "APIs & Services" > "Credentials"
   - Klik op "Create Credentials" > "OAuth client ID"
   - Kies "Web application"
   - **Authorized JavaScript origins:**
     - `http://localhost:3000` (voor development)
     - `https://jouw-domein.nl` (voor productie)
   - **Authorized redirect URIs:**
     - `https://kvcfjultqlxftokyxztj.supabase.co/auth/v1/callback`
     - `http://localhost:3000/auth/callback` (voor development)
   - Klik "Create"
   - **Kopieer de Client ID en Client Secret**

## Stap 2: Supabase Dashboard Setup

1. **Ga naar Supabase Dashboard:**
   - https://supabase.com/dashboard/project/kvcfjultqlxftokyxztj/auth/providers

2. **Enable Google Provider:**
   - Scroll naar "Google" in de providers lijst
   - Zet "Google Enabled" aan
   - Plak je **Client ID** (van Google Cloud Console)
   - Plak je **Client Secret** (van Google Cloud Console)
   - Klik "Save"

3. **Configureer Redirect URLs:**
   - Ga naar Authentication > URL Configuration
   - Voeg toe aan "Redirect URLs":
     - `http://localhost:3000/auth/callback`
     - `https://jouw-domein.nl/auth/callback` (voor productie)

## Stap 3: Testen

1. Start je development server: `npm run dev`
2. Ga naar: http://localhost:3000/login
3. Klik op "Inloggen met Google"
4. Je zou naar Google moeten worden doorgestuurd
5. Na inloggen kom je terug op je dashboard

## Troubleshooting

### "Redirect URI mismatch" error
- Controleer of de redirect URI exact overeenkomt in Google Cloud Console
- Zorg dat zowel `http://localhost:3000/auth/callback` als de Supabase callback URL zijn toegevoegd

### "Invalid client" error
- Controleer of Client ID en Secret correct zijn gekopieerd
- Zorg dat Google+ API is enabled

### Session niet persistent
- Controleer of middleware.ts correct is geconfigureerd
- Zorg dat cookies correct worden opgeslagen

## Belangrijke URLs

- **Supabase Auth Callback:** `https://kvcfjultqlxftokyxztj.supabase.co/auth/v1/callback`
- **Local Development:** `http://localhost:3000/auth/callback`
- **Google Cloud Console:** https://console.cloud.google.com/
- **Supabase Auth Settings:** https://supabase.com/dashboard/project/kvcfjultqlxftokyxztj/auth/providers
