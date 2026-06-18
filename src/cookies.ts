import type { CookieCategory } from './types'

export function setCookie(
  name: string,
  value: string | number | boolean,
  days: number,
  path = '/',
  secure?: boolean,
  sameSite?: 'lax' | 'strict' | 'none',
  domain?: string,
): void {
  try {
    const maxAge = Math.round(days) * 86400
    let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(String(value))}; max-age=${maxAge}; path=${path}`
    if (domain) {
      cookieStr += `; domain=${domain}`
    }
    if (sameSite) {
      cookieStr += `; samesite=${sameSite}`
    }
    if (secure) {
      cookieStr += '; secure'
    }
    document.cookie = cookieStr
  } catch (error) {
    console.error(`Error setting cookie: ${error}`)
  }
}

export function getCookie(name: string): string | undefined {
  const pairs = document.cookie.split(';').map((s) => s.trim())
  for (const pair of pairs) {
    const eq = pair.indexOf('=')
    if (eq === -1) continue
    const key = pair.slice(0, eq).trim()
    if (key === name) {
      return decodeURIComponent(pair.slice(eq + 1).trim())
    }
  }
  return undefined
}

export function setCookiesForCategories(
  categories: CookieCategory[],
  rejectedExpirationDays: number,
): void {
  for (const category of categories) {
    for (const cookie of category.events.setCookiesOnChange) {
      const value = category.checked ? cookie.valueOnAccept : cookie.valueOnReject
      const days =
        !category.checked && rejectedExpirationDays !== -1
          ? rejectedExpirationDays
          : cookie.expirationDays
      setCookie(
        cookie.cookieName,
        value,
        days,
        '/',
        cookie.secure,
        cookie.sameSite,
        cookie.domain,
      )
    }
  }
}
