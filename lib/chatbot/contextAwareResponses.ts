import { ConfiguratorState } from '@/lib/configurator/state'
import { PriceCalculationResult } from '@/lib/pricing/types'

/**
 * Genereer context-aware bot response op basis van gebruiker bericht en configuratie
 */
export function getBotResponse(
  userMessage: string,
  configuratie: ConfiguratorState | null,
  prijsResultaat: PriceCalculationResult | null
): string {
  const message = userMessage.toLowerCase()
  const isOnConfiguratorPage = typeof window !== 'undefined' && window.location.pathname === '/configurator'

  // Als gebruiker op configurator pagina is en configuratie heeft
  if (isOnConfiguratorPage && configuratie) {
    // Context-aware prijs vragen
    if (message.includes('prijs') || message.includes('kosten') || message.includes('prijzen') || message.includes('wat kost')) {
      if (prijsResultaat) {
        return `Op basis van uw huidige configuratie (${configuratie.type}, ${configuratie.aantalDeuren} deuren, ${configuratie.aantalRuimtes} ruimtes, ${configuratie.kleur}) kost dit: €${prijsResultaat.totaalPrijs.toFixed(2)}. Dit bestaat uit: €${prijsResultaat.subtotaalComponenten.toFixed(2)} voor componenten en €${prijsResultaat.subtotaalInstallatie.toFixed(2)} voor installatie (${prijsResultaat.installatieUren} uur).`
      } else {
        return `Ik bereken de prijs voor uw configuratie (${configuratie.type}, ${configuratie.aantalDeuren} deuren, ${configuratie.aantalRuimtes} ruimtes)... Gebruik de configurator om de exacte prijs te zien!`
      }
    }

    // Stap-specifieke hulp
    const stepHelp = getStepSpecificHelp(configuratie.currentStep, configuratie)
    if (stepHelp && message.includes(stepHelp.keyword)) {
      return stepHelp.response
    }

    // Waarschuwingen op basis van keuzes
    if (configuratie.aantalDeuren === 0 && configuratie.aantalRuimtes === 1 && message.includes('deur')) {
      return 'U heeft momenteel 0 deuren gekozen. Voor complete beveiliging raden we minimaal 1 deurcontact aan voor de voordeur. Dit zorgt ervoor dat u wordt gewaarschuwd wanneer iemand binnenkomt.'
    }

    if (configuratie.type === 'bedrijf' && configuratie.aantalDeuren < 2 && message.includes('deur')) {
      return 'Voor een bedrijf raden we minimaal 2 deurcontacten aan: één voor de hoofdingang en één voor de achterdeur. Dit zorgt voor betere beveiliging van uw bedrijfspand.'
    }

    if (configuratie.aantalRuimtes > 10 && message.includes('ruimte') || message.includes('sensor')) {
      return `U heeft ${configuratie.aantalRuimtes} ruimtes gekozen. Voor optimale dekking raden we aan om ook gangen en doorgangen te beveiligen met PIR sensoren. Dit zorgt ervoor dat beweging wordt gedetecteerd voordat iemand een ruimte binnenkomt.`
    }
  }

  // Configurator vragen
  if (message.includes('configurator') || message.includes('hoe werkt')) {
    if (isOnConfiguratorPage && configuratie) {
      return `U bent momenteel op stap ${configuratie.currentStep} van 6. De configurator helpt u stap voor stap om uw alarmsysteem samen te stellen. U kiest het type (woning of bedrijf), aantal deuren, aantal ruimtes, kleur en kunt optioneel een plattegrond uploaden. De prijs wordt direct berekend!`
    }
    return 'De configurator is een handige wizard die u in 6 stappen helpt om uw alarmsysteem samen te stellen. U kiest het type (woning of bedrijf), aantal deuren, aantal ruimtes, kleur en kunt optioneel een plattegrond uploaden. De prijs wordt direct berekend!'
  }

  // Prijs vragen (algemeen)
  if (message.includes('prijs') || message.includes('kosten') || message.includes('prijzen')) {
    return 'De prijs hangt af van uw configuratie. Een PIR sensor kost €59,95. De installatieprijs is €72 per uur. Voor een woning met 2 deuren en 7 ruimtes betaalt u ongeveer €1067. Gebruik onze configurator voor een exacte prijsberekening!'
  }

  // Afspraak vragen
  if (message.includes('afspraak') || message.includes('installatie') || message.includes('wanneer')) {
    return 'U kunt een afspraak maken via onze afspraakpagina. We zijn beschikbaar van maandag tot vrijdag tussen 09:00 en 17:00. U kunt direct online een tijdslot reserveren!'
  }

  // Contact vragen
  if (message.includes('contact') || message.includes('bellen') || message.includes('telefoon')) {
    return 'U kunt ons bereiken op 0573 - 21 51 00 of via email: info@demeestersintechniek.nl. We zijn bereikbaar van maandag tot vrijdag tussen 09:00 en 17:00.'
  }

  // Bestellen vragen
  if (message.includes('bestellen') || message.includes('kopen') || message.includes('huren')) {
    if (isOnConfiguratorPage && configuratie && configuratie.currentStep === 6) {
      return 'U kunt nu direct bestellen! Kies tussen kopen of huren via de knoppen onderaan de pagina. Vul uw gegevens in en wij nemen contact met u op om de bestelling te bevestigen.'
    }
    return 'U kunt uw alarmsysteem direct online bestellen via onze configurator. Na het samenstellen kunt u kiezen tussen kopen of huren. Vul uw gegevens in en wij nemen contact met u op!'
  }

  // Standaard antwoord met context
  if (isOnConfiguratorPage && configuratie) {
    return `Ik zie dat u bezig bent met het configureren van uw alarmsysteem (stap ${configuratie.currentStep}/6). Hoe kan ik u helpen? U kunt vragen stellen over de configurator, prijzen, of specifieke keuzes.`
  }

  return 'Bedankt voor uw vraag! Ik kan u helpen met vragen over onze configurator, prijzen, afspraken maken of contactgegevens. Wat wilt u weten? Of bel direct: 0573 - 21 51 00'
}

