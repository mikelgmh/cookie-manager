import { ScriptType, type CookieCategory, type CategoryChangeCallback } from './types'

const injectedScripts = new Set<string>()

export function resetInjectedScripts(): void {
  injectedScripts.clear()
}

function injectStandard(src: string, async: boolean): void {
  if (injectedScripts.has(src)) return
  injectedScripts.add(src)

  const el = document.createElement('script')
  el.setAttribute('src', src)
  el.async = async
  try {
    document.body.appendChild(el)
  } catch (error) {
    // Suppress script loading errors in test environments (e.g. Happy DOM)
  }
}

function injectGTM(gtmCode: string): void {
  if (injectedScripts.has(gtmCode)) return
  injectedScripts.add(gtmCode)

  try {
    const w = window as unknown as Record<string, any>
    w.dataLayer = w.dataLayer ?? []
    w.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
    
    const f = document.getElementsByTagName('script')[0]
    const j = document.createElement('script')
    j.src = `https://www.googletagmanager.com/gtm.js?id=${gtmCode}`
    
    if (f?.parentNode) {
      f.parentNode.insertBefore(j, f)
    } else {
      document.head.appendChild(j)
    }
  } catch {
    console.error("Couldn't inject GTM.")
  }
}

function activateDeclarativeScript(scriptEl: HTMLScriptElement): void {
  const newScript = document.createElement('script')
  
  // Copy all attributes except type and data-cookie-category
  Array.from(scriptEl.attributes).forEach((attr) => {
    if (attr.name !== 'type' && attr.name !== 'data-cookie-category') {
      newScript.setAttribute(attr.name, attr.value)
    }
  })
  
  newScript.setAttribute('type', 'text/javascript')
  
  if (scriptEl.innerHTML) {
    newScript.innerHTML = scriptEl.innerHTML
  }
  
  scriptEl.parentNode?.replaceChild(newScript, scriptEl)
}

export function enableDeclarativeScripts(
  categories: CookieCategory[],
  allAccepted: boolean,
): void {
  for (const category of categories) {
    if (!category.checked && !allAccepted) continue
    
    const selector = `script[type="text/plain"][data-cookie-category="${category.id}"]`
    const scripts = document.querySelectorAll<HTMLScriptElement>(selector)
    
    scripts.forEach((scriptEl) => {
      activateDeclarativeScript(scriptEl)
    })
  }
}

export function injectScriptsForCategories(
  categories: CookieCategory[],
  allAccepted: boolean,
  onCategoryChange?: CategoryChangeCallback,
): void {
  for (const category of categories) {
    if (onCategoryChange) {
      onCategoryChange(category)
    }
    if (!category.checked && !allAccepted) continue
    for (const script of category.scripts) {
      if (script.type === ScriptType.STANDARD || script.type == null) {
        if (script.scriptSrc) {
          injectStandard(script.scriptSrc, script.async)
        }
      } else {
        if (script.gtmCode) {
          injectGTM(script.gtmCode)
        } else {
          throw new Error('You should provide a gtmCode for the script')
        }
      }
    }
  }
  enableDeclarativeScripts(categories, allAccepted)
}
