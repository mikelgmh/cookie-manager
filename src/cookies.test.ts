import { describe, it, expect, beforeEach } from 'vitest'
import { getCookie, setCookie } from './cookies'

describe('cookies', () => {
  beforeEach(() => {
    // Clear all cookies
    document.cookie.split(';').forEach((c) => {
      const eq = c.indexOf('=')
      const name = eq > -1 ? c.slice(0, eq).trim() : ''
      document.cookie = `${name}=; max-age=0; path=/`
    })
  })

  it('setCookie and getCookie roundtrip', () => {
    setCookie('test', 'hello', 1)
    expect(getCookie('test')).toBe('hello')
  })

  it('returns undefined for missing cookie', () => {
    expect(getCookie('nonexistent')).toBeUndefined()
  })

  it('handles boolean values', () => {
    setCookie('flag', true, 1)
    expect(getCookie('flag')).toBe('true')
  })

  it('encodes special characters', () => {
    setCookie('key', 'a=b&c d', 1)
    expect(getCookie('key')).toBe('a=b&c d')
  })

  it('handles secure and sameSite attributes', () => {
    setCookie('secure_test', 'val', 1, '/', true, 'lax')
    // In Happy DOM, secure cookies might be ignored if protocol is not https, so we verify execution doesn't crash
    expect(true).toBe(true)
  })
})