/**
 * Genereer quick replies op basis van huidige stap en configuratie
 */
export function getQuickRepliesForStep(
  step: number,
  configuratie: ConfiguratorState | null
): string[] {
  const isOnConfiguratorPage = typeof window !== 'undefined' && window.location.pathname === '/configurator'

  if (!isOnConfiguratorPage || !configuratie) {
    return [
      'Hoe werkt de configurator?',
      'Wat zijn de prijzen?',
      'Hoe maak ik een afspraak?',
      'Contact opnemen',
    ]
  }

  switch (step) {
    case 1:
      return [
        'Wat is het verschil tussen woning en bedrijf?',
        'Wat wordt er bij bedrijf toegevoegd?',
        'Kan ik later nog wijzigen?',
      ]
    case 2:
      return [
        'Hoeveel deuren heb ik nodig?',
        'Wat is een deurcontact?',
        configuratie.type === 'bedrijf' ? 'Hoeveel deuren voor bedrijf?' : 'Is 0 deuren mogelijk?',
      ]
    case 3:
      return [
        'Hoeveel sensoren heb ik nodig?',
        'Wat is een PIR sensor?',
        'Moet elke ruimte een sensor?',
      ]
    case 4:
      return [
        'Wat is het verschil tussen zwart en wit?',
        'Kan ik beide kleuren mixen?',
        'Kan ik later de kleur wijzigen?',
      ]
    case 5:
      return [
        'Is upload verplicht?',
        'Wat kan ik uploaden?',
        'Hoe groot mogen bestanden zijn?',
      ]
    case 6:
      return [
        'Wat kost dit?',
        'Hoe werkt bestellen?',
        'Wat is het verschil tussen kopen en huren?',
      ]
    default:
      return [
        'Hoe werkt de configurator?',
        'Wat zijn de prijzen?',
        'Hoe maak ik een afspraak?',
      ]
  }
}

