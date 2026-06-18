import type { Options, CookieCategory, InitOptions, CategoryChangeCallback, CookiesManagerAPI } from './types'
import { getDefaultOptions, getDefaultCategoryOptions } from './constants'
import { deepMerge, prepareForComparison, objectEquals } from './utils'
import { createStore } from './store'
import { saveCategories, loadCategories, clearSaved, hasSaved } from './storage'
import { setCookiesForCategories, getCookie } from './cookies'
import { injectScriptsForCategories, resetInjectedScripts } from './scripts'
import { createBanner, type BannerAPI } from './banner'
import { createModal, type ModalAPI } from './modal'
import './scss/styles.scss'

interface ManagerState {
  cookieCategories: CookieCategory[]
  acceptedAll: boolean
}

function onDomReady(fn: () => void): void {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}

export function createCookiesManager(userOptions: Partial<Options> = {}): CookiesManagerAPI {
  if (!userOptions.cookieCategories?.length) {
    throw new Error('You should provide at least one cookie category')
  }

  // ── Merge options ──────────────────────────────────────────────
  const mergedCategories: CookieCategory[] = userOptions.cookieCategories.map((cat) =>
    deepMerge(getDefaultCategoryOptions(), cat),
  )

  const clonedCategoryEvents = mergedCategories.map((c) => c.events)

  const options = deepMerge(
    getDefaultOptions(),
    { ...userOptions, cookieCategories: mergedCategories },
  )

  // ── Store ──────────────────────────────────────────────────────
  const store = createStore<ManagerState>({
    cookieCategories: options.cookieCategories,
    acceptedAll: false,
  })

  // ── Config change detection ────────────────────────────────────
  let configChanged = false
  const saved = loadCategories()

  if (saved) {
    const preparedCurrent = prepareForComparison(store.get('cookieCategories'))
    const preparedSaved = prepareForComparison(saved)

    if (objectEquals(preparedCurrent, preparedSaved)) {
      // Restore saved state but re-attach callbacks
      const restored: CookieCategory[] = saved.map((cat, i) => ({
        ...cat,
        events: clonedCategoryEvents[i] ?? cat.events,
      }))
      store.set('cookieCategories', restored)
    } else {
      clearSaved()
      configChanged = true
    }
  }

  // ── Callback subscription ──────────────────────────────────────
  let onCategoryChange: CategoryChangeCallback | undefined

  function callIndividualCallbacks(categories: CookieCategory[], allAccepted: boolean): void {
    for (const cat of categories) {
      if (cat.checked || allAccepted) {
        cat.events.onAccept()
      } else {
        cat.events.onReject()
      }
    }
  }

  // ── Banner ─────────────────────────────────────────────────────
  let banner: BannerAPI | undefined

  if (options.bannerOptions) {
    banner = createBanner(options.bannerOptions, {
      onAcceptAll: () => {
        api.acceptAll()
        options.bannerOptions.acceptAllButton?.onClick?.()
      },
      onRejectAll: () => {
        api.rejectAll()
        options.bannerOptions.rejectAllButton?.onClick?.()
      },
      onAcceptRequiredOnly: () => {
        api.rejectAll()
        options.bannerOptions.acceptRequiredOnlyButton?.onClick?.()
      },
      onOpenSettings: () => {
        api.showModal()
        options.bannerOptions.settingsButton?.onClick?.()
      },
    })
  }

  // ── Modal ──────────────────────────────────────────────────────
  let modal: ModalAPI | undefined

  if (options.modalOptions) {
    modal = createModal(
      options.modalOptions,
      store.get('cookieCategories'),
      {
        onAcceptAll: () => {
          api.acceptAll()
          options.modalOptions.acceptAllButton?.onClick?.()
        },
        onRejectAll: () => {
          api.rejectAll()
          options.modalOptions.rejectAllButton?.onClick?.()
        },
        onSave: (categories) => {
          store.set('cookieCategories', categories)
          api.save()
          options.modalOptions.saveButton?.onClick?.()
        },
        onClose: () => {
          options.modalOptions.closeButton?.onClick?.()
        },
      },
    )
  }

  // ── Sync UI with Store updates ─────────────────────────────────
  store.subscribe(() => {
    const categories = store.get('cookieCategories')
    modal?.updateSwitches(categories)
  })

  // ── Public API ─────────────────────────────────────────────────
  const api: CookiesManagerAPI = {
    init: async (initOpts?: InitOptions) => {
      const showBanner = initOpts?.banner ?? false
      const showModal = initOpts?.modal ?? false

      const shouldShow = (): boolean => {
        if (!options.askOnce) return true
        if (configChanged) return true
        if (!hasSaved()) return true

        const cats = store.get('cookieCategories')
        const savedCats = loadCategories()
        if (!savedCats) return true

        for (const category of cats) {
          for (const [i, cookie] of category.events.setCookiesOnChange.entries()) {
            const realValue = getCookie(cookie.cookieName)

            // Cookie missing → prompt user
            if (realValue === undefined) return true

            // Cookie value doesn't match expected → prompt
            const expected = [String(cookie.valueOnAccept), String(cookie.valueOnReject)]
            if (!expected.includes(realValue)) return true

            // Cookie modified via devtools → prompt
            if (category.checked) {
              const savedVal = savedCats[i]?.events?.setCookiesOnChange?.[i]?.valueOnAccept
              if (savedVal !== undefined && String(savedVal) !== realValue) return true
            }
          }
        }
        return false
      }

      const proceed = async () => {
        if (shouldShow()) {
          if (options.delay > 0) {
            await new Promise((r) => setTimeout(r, options.delay))
          }
          if (showBanner) banner?.show()
          if (showModal) modal?.show()
        }

        // Always inject scripts + fire callbacks if there's saved state
        if (hasSaved()) {
          injectScriptsForCategories(
            store.get('cookieCategories'),
            false,
            onCategoryChange,
          )
          callIndividualCallbacks(store.get('cookieCategories'), false)
        }
      }

      if (options.initOnDomContentLoaded) {
        await new Promise<void>((resolve) => {
          onDomReady(() => {
            proceed().then(resolve)
          })
        })
      } else {
        await proceed()
      }
    },

    onCategoryChange: (callback: CategoryChangeCallback) => {
      onCategoryChange = callback
    },

    showBanner: () => banner?.show(),
    hideBanner: () => banner?.hide(),

    showModal: () => modal?.show(),
    hideModal: () => modal?.hide(),

    acceptAll: () => {
      const updated = store.get('cookieCategories').map((cat) => ({
        ...cat,
        checked: true,
      }))
      store.set('cookieCategories', updated)
      store.set('acceptedAll', true)
      modal?.hide()
      banner?.hide()
      injectScriptsForCategories(updated, true, onCategoryChange)
      saveCategories(updated)
      setCookiesForCategories(updated, options.askAgainIfRejectedAfterDays)
      callIndividualCallbacks(updated, true)
    },

    rejectAll: () => {
      const updated = store.get('cookieCategories').map((cat) => ({
        ...cat,
        checked: cat.required ? true : false,
      }))
      store.set('cookieCategories', updated)
      store.set('acceptedAll', false)
      modal?.hide()
      banner?.hide()
      injectScriptsForCategories(updated, false, onCategoryChange)
      saveCategories(updated)
      setCookiesForCategories(updated, options.askAgainIfRejectedAfterDays)
      callIndividualCallbacks(updated, false)
    },

    save: () => {
      const categories = store.get('cookieCategories')
      saveCategories(categories)
      setCookiesForCategories(categories, options.askAgainIfRejectedAfterDays)
      callIndividualCallbacks(categories, false)
    },

    getOptions: () => ({ ...options }),

    destroy: () => {
      document.querySelector('.c-cookies-config-banner')?.remove()
      document.querySelector('.c-cookies-config-wall')?.remove()
      document.querySelector('.c-cookies-config-modal')?.remove()
      resetInjectedScripts()
    },
  }

  return api
}
