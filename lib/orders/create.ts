import { createClient } from '@/lib/supabase/server'
import { ConfigurationInput } from '@/lib/pricing/types'
import { berekenPrijs } from '@/lib/pricing/calculator'
import { fetchProductPrices } from '@/lib/pricing/fetcher'

interface CustomerData {
  naam: string
  email: string
  telefoon?: string
  adres: string
  postcode: string
  stad: string
}

interface CreateOrderParams {
  configuratie: ConfigurationInput & {
    plattegrondUrl?: string
    afbeeldingenUrls?: string[]
  }
  customer: CustomerData
  type: 'kopen' | 'huren'
}

export async function createOrder({ configuratie, customer, type }: CreateOrderParams) {
  try {
    const supabase = await createClient()
    
    // Haal prijzen op en bereken totaal
    const prijzen = await fetchProductPrices()
    const prijsResultaat = berekenPrijs(configuratie, prijzen)

    // Maak customer aan of haal bestaande op
    let customerId: string
    
    const { data: existingCustomer } = await supabase
      .from('customers')
      .select('id')
      .eq('email', customer.email)
      .single()

    if (existingCustomer) {
      customerId = existingCustomer.id
      // Update customer gegevens
      await supabase
        .from('customers')
        .update({
          naam: customer.naam,
          telefoon: customer.telefoon,
          adres: customer.adres,
          postcode: customer.postcode,
          stad: customer.stad,
          updated_at: new Date().toISOString(),
        })
        .eq('id', customerId)
    } else {
      // Maak nieuwe customer
      const { data: newCustomer, error: customerError } = await supabase
        .from('customers')
        .insert({
          naam: customer.naam,
          email: customer.email,
          telefoon: customer.telefoon,
          adres: customer.adres,
          postcode: customer.postcode,
          stad: customer.stad,
        })
        .select('id')
        .single()

      if (customerError) throw customerError
      customerId = newCustomer.id
    }

    // Sla configuratie op
    const { data: configurationData, error: configError } = await supabase
      .from('configurations')
      .insert({
        type: configuratie.type,
        aantal_deuren: configuratie.aantalDeuren,
        aantal_ruimtes: configuratie.aantalRuimtes,
        kleur: configuratie.kleur,
        plattegrond_url: configuratie.plattegrondUrl,
        afbeeldingen_urls: configuratie.afbeeldingenUrls,
        totaal_prijs: prijsResultaat.totaalPrijs,
        installatie_uren: prijsResultaat.installatieUren,
        installatie_kosten: prijsResultaat.subtotaalInstallatie,
      })
      .select('id')
      .single()

    if (configError) throw configError

    // Genereer ordernummer
    const year = new Date().getFullYear()
    const { count } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .like('ordernummer', `ORD-${year}-%`)
    
    const orderNumber = `ORD-${year}-${String((count || 0) + 1).padStart(6, '0')}`

    // Maak order aan
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        configuration_id: configurationData.id,
        customer_id: customerId,
        type,
        totaal_prijs: prijsResultaat.totaalPrijs,
        status: 'pending',
        ordernummer: orderNumber,
      })
      .select('id, ordernummer')
      .single()

    if (orderError) throw orderError

    return {
      success: true,
      orderId: orderData.id,
      ordernummer: orderData.ordernummer,
    }
  } catch (error) {
    console.error('Fout bij aanmaken order:', error)
    throw error
  }
}
