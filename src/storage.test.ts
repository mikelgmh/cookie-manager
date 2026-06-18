import { describe, it, expect, beforeEach } from 'vitest'
import { saveCategories, loadCategories, clearSaved, hasSaved } from './storage'
import type { CookieCategory } from './types'

const mockCategories: CookieCategory[] = [
  {
    id: 'analytics',
    title: 'Analytics',
    description: 'desc',
    required: false,
    checked: true,
    boxedHeader: false,
    boxedBody: false,
    accordion: { enable: false, enableOnDescriptionLength: 45, active: false },
    events: { onAccept: () => {}, onReject: () => {}, setCookiesOnChange: [] },
    scripts: [],
  },
]

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('saves and loads categories (data-only, no functions)', () => {
    saveCategories(mockCategories)
    const loaded = loadCategories()!
    expect(loaded).toHaveLength(1)
    expect(loaded[0].id).toBe('analytics')
    expect(loaded[0].checked).toBe(true)
    expect(loaded[0].title).toBe('Analytics')
    expect(loaded[0].events.setCookiesOnChange).toEqual([])
    // functions are stripped by JSON serialization
    expect(hasSaved()).toBe(true)
  })

  it('returns null when nothing saved', () => {
    expect(loadCategories()).toBeNull()
    expect(hasSaved()).toBe(false)
  })

  it('clearSaved removes data', () => {
    saveCategories(mockCategories)
    clearSaved()
    expect(loadCategories()).toBeNull()
  })
})
