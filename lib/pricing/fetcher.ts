import { createClient as createServerClient } from '@/lib/supabase/server'
import { ProductPrices } from './types'
import { productPricesCache } from './cache'

const CACHE_KEY = 'product_prices'

/**
 * Haal alle product prijzen op uit database (server-side)
 * Gebruikt caching om database queries te verminderen
 */
export async function fetchProductPrices(useCache: boolean = true): Promise<ProductPrices> {
  // Check cache eerst
  if (useCache) {
    const cached = productPricesCache.get(CACHE_KEY)
    if (cached) {
      return cached as ProductPrices
    }
  }

  const supabase = await createServerClient()
  const { data: products, error } = await supabase
    .from('products')
    .select('type, prijs')
    .eq('beschikbaar', true)

  if (error) {
    throw new Error(`Fout bij ophalen producten: ${error.message}`)
  }

  // Haal uurprijs op
  const { data: settings, error: settingsError } = await supabase
    .from('settings')
    .select('value')
    .eq('key', 'uurprijs')
    .single()

  if (settingsError) {
    throw new Error(`Fout bij ophalen uurprijs: ${settingsError.message}`)
  }

  if (!settings || !settings.value) {
    throw new Error('Uurprijs instelling niet gevonden in database')
  }

  // Converteer settings.value naar number (kan string of number zijn)
  const uurprijs = typeof settings.value === 'string' 
    ? parseFloat(settings.value) 
    : Number(settings.value)

  if (isNaN(uurprijs)) {
    throw new Error(`Ongeldige uurprijs waarde: ${settings.value}`)
  }

  // Converteer producten array naar ProductPrices object
  const prices: Partial<ProductPrices> = {}
  
  products.forEach((product: { type: string; prijs: number }) => {
    switch (product.type) {
      case 'pir_sensor':
        prices.pirSensor = product.prijs
        break
      case 'deurcontact':
        prices.deurcontact = product.prijs
        break
      case 'alarmcentrale':
        prices.alarmcentrale = product.prijs
        break
      case 'bedienpaneel':
        prices.bedienpaneel = product.prijs
        break
      case 'flitser':
        prices.flitser = product.prijs
        break
      case 'sirene':
        prices.sirene = product.prijs
        break
    }
  })

  // Voeg uurprijs toe aan prices object voor validatie
  prices.uurprijs = uurprijs

  // Valideer dat alle prijzen aanwezig zijn
  const requiredPrices: (keyof ProductPrices)[] = [
    'pirSensor',
    'deurcontact',
    'alarmcentrale',
    'bedienpaneel',
    'flitser',
    'sirene',
    'uurprijs',
  ]

  const missingPrices = requiredPrices.filter(key => prices[key] === undefined)
  if (missingPrices.length > 0) {
    throw new Error(`Ontbrekende prijzen: ${missingPrices.join(', ')}`)
  }

  const result: ProductPrices = {
    pirSensor: prices.pirSensor!,
    deurcontact: prices.deurcontact!,
    alarmcentrale: prices.alarmcentrale!,
    bedienpaneel: prices.bedienpaneel!,
    flitser: prices.flitser!,
    sirene: prices.sirene!,
    uurprijs: uurprijs,
  }

  // Cache het resultaat
  if (useCache) {
    productPricesCache.set(CACHE_KEY, result)
  }

  return result
}
