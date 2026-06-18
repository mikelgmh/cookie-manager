import { encode, decode } from './utils'
import type { CookieCategory } from './types'

const STORAGE_KEY = 'cookiesManagerOptions'

export function saveCategories(categories: CookieCategory[]): void {
  const encoded = encode(JSON.stringify(categories))
  localStorage.setItem(STORAGE_KEY, encoded)
}

export function loadCategories(): CookieCategory[] | null {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(decode(raw))
  } catch {
    return null
  }
}

export function clearSaved(): void {
  localStorage.removeItem(STORAGE_KEY)
}

export function hasSaved(): boolean {
  return localStorage.getItem(STORAGE_KEY) !== null
}
