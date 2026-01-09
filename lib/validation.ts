import { ConfigurationInput } from '@/lib/pricing/types'

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export function validateConfiguration(
  configuratie: ConfigurationInput
): ValidationResult {
  const errors: string[] = []
  
  // Type validatie
  if (!['woning', 'bedrijf'].includes(configuratie.type)) {
    errors.push('Type moet "woning" of "bedrijf" zijn')
  }
  
  // Aantal deuren validatie
  if (configuratie.aantalDeuren < 0) {
    errors.push('Aantal deuren kan niet negatief zijn')
  }
  if (configuratie.aantalDeuren > 100) {
    errors.push('Aantal deuren kan maximaal 100 zijn')
  }
  if (!Number.isInteger(configuratie.aantalDeuren)) {
    errors.push('Aantal deuren moet een geheel getal zijn')
  }
  
  // Aantal ruimtes validatie
  if (configuratie.aantalRuimtes < 1) {
    errors.push('Aantal ruimtes moet minimaal 1 zijn')
  }
  if (configuratie.aantalRuimtes > 50) {
    errors.push('Aantal ruimtes kan maximaal 50 zijn')
  }
  if (!Number.isInteger(configuratie.aantalRuimtes)) {
    errors.push('Aantal ruimtes moet een geheel getal zijn')
  }
  
  // Kleur validatie
  if (!['zwart', 'wit'].includes(configuratie.kleur)) {
    errors.push('Kleur moet "zwart" of "wit" zijn')
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  }
}
