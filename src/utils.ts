export function encode(str: string): string {
  return btoa(str)
}

export function decode(str: string): string {
  return atob(str)
}

export function isHtml(str: string): boolean {
  return /<([^>]+)>/i.test(str)
}

export function wrapString(str: string, tag: string): string {
  return isHtml(str) ? str : `<${tag}>${str}</${tag}>`
}

export function objectEquals(a: unknown, b: unknown): boolean {
  const sortKeys = (obj: unknown): string => {
    const keys: Record<string, null> = {}
    JSON.stringify(obj, (key, value) => {
      keys[key] = null
      return value
    })
    return JSON.stringify(obj, Object.keys(keys).sort())
  }
  return sortKeys(a) === sortKeys(b)
}

export function prepareForComparison(categories: { checked: boolean }[]): { checked: boolean }[] {
  return JSON.parse(JSON.stringify(categories)).map(
    (c: { checked: boolean }) => ({ ...c, checked: true }),
  )
}

export function deepMerge<T extends object, S extends object>(
  target: T,
  source: S,
): T & S {
  const out = { ...target } as any
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const val = (source as any)[key]
      if (val !== undefined && val !== null && typeof val === 'object' && !Array.isArray(val)) {
        out[key] = deepMerge(
          (target as any)[key] ?? {},
          val as any,
        )
      } else if (val !== undefined) {
        out[key] = val
      }
    }
  }
  return out as T & S
}
