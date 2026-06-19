# @mikelgmh/cookie-manager

[![npm version](https://img.shields.io/npm/v/@mikelgmh/cookie-manager.svg)](https://www.npmjs.com/package/@mikelgmh/cookie-manager)
[![CI Status](https://github.com/mikelgmh/cookie-manager/actions/workflows/ci.yml/badge.svg)](https://github.com/mikelgmh/cookie-manager/actions/workflows/ci.yml)
[![NPM downloads](https://img.shields.io/npm/dm/@mikelgmh/cookie-manager.svg)](https://www.npmjs.com/package/@mikelgmh/cookie-manager)
[![license](https://img.shields.io/npm/l/@mikelgmh/cookie-manager.svg)](https://github.com/mikelgmh/cookie-manager/blob/master/LICENSE)

A modern, highly customizable, and lightweight vanilla JavaScript/TypeScript cookie consent manager. It injects script tags dynamically, executes declarative HTML-based scripts, manages cookie values, and supports advanced cookie attributes like `SameSite`, `Secure`, and custom domains.

Built with a modern functional architecture (no classes), fully reactive store-driven UI state, and zero-dependency dynamic script injection with deduplication support.

---

## Installation

Install using Bun:
```bash
bun add @mikelgmh/cookie-manager
```

Or using npm:
```bash
npm install @mikelgmh/cookie-manager
```

---

## Quick Start

Import the manager, its types, and default styles:

```typescript
import { createCookiesManager, ScriptType } from '@mikelgmh/cookie-manager';
import '@mikelgmh/cookie-manager/dist/index.css'; // Optional: Import default themes

// 1. Create the manager instance
const manager = createCookiesManager({
  cookieCategories: [
    {
      id: 'essential',
      title: 'Essential Cookies',
      description: 'These cookies are required for the website to function properly.',
      required: true,
      checked: true,
    },
    {
      id: 'analytics',
      title: 'Analytics Cookies',
      description: 'Used to understand how visitors interact with our website.',
      required: false,
      checked: false,
      scripts: [
        {
          type: ScriptType.GTM,
          gtmCode: 'GTM-XXXXXXX',
        }
      ],
      events: {
        onAccept: () => console.log('Analytics accepted!'),
        onReject: () => console.log('Analytics rejected!'),
        setCookiesOnChange: [
          {
            cookieName: 'analytics_allowed',
            valueOnAccept: 'true',
            valueOnReject: 'false',
            expirationDays: 365,
            sameSite: 'lax',
            secure: true,
          }
        ]
      }
    }
  ]
});

// 2. Register callbacks BEFORE calling init()
manager.onCategoryChange((category) => {
  console.log(`Category ${category.id} status is now: ${category.checked}`);
});

// 3. Initialize the manager (triggers banner/modal dynamically if needed)
await manager.init({ banner: true, modal: false });
```

---

## API Methods

The `createCookiesManager` factory returns a `CookiesManagerAPI` object with the following methods:

| Method | Signature | Description |
| :--- | :--- | :--- |
| `init` | `(options?: InitOptions) => Promise<void>` | Initializes saved state, handles DOMContentLoaded delays, and shows the banner/modal if consent is required. |
| `onCategoryChange` | `(callback: CategoryChangeCallback) => void` | Subscribes to category preference changes. **Must be called before `init()`**. |
| `showBanner` | `() => void` | Programmatically displays the consent banner. |
| `hideBanner` | `() => void` | Hides the consent banner. |
| `showModal` | `() => void` | Programmatically displays the detailed settings modal. |
| `hideModal` | `() => void` | Hides the settings modal. |
| `acceptAll` | `() => void` | Accepts all categories, stores state, sets cookies, triggers scripts, and runs callbacks. |
| `rejectAll` | `() => void` | Rejects all non-required categories, sets rejection cookies/state, and closes UI. |
| `save` | `() => void` | Saves the preferences currently configured in the modal checkboxes. |
| `getOptions` | `() => Options` | Returns the merged options object. |
| `destroy` | `() => void` | Removes banner, modal, and wall elements from the DOM and clears the script loading cache. |

---

## Options Configuration

The configuration options object supports the following properties:

```typescript
interface Options {
  cookieCategories: CookieCategory[];      // Detailed below
  askOnce?: boolean;                       // If true, doesn't ask again if consent is stored (default: true)
  askOnChange?: boolean;                   // Prompts again if cookieCategories definitions change (default: true)
  askAgainIfRejectedAfterDays?: number;    // Prompts user again after X days if any category was rejected (default: -1, disabled)
  delay?: number;                          // Delay in milliseconds before showing UI (default: 0)
  initOnDomContentLoaded?: boolean;        // Wait for DOMContentLoaded before executing init DOM logic (default: true)
  bannerOptions?: BannerOptions;           // Banner options
  modalOptions?: ModalOptions;             // Modal options
}
```

### Cookie Category Options (`CookieCategory`)
Each category in `cookieCategories` has the following properties:

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `id` | `string` | `""` | Unique identifier for the category. |
| `title` | `string` | `"Cookie Category Example"` | Title shown in the modal settings. |
| `description` | `string` | `"Cookie category description"` | Detailed explanation shown under the category header. |
| `required` | `boolean` | `false` | If true, the switch is checked, disabled, and cannot be turned off. |
| `checked` | `boolean` | `true` | Initial state of the checkbox switch if no saved preferences exist. |
| `boxedHeader` | `boolean` | `false` | Render header in a card box style. |
| `boxedBody` | `boolean` | `false` | Renders body padding matching the header card box. |
| `accordion` | `Accordion` | `{ enable: false, ... }` | Collapse description under an accordion toggle. |
| `events` | `Events` | `{ onAccept, onReject, setCookiesOnChange }` | Callbacks and cookie writers triggered on status change. |
| `scripts` | `Script[]` | `[]` | Dynamic scripts loaded when category is accepted. |

### Cookie Objects (`CookieObject`)
Configure cookies that will be automatically written to the user's browser under `events.setCookiesOnChange`:
```typescript
interface CookieObject {
  cookieName: string;
  valueOnAccept: string | number | boolean;
  valueOnReject: string | number | boolean;
  expirationDays: number;                 // Expiration (max 400 days)
  secure?: boolean;                       // Sets Secure flag (HTTPS only)
  sameSite?: 'lax' | 'strict' | 'none';   // Sets SameSite attribute
  domain?: string;                        // Optional domain scope (e.g. '.example.com')
}
```

### Banner Options (`BannerOptions`)
```typescript
interface BannerOptions {
  inject?: boolean;                        // Injects default HTML banner dynamically (default: true)
  injectWall?: boolean;                    // Injects backdrop overlay (default: true)
  wall?: boolean;                          // Shows overlay under banner (default: true)
  wallScroll?: boolean;                    // Allow page scroll when banner is active (default: true)
  wallBlur?: boolean;                      // Applies blur filter to overlay backdrop (default: false)
  bannerText?: string;                     // Text text displayed on the banner
  acceptAllButton?: ButtonOptions;         // "Accept All" button configurations
  rejectAllButton?: ButtonOptions;         // "Reject All" button configurations
  settingsButton?: ButtonOptions;          // "Configure Settings" button configurations
  acceptRequiredOnlyButton?: ButtonOptions; // GDPR-compliant "Accept Necessary Only" button (default: show: false)
}
```

### Modal Options (`ModalOptions`)
```typescript
interface ModalOptions {
  inject?: boolean;                        // Injects default HTML modal dynamically (default: true)
  title?: string;                          // Header title (default: "Cookie settings")
  description?: string;                    // Subheader description (default: "Change the settings for your cookies here.")
  showModalClass?: string;                 // CSS class applied when displaying modal (default: "show-modal")
  acceptAllButton?: ButtonOptions;         // Accept all button options
  rejectAllButton?: ButtonOptions;         // Reject all button options
  saveButton?: ButtonOptions;              // Save button options
  closeButton?: ButtonOptions;             // Close 'X' button options
}
```

### Button Options (`ButtonOptions`)
Buttons in the banner and modal can execute custom actions besides consent calculations:
```typescript
interface ButtonOptions {
  text: string;
  show: boolean;
  onClick?: () => void;                    // Callback executed when the button is clicked
}
```

---

## Script Blocking & Execution

The library supports two main methods for handling third-party scripts (e.g. Google Analytics, Facebook Pixel, Ads):

### 1. Dynamic Script Injection (JavaScript Options)
Specify the scripts directly inside the JS category configuration. They are loaded dynamically once the user accepts the category:
```typescript
{
  id: 'analytics',
  // ...,
  scripts: [
    {
      type: ScriptType.STANDARD,
      scriptSrc: 'https://example.com/analytics.js',
      async: true
    },
    {
      type: ScriptType.GTM,
      gtmCode: 'GTM-XXXXXXX' // Automatic GTM dataLayer initialization
    }
  ]
}
```

### 2. Declarative Script Injection (HTML Markup)
Instead of configuring scripts in JavaScript, write them directly in your HTML markup, blocked by setting `type="text/plain"` and specifying the target category ID in `data-cookie-category`:

```html
<!-- This script won't run by default -->
<script type="text/plain" data-cookie-category="analytics" src="https://example.com/analytics.js" async></script>

<!-- Inline scripts are also supported -->
<script type="text/plain" data-cookie-category="marketing">
  console.log('Marketing pixel initialized!');
  fbq('track', 'PageView');
</script>
```

When consent is granted, the manager scans the DOM, replaces the script tags with `type="text/javascript"`, removes the block indicators, and triggers their execution in the browser automatically.

---

## CSP Compliance & Custom Markup

If you have a strict Content Security Policy (CSP) that prevents dynamic HTML injection (`inject: true`), set `inject: false` in both `bannerOptions` and `modalOptions` and write the HTML manually in your page markup. 

The library will automatically locate the elements by class name and bind all click events, accordions, and checkbox states securely:

```javascript
const manager = createCookiesManager({
  bannerOptions: { inject: false },
  modalOptions: { inject: false },
  cookieCategories: [ ... ]
});
await manager.init({ banner: true });
```

### Required CSS Classes for Custom HTML:

* **Banner Container**: `.c-cookies-config-banner` (with inner `.banner-container`)
* **Accept All Banner Button**: `.cm-banner-accept-all-btn`
* **Reject All Banner Button**: `.cm-banner-reject-all-btn`
* **Accept Necessary Banner Button**: `.cm-banner-accept-required-btn`
* **Open Settings Banner Button**: `.cm-banner-config-btn`
* **Modal Container**: `.c-cookies-config-modal` (with inner `#modal-container`)
* **Checkbox Switches**: `.cm-switch-[index]` (where `[index]` corresponds to the zero-based category index in the array, e.g. `.cm-switch-0`, `.cm-switch-1`)
* **Save Modal Button**: `.cm-modal-save`
* **Accept All Modal Button**: `.cm-modal-accept-all`
* **Reject All Modal Button**: `.cm-modal-reject-all`
* **Close Modal Buttons**: `.close-modal`
* **Wall Overlay**: `.c-cookies-config-wall` (with optional `.c-cookies-config-wall--blurred`)

---

## Styling and Customization

You can import the default compiled stylesheet directly:
```typescript
import '@mikelgmh/cookie-manager/dist/index.css';
```

Alternatively, copy and customize the variables and mixins in your own SCSS files using Dart Sass (`@use` modern syntax):

```scss
@use '@mikelgmh/cookie-manager/src/scss/config/variables' as vars with (
  $first-color: #3f51b5,       // Override themes colors
  $title-color: #212121
);
@use '@mikelgmh/cookie-manager/src/scss/base/base';
@use '@mikelgmh/cookie-manager/src/scss/components/modal';
```

---

## License

This library is licensed under the [ISC License](file:///c:/Users/mikel/Documents/cookie-manager/LICENSE).