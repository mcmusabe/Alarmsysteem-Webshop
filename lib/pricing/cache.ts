/**
 * Simple in-memory cache voor product prijzen
 * Gebruikt om database queries te verminderen
 */

interface CacheEntry<T> {
  data: T
  timestamp: number
}

class SimpleCache<T> {
  private cache: Map<string, CacheEntry<T>> = new Map()
  private ttl: number

  constructor(ttlMs: number = 5 * 60 * 1000) {
    this.ttl = ttlMs
  }

  get(key: string): T | null {
    const entry = this.cache.get(key)
    if (!entry) return null

    const now = Date.now()
    if (now - entry.timestamp > this.ttl) {
      this.cache.delete(key)
      return null
    }

    return entry.data
  }

  set(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    })
  }

  clear(): void {
    this.cache.clear()
  }

  has(key: string): boolean {
    const entry = this.cache.get(key)
    if (!entry) return false

    const now = Date.now()
    if (now - entry.timestamp > this.ttl) {
      this.cache.delete(key)
      return false
    }

    return true
  }
}

// Export singleton instance voor product prijzen
export const productPricesCache = new SimpleCache<any>(5 * 60 * 1000) // 5 minuten
