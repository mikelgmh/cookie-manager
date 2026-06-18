export function createStore<T>(initial: T) {
  let state = { ...initial }
  const listeners = new Set<() => void>()

  function notify() {
    listeners.forEach((fn) => fn())
  }

  return {
    get<K extends keyof T>(key: K): T[K] {
      return state[key]
    },

    set<K extends keyof T>(key: K, value: T[K]): void {
      state = { ...state, [key]: value }
      notify()
    },

    update<K extends keyof T>(key: K, fn: (prev: T[K]) => T[K]): void {
      state = { ...state, [key]: fn(state[key]) }
      notify()
    },

    subscribe(fn: () => void): () => void {
      listeners.add(fn)
      return () => {
        listeners.delete(fn)
      }
    },

    snapshot(): T {
      return { ...state }
    },
  }
}
