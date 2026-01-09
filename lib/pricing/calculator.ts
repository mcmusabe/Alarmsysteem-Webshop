import { ConfigurationInput, ProductPrices, PriceCalculationResult } from './types'

/**
 * Bereken installatie uren op basis van configuratie
 */
export function berekenInstallatieUren(
  configuratie: ConfigurationInput,
  totaalComponenten: number
): number {
  // 1 uur per component
  const urenPerComponent = totaalComponenten * 1
  
  // Extra uur voor alarmcentrale (alleen bij bedrijf)
  const urenCentrale = configuratie.type === 'bedrijf' ? 1 : 0
  
  return urenPerComponent + urenCentrale
}

/**
 * Hoofdfunctie voor prijsberekening
 */
export function berekenPrijs(
  configuratie: ConfigurationInput,
  prijzen: ProductPrices
): PriceCalculationResult {
  let totaalPrijs = 0
  let totaalComponenten = 0
  
  // Componenten voor bedrijf
  let bedrijfComponentenPrijs = 0
  if (configuratie.type === 'bedrijf') {
    bedrijfComponentenPrijs = 
      prijzen.alarmcentrale +
      prijzen.flitser +
      prijzen.sirene +
      prijzen.bedienpaneel
    totaalPrijs += bedrijfComponentenPrijs
    totaalComponenten += 4
  }
  
  // Deurcontacten
  const deurcontactenPrijs = configuratie.aantalDeuren * prijzen.deurcontact
  totaalPrijs += deurcontactenPrijs
  totaalComponenten += configuratie.aantalDeuren
  
  // PIR sensoren
  const pirSensorenPrijs = configuratie.aantalRuimtes * prijzen.pirSensor
  totaalPrijs += pirSensorenPrijs
  totaalComponenten += configuratie.aantalRuimtes
  
  // Installatie uren berekenen
  const installatieUren = berekenInstallatieUren(configuratie, totaalComponenten)
  const installatieKosten = installatieUren * prijzen.uurprijs
  totaalPrijs += installatieKosten
  
  return {
    totaalPrijs: Math.round(totaalPrijs * 100) / 100, // Afronden op 2 decimalen
    componenten: {
      deurcontacten: configuratie.aantalDeuren,
      pirSensoren: configuratie.aantalRuimtes,
      alarmcentrale: configuratie.type === 'bedrijf' ? 1 : 0,
      flitser: configuratie.type === 'bedrijf' ? 1 : 0,
      sirene: configuratie.type === 'bedrijf' ? 1 : 0,
      bedienpaneel: configuratie.type === 'bedrijf' ? 1 : 0,
    },
    installatieUren,
    installatieKosten: Math.round(installatieKosten * 100) / 100,
    subtotaalComponenten: Math.round((totaalPrijs - installatieKosten) * 100) / 100,
    subtotaalInstallatie: Math.round(installatieKosten * 100) / 100,
    prijsDetails: {
      deurcontactenPrijs: Math.round(deurcontactenPrijs * 100) / 100,
      pirSensorenPrijs: Math.round(pirSensorenPrijs * 100) / 100,
      bedrijfComponentenPrijs: Math.round(bedrijfComponentenPrijs * 100) / 100,
    },
  }
}
