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
  
  // Extra uur voor alarmcentrale (altijd nodig)
  const urenCentrale = 1
  
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
  
  // Basis componenten (zowel woning als bedrijf hebben deze nodig)
  const basisComponentenPrijs = 
    prijzen.alarmcentrale +
    prijzen.flitser +
    prijzen.sirene +
    prijzen.bedienpaneel
  totaalPrijs += basisComponentenPrijs
  totaalComponenten += 4
  
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
      alarmcentrale: 1, // Altijd nodig voor zowel woning als bedrijf
      flitser: 1, // Altijd nodig voor zowel woning als bedrijf
      sirene: 1, // Altijd nodig voor zowel woning als bedrijf
      bedienpaneel: 1, // Altijd nodig voor zowel woning als bedrijf
    },
    installatieUren,
    installatieKosten: Math.round(installatieKosten * 100) / 100,
    subtotaalComponenten: Math.round((totaalPrijs - installatieKosten) * 100) / 100,
    subtotaalInstallatie: Math.round(installatieKosten * 100) / 100,
    prijsDetails: {
      deurcontactenPrijs: Math.round(deurcontactenPrijs * 100) / 100,
      pirSensorenPrijs: Math.round(pirSensorenPrijs * 100) / 100,
      basisComponentenPrijs: Math.round(basisComponentenPrijs * 100) / 100,
    },
  }
}
