export interface ConfigurationInput {
  type: 'woning' | 'bedrijf'
  aantalDeuren: number
  aantalRuimtes: number
  kleur: 'zwart' | 'wit'
}

export interface ProductPrices {
  pirSensor: number
  deurcontact: number
  alarmcentrale: number
  bedienpaneel: number
  flitser: number
  sirene: number
  uurprijs: number
}

export interface PriceCalculationResult {
  totaalPrijs: number
  componenten: {
    deurcontacten: number
    pirSensoren: number
    alarmcentrale: number
    flitser: number
    sirene: number
    bedienpaneel: number
  }
  installatieUren: number
  installatieKosten: number
  subtotaalComponenten: number
  subtotaalInstallatie: number
  prijsDetails: {
    deurcontactenPrijs: number
    pirSensorenPrijs: number
    bedrijfComponentenPrijs: number
  }
}
