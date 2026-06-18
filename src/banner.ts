import type { BannerOptions } from './types'
import { wrapString } from './utils'

function generateBannerHTML(opts: BannerOptions): string {
  const btn = (name: 'acceptAllButton' | 'rejectAllButton' | 'settingsButton' | 'acceptRequiredOnlyButton', cls: string) =>
    opts[name] && opts[name].show
      ? `<button class="banner-container__button ${cls}">${opts[name].text}</button>`
      : ''

  return `
    <div class="c-cookies-config-banner">
      <div class="banner-container">
        ${wrapString(opts.bannerText, 'p')}
        <div class="banner-container__buttons">
          ${btn('rejectAllButton', 'banner-container__reject-all-btn cm-banner-reject-all-btn')}
          ${btn('acceptRequiredOnlyButton', 'banner-container__accept-required-btn cm-banner-accept-required-btn')}
          ${btn('acceptAllButton', 'banner-container__accept-all-btn cm-banner-accept-all-btn')}
          ${btn('settingsButton', 'banner-container__config-btn cm-banner-config-btn')}
        </div>
      </div>
    </div>`
}

function generateWallHTML(opts: BannerOptions): string {
  const blur = opts.wallBlur ? 'c-cookies-config-wall--blurred' : ''
  return `<div class="c-cookies-config-wall ${blur}"></div>`
}

export interface BannerAPI {
  show(): void
  hide(): void
}

export function createBanner(
  opts: BannerOptions,
  delegates: {
    onAcceptAll: () => void
    onRejectAll: () => void
    onAcceptRequiredOnly: () => void
    onOpenSettings: () => void
  },
): BannerAPI {
  let eventsBound = false

  function bindEvents(banner: HTMLElement): void {
    if (eventsBound) return
    banner.querySelector('.cm-banner-accept-all-btn')?.addEventListener('click', delegates.onAcceptAll)
    banner.querySelector('.cm-banner-reject-all-btn')?.addEventListener('click', delegates.onRejectAll)
    banner.querySelector('.cm-banner-accept-required-btn')?.addEventListener('click', delegates.onAcceptRequiredOnly)
    banner.querySelector('.cm-banner-config-btn')?.addEventListener('click', delegates.onOpenSettings)
    eventsBound = true
  }

  function show(): void {
    if (opts.inject && !document.querySelector('.c-cookies-config-banner')) {
      document.body?.insertAdjacentHTML('afterend', generateBannerHTML(opts))
      if (opts.injectWall && !document.querySelector('.c-cookies-config-wall')) {
        document.body?.insertAdjacentHTML('afterend', generateWallHTML(opts))
      }
    }

    const banner = document.querySelector<HTMLElement>('.c-cookies-config-banner')
    if (banner) {
      banner.style.display = ''
      bindEvents(banner)
    }

    if (opts.wall) {
      document.querySelector('.c-cookies-config-wall')?.classList.add('wall-show')
    }
    if (!opts.wallScroll) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    }
    document.querySelector('.c-cookies-config-banner .banner-container')?.classList.add('show-banner')
  }

  function hide(): void {
    const banner = document.querySelector<HTMLElement>('.c-cookies-config-banner')
    if (banner) banner.style.display = 'none'
    document.querySelector('.c-cookies-config-wall')?.classList.remove('wall-show')
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''
  }

  return { show, hide }
}
