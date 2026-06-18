import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createCookiesManager } from './createCookiesManager'
import { ScriptType, type Options } from './types'

function validOptions(): Options {
  return {
    cookieCategories: [
      {
        id: 'analytics',
        title: 'Analytics',
        description: 'Analytics cookies',
        required: false,
        checked: false,
        boxedHeader: false,
        boxedBody: false,
        accordion: { enable: false, enableOnDescriptionLength: 45, active: false },
        events: { onAccept: () => {}, onReject: () => {}, setCookiesOnChange: [] },
        scripts: [],
      },
    ],
    askOnce: true,
    askOnChange: true,
    askAgainIfRejectedAfterDays: -1,
    delay: 0,
    initOnDomContentLoaded: false,
    bannerOptions: {
      inject: false,
      injectWall: false,
      wall: false,
      wallScroll: true,
      wallBlur: false,
      bannerText: 'Test banner',
      acceptAllButton: { text: 'Accept', show: true, onClick: () => {} },
      rejectAllButton: { text: 'Reject', show: true, onClick: () => {} },
      settingsButton: { text: 'Settings', show: true, onClick: () => {} },
      acceptRequiredOnlyButton: { text: 'Required', show: false, onClick: () => {} },
    },
    modalOptions: {
      inject: false,
      title: 'Settings',
      description: 'Cookie settings',
      showModalClass: 'show-modal',
      acceptAllButton: { text: 'Accept', show: true, onClick: () => {} },
      rejectAllButton: { text: 'Reject', show: true, onClick: () => {} },
      saveButton: { text: 'Save', show: true, onClick: () => {} },
      closeButton: { text: 'Close', show: true, onClick: () => {} },
    },
  }
}

describe('createCookiesManager', () => {
  beforeEach(() => {
    localStorage.clear()
    document.body.innerHTML = ''
  })

  it('throws if no cookieCategories provided', () => {
    expect(() => createCookiesManager({ cookieCategories: [] })).toThrow(
      'at least one cookie category',
    )
  })

  it('returns the expected API shape', () => {
    const api = createCookiesManager(validOptions())
    expect(api).toHaveProperty('init')
    expect(api).toHaveProperty('onCategoryChange')
    expect(api).toHaveProperty('showBanner')
    expect(api).toHaveProperty('hideBanner')
    expect(api).toHaveProperty('showModal')
    expect(api).toHaveProperty('hideModal')
    expect(api).toHaveProperty('acceptAll')
    expect(api).toHaveProperty('rejectAll')
    expect(api).toHaveProperty('save')
    expect(api).toHaveProperty('getOptions')
    expect(api).toHaveProperty('destroy')
  })

  it('acceptAll saves to localStorage', () => {
    const api = createCookiesManager(validOptions())
    api.acceptAll()
    expect(localStorage.getItem('cookiesManagerOptions')).not.toBeNull()
  })

  it('acceptAll fires onAccept callbacks', () => {
    const onAccept = vi.fn()
    const onReject = vi.fn()
    const opts = validOptions()
    opts.cookieCategories[0].events = { onAccept, onReject, setCookiesOnChange: [] }
    const api = createCookiesManager(opts)
    api.acceptAll()
    expect(onAccept).toHaveBeenCalled()
    expect(onReject).not.toHaveBeenCalled()
  })

  it('rejectAll fires onReject for non-required categories', () => {
    const onAccept = vi.fn()
    const onReject = vi.fn()
    const opts = validOptions()
    opts.cookieCategories[0].events = { onAccept, onReject, setCookiesOnChange: [] }
    const api = createCookiesManager(opts)
    api.rejectAll()
    expect(onAccept).not.toHaveBeenCalled()
    expect(onReject).toHaveBeenCalled()
  })

  it('rejectAll keeps required categories checked', () => {
    const onAccept = vi.fn()
    const onReject = vi.fn()
    const opts = validOptions()
    opts.cookieCategories[0].required = true
    opts.cookieCategories[0].events = { onAccept, onReject, setCookiesOnChange: [] }
    const api = createCookiesManager(opts)
    api.rejectAll()
    expect(onAccept).toHaveBeenCalled() // required category stays accepted
  })

  it('onCategoryChange is called during init when saved state exists', async () => {
    const cb = vi.fn()
    const opts = validOptions()
    opts.cookieCategories[0].checked = true
    // Pre-save state
    const api1 = createCookiesManager(opts)
    api1.acceptAll()

    const api2 = createCookiesManager(opts)
    api2.onCategoryChange(cb)
    await api2.init({ banner: false })
    expect(cb).toHaveBeenCalled()
  })

  it('init() does not throw when no saved state', async () => {
    const api = createCookiesManager(validOptions())
    await expect(api.init({ banner: false, modal: false })).resolves.toBeUndefined()
  })

  it('calls onClick callback on acceptAll and rejectAll when banner buttons are clicked', async () => {
    const onAcceptClick = vi.fn()
    const onRejectClick = vi.fn()
    const opts = validOptions()
    opts.bannerOptions.inject = true
    opts.bannerOptions.acceptAllButton.onClick = onAcceptClick
    opts.bannerOptions.rejectAllButton.onClick = onRejectClick
    
    const api = createCookiesManager(opts)
    await api.init({ banner: true })
    
    const acceptBtn = document.querySelector<HTMLButtonElement>('.cm-banner-accept-all-btn')
    expect(acceptBtn).not.toBeNull()
    acceptBtn?.click()
    expect(onAcceptClick).toHaveBeenCalled()
    
    // Test reject button on clean manager
    document.body.innerHTML = ''
    localStorage.clear()
    const api2 = createCookiesManager(opts)
    await api2.init({ banner: true })
    const rejectBtn = document.querySelector<HTMLButtonElement>('.cm-banner-reject-all-btn')
    expect(rejectBtn).not.toBeNull()
    rejectBtn?.click()
    expect(onRejectClick).toHaveBeenCalled()
  })

  it('does not inject duplicate standard scripts', () => {
    const opts = validOptions()
    opts.cookieCategories[0].scripts = [
      { type: ScriptType.STANDARD, scriptSrc: 'https://example.com/test-script.js', async: true }
    ]
    const api = createCookiesManager(opts)
    
    api.acceptAll()
    const initialScripts = document.querySelectorAll('script[src="https://example.com/test-script.js"]')
    expect(initialScripts.length).toBe(1)
    
    api.acceptAll()
    const finalScripts = document.querySelectorAll('script[src="https://example.com/test-script.js"]')
    expect(finalScripts.length).toBe(1)
  })

  it('enables declarative scripts in DOM', () => {
    const opts = validOptions()
    opts.cookieCategories[0].id = 'analytics'
    
    const scriptEl = document.createElement('script')
    scriptEl.type = 'text/plain'
    scriptEl.setAttribute('data-cookie-category', 'analytics')
    scriptEl.innerHTML = 'window.testDeclarative = true;'
    document.body.appendChild(scriptEl)
    
    const api = createCookiesManager(opts)
    api.acceptAll()
    
    const activeScript = document.querySelector('script[type="text/javascript"]')
    expect(activeScript).not.toBeNull()
    expect(document.querySelector('script[type="text/plain"]')).toBeNull()
  })
})
