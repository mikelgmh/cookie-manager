import type { ModalOptions, CookieCategory } from './types'

function escapeAttr(s: string): string {
  return s.replace(/"/g, '&quot;')
}

function categoryBlock(cat: CookieCategory, index: number): string {
  const disabled = cat.required ? 'disabled' : ''
  const checked = cat.checked ? 'checked' : ''
  const accClass = cat.accordion.enable ? 'cm-accordion' : ''
  const panelClass = cat.accordion.enable ? 'cm-panel' : ''
  const activeAcc = cat.accordion.active ? 'cm-active-on-load' : ''
  const chevron = cat.accordion.enable ? "<div class='cc-header__left'></div>" : ''
  const boxH = cat.boxedHeader ? 'cm-boxed' : ''
  const boxB = cat.boxedBody ? 'cookie-category__body--boxed' : ''

  return `
    <div class="cookie-category">
      <div class="cookie-category__header cc-header ${accClass} ${boxH} ${activeAcc}">
        ${chevron}
        <div class="cc-header__right">
          <div class="header__title">${escapeAttr(cat.title)}</div>
          <div class="header__switch">
            <label class="switch ${disabled}">
              <input ${disabled} ${checked} class="cm-switch-${index}" type="checkbox">
              <span class="slider round ${disabled}"></span>
            </label>
          </div>
        </div>
      </div>
      <div class="cookie-category__body body ${boxB} ${panelClass}">
        <p>${escapeAttr(cat.description)}</p>
      </div>
    </div>`
}

function generateModalHTML(opts: ModalOptions, categories: CookieCategory[]): string {
  const closeBtn = opts.closeButton.show
    ? '<div class="modal__close close-modal" title="Close"><div class="close-modal-img"></div></div>'
    : ''

  return `
    <div class="c-cookies-config-modal">
      <div class="modal__container" id="modal-container">
        <div class="modal__content">
          ${closeBtn}
          <div class="modal__title">${escapeAttr(opts.title)}</div>
          <p class="modal__description">${escapeAttr(opts.description)}</p>
          <div class="modal__cookie-categories">
            ${categories.map((c, i) => categoryBlock(c, i)).join('\n')}
          </div>
          <div class="modal__footer">
            ${opts.rejectAllButton.show ? `<button class="modal__button modal__button-width cm-modal-reject-all footer__button-reject-all">${escapeAttr(opts.rejectAllButton.text)}</button>` : ''}
            ${opts.acceptAllButton.show ? `<button class="modal__button modal__button-width cm-modal-accept-all footer__button-accept-all">${escapeAttr(opts.acceptAllButton.text)}</button>` : ''}
            ${opts.saveButton.show ? `<button class="modal__button-link close-modal cm-modal-save footer__button-save-btn">${escapeAttr(opts.saveButton.text)}</button>` : ''}
          </div>
        </div>
      </div>
    </div>`
}

export interface ModalAPI {
  show(): void
  hide(): void
  updateSwitches(categories: CookieCategory[]): void
}

export function createModal(
  opts: ModalOptions,
  categories: CookieCategory[],
  delegates: {
    onAcceptAll: () => void
    onRejectAll: () => void
    onSave: (categories: CookieCategory[]) => void
    onClose?: () => void
  },
): ModalAPI {
  let currentCategories = [...categories]
  let eventsBound = false

  function readSwitchStates(): CookieCategory[] {
    const modal = document.querySelector('.c-cookies-config-modal')
    if (!modal) return currentCategories

    const inputs = modal.querySelectorAll<HTMLInputElement>('[class^="cm-switch-"]')
    const updated = [...currentCategories]
    inputs.forEach((input) => {
      const match = input.className.match(/cm-switch-(\d+)/)
      if (match) {
        const idx = Number(match[1])
        updated[idx] = { ...updated[idx], checked: input.checked }
      }
    })
    return updated
  }

  function updateSwitch(index: number, checked: boolean): void {
    const modal = document.querySelector('.c-cookies-config-modal')
    if (!modal) return
    const input = modal.querySelector<HTMLInputElement>(`.cm-switch-${index}`)
    if (!input) return
    input.checked = checked
    if (checked) {
      input.setAttribute('checked', '')
    } else {
      input.removeAttribute('checked')
    }
  }

  function updateDisabled(index: number, required: boolean): void {
    const modal = document.querySelector('.c-cookies-config-modal')
    if (!modal) return
    const cats = modal.querySelectorAll('.cookie-category')
    const input = cats[index]?.querySelector<HTMLInputElement>(`.cm-switch-${index}`)
    const slider = cats[index]?.querySelector<HTMLElement>('.slider')
    const label = cats[index]?.querySelector<HTMLElement>('label.switch')

    if (!input) return

    if (required) {
      input.disabled = true
      slider?.classList.add('disabled')
      label?.classList.add('disabled')
    } else {
      input.disabled = false
      slider?.classList.remove('disabled')
      label?.classList.remove('disabled')
    }
  }

  function bindEvents(modal: HTMLElement): void {
    if (eventsBound) return

    modal.querySelectorAll('.close-modal').forEach((el) =>
      el.addEventListener('click', () => {
        hide()
        delegates.onClose?.()
      }),
    )

    modal.querySelector('.cm-modal-accept-all')?.addEventListener('click', delegates.onAcceptAll)
    modal.querySelector('.cm-modal-reject-all')?.addEventListener('click', delegates.onRejectAll)

    modal.querySelector('.cm-modal-save')?.addEventListener('click', () => {
      delegates.onSave(readSwitchStates())
    })

    modal.querySelectorAll<HTMLInputElement>('[class^="cm-switch-"]').forEach((input) => {
      const match = input.className.match(/cm-switch-(\d+)/)
      if (!match) return
      const idx = Number(match[1])
      input.addEventListener('change', function (this: HTMLInputElement) {
        updateSwitch(idx, this.checked)
      })
    })

    modal.querySelectorAll('.cm-accordion').forEach((el) => {
      el.addEventListener('click', function (this: HTMLElement) {
        this.classList.toggle('cm-active')
        const panel = this.nextElementSibling as HTMLElement | null
        if (panel) {
          panel.style.maxHeight = panel.style.maxHeight ? '' : `${panel.scrollHeight}px`
        }
      })
    })

    eventsBound = true
  }

  function show(): void {
    if (opts.inject && !document.querySelector('.c-cookies-config-modal')) {
      document.body?.insertAdjacentHTML('afterend', generateModalHTML(opts, currentCategories))
    }

    const modal = document.querySelector<HTMLElement>('.c-cookies-config-modal')
    if (modal) {
      bindEvents(modal)
      updateSwitches(currentCategories)

      modal.classList.add(opts.showModalClass)
      modal.querySelector('#modal-container')?.classList.add(opts.showModalClass)
    }

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    setTimeout(() => {
      const modal = document.querySelector('.c-cookies-config-modal')
      modal?.querySelectorAll('.cm-accordion.cm-active-on-load').forEach((el) => {
        el.classList.remove('cm-active-on-load')
        setTimeout(() => {
          ;(el as HTMLElement).click()
        }, 100)
      })
    }, 10)
  }

  function hide(): void {
    const modal = document.querySelector<HTMLElement>('.c-cookies-config-modal')
    if (modal) {
      modal.classList.remove(opts.showModalClass)
      modal.querySelector('#modal-container')?.classList.remove(opts.showModalClass)
    }
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''
  }

  function updateSwitches(categories: CookieCategory[]): void {
    currentCategories = [...categories]
    const modal = document.querySelector('.c-cookies-config-modal')
    if (!modal) return
    categories.forEach((cat, i) => {
      updateSwitch(i, cat.checked)
      updateDisabled(i, cat.required)
    })
  }

  updateSwitches(categories)

  return { show, hide, updateSwitches }
}
