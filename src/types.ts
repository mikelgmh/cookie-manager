export enum ScriptType {
  GTM,
  STANDARD,
}

export interface CookieObject {
  cookieName: string
  valueOnAccept: string | number | boolean
  valueOnReject: string | number | boolean
  expirationDays: number
  secure?: boolean
  sameSite?: 'lax' | 'strict' | 'none'
  domain?: string
}

export interface Events {
  onAccept: () => void
  onReject: () => void
  setCookiesOnChange: CookieObject[]
}

export interface Accordion {
  enable: boolean
  enableOnDescriptionLength: number
  active: boolean
}

export interface Script {
  type: ScriptType
  gtmCode?: string
  scriptSrc?: string
  async: boolean
}

export interface CookieCategory {
  id: string
  title: string
  description: string
  required: boolean
  checked: boolean
  boxedHeader: boolean
  boxedBody: boolean
  accordion: Accordion
  events: Events
  scripts: Script[]
}

export interface ButtonOptions {
  text: string
  show: boolean
  onClick: () => void
}

export interface ModalOptions {
  inject: boolean
  title: string
  description: string
  showModalClass: string
  acceptAllButton: ButtonOptions
  rejectAllButton: ButtonOptions
  saveButton: ButtonOptions
  closeButton: ButtonOptions
}

export interface BannerOptions {
  inject: boolean
  injectWall: boolean
  wall: boolean
  wallScroll: boolean
  wallBlur: boolean
  bannerText: string
  acceptAllButton: ButtonOptions
  rejectAllButton: ButtonOptions
  settingsButton: ButtonOptions
  acceptRequiredOnlyButton: ButtonOptions
}

export interface Options {
  cookieCategories: CookieCategory[]
  askOnce: boolean
  askOnChange: boolean
  askAgainIfRejectedAfterDays: number
  delay: number
  initOnDomContentLoaded: boolean
  bannerOptions: BannerOptions
  modalOptions: ModalOptions
}

export interface InitOptions {
  banner?: boolean
  modal?: boolean
}

export type CategoryChangeCallback = (category: CookieCategory) => void

export interface CookiesManagerAPI {
  init(options?: InitOptions): Promise<void>
  onCategoryChange(callback: CategoryChangeCallback): void
  showBanner(): void
  hideBanner(): void
  showModal(): void
  hideModal(): void
  acceptAll(): void
  rejectAll(): void
  save(): void
  getOptions(): Options
  destroy(): void
}
