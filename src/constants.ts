import type { Options, CookieCategory } from './types'

export function getDefaultCategoryOptions(): CookieCategory {
  return {
    id: '',
    title: 'Cookie Category Example',
    description: 'Cookie category description',
    required: false,
    checked: true,
    boxedHeader: false,
    boxedBody: false,
    accordion: {
      enable: false,
      enableOnDescriptionLength: 45,
      active: false,
    },
    events: {
      onAccept: () => {},
      onReject: () => {},
      setCookiesOnChange: [],
    },
    scripts: [],
  }
}

export function getDefaultOptions(): Options {
  return {
    cookieCategories: [],
    askOnce: true,
    askOnChange: true,
    askAgainIfRejectedAfterDays: -1,
    delay: 0,
    initOnDomContentLoaded: true,
    bannerOptions: {
      inject: true,
      injectWall: true,
      wall: true,
      wallScroll: true,
      wallBlur: false,
      bannerText: 'This website uses cookies to ensure you get the best experience on our website.',
      acceptAllButton: {
        text: 'Accept all',
        show: true,
        onClick: () => {},
      },
      rejectAllButton: {
        text: 'Reject all',
        show: true,
        onClick: () => {},
      },
      settingsButton: {
        text: 'Configure',
        show: true,
        onClick: () => {},
      },
      acceptRequiredOnlyButton: {
        text: 'Configure',
        show: false,
        onClick: () => {},
      },
    },
    modalOptions: {
      inject: true,
      title: 'Cookie settings',
      description: 'Change the settings for your cookies here.',
      showModalClass: 'show-modal',
      acceptAllButton: {
        text: 'Accept all',
        show: true,
        onClick: () => {},
      },
      rejectAllButton: {
        text: 'Reject all',
        show: true,
        onClick: () => {},
      },
      saveButton: {
        text: 'Save',
        show: true,
        onClick: () => {},
      },
      closeButton: {
        text: 'Close',
        show: true,
        onClick: () => {},
      },
    },
  }
}
