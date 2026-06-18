# cookie-manager - AGENTS.md

## Build, test, dev

```bash
bun install
bun run build      # Vite 8 (Rolldown) → dist/ (ESM, CJS, .d.ts, CSS)
bun run dev        # vite build --watch
bun run test       # vitest run
bun run test:watch # vitest (watch mode)
```

- Builder: **Vite 8** (Rolldown 1.x), zero-config for SCSS
- Test: **Vitest 4** + **happy-dom** — browser environment, no Puppeteer
- TypeScript strict mode (`tsconfig.json`)
- Entry: `src/index.ts`, output: `dist/`

## Architecture (functional, no classes)

```
src/
  index.ts                    # Public exports
  createCookiesManager.ts     # Factory function (antes CookiesManager class)
  store.ts                    # Reactive store (get/set/update/subscribe/snapshot)
  banner.ts                   # Banner DOM injection + events
  modal.ts                    # Modal DOM injection + events
  scripts.ts                  # Script injection (STANDARD / GTM)
  cookies.ts                  # Cookie CRUD (document.cookie)
  storage.ts                  # localStorage + base64 (key: cookiesManagerOptions)
  utils.ts                    # Pure functions (deepMerge, encode/decode, etc.)
  types.ts                    # All interfaces and enums
  constants.ts                # Default option factories
  scss/                       # Styles (SCSS, @use, not @import)
  *.test.ts                   # Co-located Vitest tests
```

## Exports

```ts
import { createCookiesManager, ScriptType } from '@mikelgmh/cookie-manager'
import '@mikelgmh/cookie-manager/dist/index.css'
```

**Breaking changes from v1:**
- `new CookiesManager(opts)` → `createCookiesManager(opts)`
- `manager.on('onCookieCategoryChange', fn)` → `manager.onCategoryChange(fn)`
- `manager.init(true, false)` → `manager.init({ banner: true, modal: false })`
- `manager.acceptAllButton()` → `manager.acceptAll()`
- `manager.saveButton()` → `manager.save()`

## Key conventions

- All state lives in a store (`createStore`) — get/set/subscribe pattern
- No classes, only factory functions returning plain objects
- Pure utility functions (no `Utils` static class)
- Error throwing for invalid options (not `console.error` for config issues)
- SCSS uses `@use` (Dart Sass modern), not `@import`
- Tests co-located with source files as `*.test.ts`

## Notable gotchas

- **Callbacks before init:** `manager.onCategoryChange(fn)` must be called **before** `init()`
- **Cookies stored in localStorage** as base64-encoded JSON key `cookiesManagerOptions`
- **`askAgainIfRejectedAfterDays`** max ~400 days (cookie spec limit)
- **Options comparison strips functions** — JSON serialization loses callbacks. Callbacks are re-attached from original options after restore
- **CSP:** By default both banner and modal inject DOM (`inject: true`). Set to `false` and use custom HTML to comply with CSP
- **Custom HTML classes:** `cm-banner-accept-all-btn`, `cm-banner-reject-all-btn`, `cm-banner-config-btn`, `cm-modal-save`, `cm-modal-accept-all`, `cm-modal-reject-all`, `cm-switch-[index]`, `close-modal`, `c-cookies-config-wall`, `c-cookies-config-banner`, `c-cookies-config-modal`
- **Switch index** must match array order of `cookieCategories`
- **`setCookiesOnChange`** `expirationDays` max is 400 days
- **`askOnChange`** overrides `askOnce` — triggers re-show when `cookieCategories` array changes

## Release

- Semantic release via GitHub Actions (`.github/workflows/release.yml`)
- Conventional commits required on `main`
- Secrets needed: `NPM_TOKEN` (repository secret)