/**
 * Genereer proactieve tip op basis van configuratie
 */
export function getProactiveTip(configuratie: ConfiguratorState | null): string | null {
  if (!configuratie) return null

  // Waarschuwing voor 0 deuren
  if (configuratie.aantalDeuren === 0 && configuratie.aantalRuimtes > 0) {
    return 'Tip: Voor complete beveiliging raden we minimaal 1 deurcontact aan voor de voordeur.'
  }

  // Tip voor bedrijf met weinig deuren
  if (configuratie.type === 'bedrijf' && configuratie.aantalDeuren < 2) {
    return 'Tip: Voor een bedrijf raden we minimaal 2 deurcontacten aan voor de hoofdingang en achterdeur.'
  }

  // Tip voor veel ruimtes
  if (configuratie.aantalRuimtes > 10) {
    return 'Tip: Voor optimale dekking met veel ruimtes, overweeg ook gangen te beveiligen.'
  }

  return null
}

/**
 * Genereer stap-specifieke hulp
 */
function getStepSpecificHelp(
  step: number,
  configuratie: ConfiguratorState
): { keyword: string; response: string } | null {
  switch (step) {
    case 1:
      if (configuratie.type === 'bedrijf') {
        return {
          keyword: 'bedrijf',
          response: 'Bij een bedrijf worden automatisch extra componenten toegevoegd: een alarmcentrale, flitser, sirene en bedienpaneel. Deze zijn essentieel voor een complete bedrijfsbeveiliging.',
        }
      }
      return {
        keyword: 'woning',
        response: 'Voor een woning kiest u zelf het aantal deuren en ruimtes. U krijgt alleen de componenten die u nodig heeft, zonder extra bedrijfscomponenten.',
      }
    case 2:
      return {
        keyword: 'deur',
        response: `Deurcontacten detecteren wanneer een deur wordt geopend. U heeft momenteel ${configuratie.aantalDeuren} deurcontacten gekozen. Voor een ${configuratie.type} raden we minimaal ${configuratie.type === 'bedrijf' ? '2' : '1'} deurcontact(en) aan.`,
      }
    case 3:
      return {
        keyword: 'ruimte',
        response: `PIR sensoren detecteren beweging in ruimtes. U heeft momenteel ${configuratie.aantalRuimtes} ruimte(s) gekozen. Elke ruimte krijgt één PIR sensor voor optimale beveiliging.`,
      }
    case 4:
      return {
        keyword: 'kleur',
        response: `U kunt kiezen tussen zwart of wit. Alle componenten krijgen dezelfde kleur voor een uniforme uitstraling. U heeft momenteel ${configuratie.kleur} gekozen.`,
      }
    case 5:
      return {
        keyword: 'upload',
        response: 'Het uploaden van een plattegrond is optioneel maar kan helpen bij het plannen van de installatie. U kunt een plattegrond of foto\'s van uw pand uploaden.',
      }
    case 6:
      return {
        keyword: 'bestel',
        response: 'Op deze stap ziet u een overzicht van uw configuratie en de totale prijs. U kunt kiezen tussen kopen of huren. Na het invullen van uw gegevens nemen wij contact met u op.',
      }
    default:
      return null
  }
}

/**
 * Genereer welkomstbericht op basis van context
 */
export function getWelcomeMessage(configuratie: ConfiguratorState | null): string {
  const isOnConfiguratorPage = typeof window !== 'undefined' && window.location.pathname === '/configurator'

  if (isOnConfiguratorPage && configuratie) {
    return `Hallo! Ik ben uw winkel maatje. Ik zie dat u bezig bent met het configureren van uw alarmsysteem (stap ${configuratie.currentStep}/6). Hoe kan ik u helpen?`
  }

  return 'Hallo! Ik ben de help assistent van AlarmWebshop. Hoe kan ik u helpen?'
}
