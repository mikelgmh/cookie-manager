import { describe, it, expect } from 'vitest'
import { encode, decode, wrapString, objectEquals, prepareForComparison, deepMerge } from './utils'

describe('encode / decode', () => {
  it('encodes and decodes a string', () => {
    const original = 'hello world'
    expect(decode(encode(original))).toBe(original)
  })

  it('encodes and decodes JSON', () => {
    const obj = { a: 1, b: [2, 3] }
    const roundtrip = JSON.parse(decode(encode(JSON.stringify(obj))))
    expect(roundtrip).toEqual(obj)
  })
})

describe('wrapString', () => {
  it('wraps plain text in a tag', () => {
    expect(wrapString('hello', 'p')).toBe('<p>hello</p>')
  })

  it('does not double-wrap HTML', () => {
    expect(wrapString('<b>hello</b>', 'p')).toBe('<b>hello</b>')
  })
})

describe('objectEquals', () => {
  it('returns true for equal objects', () => {
    expect(objectEquals({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true)
  })

  it('returns false for different objects', () => {
    expect(objectEquals({ a: 1 }, { a: 2 })).toBe(false)
  })

  it('handles nested objects', () => {
    expect(objectEquals({ a: { b: 1 } }, { a: { b: 1 } })).toBe(true)
  })
})

describe('prepareForComparison', () => {
  it('clones and sets all checked to true', () => {
    const input = [{ checked: false }, { checked: true }]
    const result = prepareForComparison(input)
    expect(result).toEqual([{ checked: true }, { checked: true }])
    expect(result).not.toBe(input) // different reference
    expect(input[0].checked).toBe(false) // original unchanged
  })
})

describe('deepMerge', () => {
  it('merges simple objects', () => {
    const result = deepMerge({ a: 1, b: 2 }, { b: 3, c: 4 })
    expect(result).toEqual({ a: 1, b: 3, c: 4 })
  })

  it('merges nested objects recursively', () => {
    const result = deepMerge({ outer: { a: 1, b: 2 } }, { outer: { b: 3, c: 4 } })
    expect(result).toEqual({ outer: { a: 1, b: 3, c: 4 } })
  })

  it('does not mutate the target', () => {
    const target = { a: 1 }
    const result = deepMerge(target, { b: 2 })
    expect(result).toEqual({ a: 1, b: 2 })
    expect(target).toEqual({ a: 1 })
  })
})
