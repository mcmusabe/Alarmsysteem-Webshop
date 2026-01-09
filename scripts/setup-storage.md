# Storage Bucket Setup

## Storage Bucket Aanmaken via Supabase Dashboard

1. **Ga naar Supabase Dashboard:**
   - https://supabase.com/dashboard
   - Login met je account

2. **Selecteer Project:**
   - Kies project: `alarmsysteem-webshop`

3. **Ga naar Storage:**
   - Klik op "Storage" in de linker sidebar
   - Of ga direct naar: https://supabase.com/dashboard/project/kvcfjultqlxftokyxztj/storage/buckets

4. **Maak Bucket Aan:**
   - Klik op "New bucket"
   - **Naam:** `uploads`
   - **Public bucket:** ✅ Aan (zet dit aan zodat bestanden publiek toegankelijk zijn)
   - **File size limit:** 10 MB (of hoger als je grotere bestanden wilt)
   - **Allowed MIME types:** (optioneel) `image/jpeg,image/png,application/pdf`
   - Klik op "Create bucket"

5. **Verifieer:**
   - Je zou nu een bucket genaamd `uploads` moeten zien in de lijst

## Storage Policies Instellen (Optioneel maar Aanbevolen)

Voor extra beveiliging kun je RLS (Row Level Security) policies instellen:

1. Ga naar Storage → `uploads` bucket → Policies
2. Voeg een policy toe voor uploads:
   - Policy name: `Allow authenticated uploads`
   - Allowed operation: `INSERT`
   - Policy definition: `true` (of specifiekere regels)

Voor nu werkt het ook zonder policies als de bucket public is.

## Testen

Zodra de bucket aangemaakt is, kun je testen door:
1. De applicatie te starten: `npm run dev`
2. Naar de configurator te gaan
3. Stap 5 (Upload) te proberen

Als alles goed is ingesteld, zou je bestanden moeten kunnen uploaden zonder errors.
