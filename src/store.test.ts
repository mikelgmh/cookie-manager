import { describe, it, expect, vi } from 'vitest'
import { createStore } from './store'

describe('createStore', () => {
  it('returns initial values via get()', () => {
    const store = createStore({ a: 1, b: 'hello' })
    expect(store.get('a')).toBe(1)
    expect(store.get('b')).toBe('hello')
  })

  it('set() updates a value', () => {
    const store = createStore({ count: 0 })
    store.set('count', 42)
    expect(store.get('count')).toBe(42)
  })

  it('update() applies a transform function', () => {
    const store = createStore({ count: 0 })
    store.update('count', (n) => n + 1)
    expect(store.get('count')).toBe(1)
  })

  it('subscribe() notifies on set', () => {
    const store = createStore({ x: 0 })
    const fn = vi.fn()
    store.subscribe(fn)
    store.set('x', 1)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('unsubscribe stops notifications', () => {
    const store = createStore({ x: 0 })
    const fn = vi.fn()
    const unsub = store.subscribe(fn)
    unsub()
    store.set('x', 1)
    expect(fn).not.toHaveBeenCalled()
  })

  it('snapshot() returns a copy of state', () => {
    const store = createStore({ count: 1 })
    const snap = store.snapshot()
    expect(snap).toEqual({ count: 1 })
    snap.count = 99
    expect(store.get('count')).toBe(1) // original unchanged
  })
})
