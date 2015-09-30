/* eslint-env mocha */

import expect from 'expect'
import {pred} from 'cond/pred'

describe('pred', () => {
  it('returns argument', () => {
    expect(pred(42)()).toBe(42)
  })

  it('calls function with arguments', () => {
    const spy = expect.createSpy().andReturn(42)
    const args = ['a', 1, 'b', 2]
    const result = pred(spy)(...args)
    expect(spy).toHaveBeenCalledWith(...args)
    expect(result).toBe(42)
  })

  it('can be modified with `eq`', () => {
    const first = expect.createSpy().andCall((a, b) => a)
    const second = expect.createSpy().andCall((a, b) => b)
    const func = pred(first).eq(second)
    const falseResult = func(1, 2)
    expect(first).toHaveBeenCalledWith(1, 2)
    expect(second).toHaveBeenCalledWith(1, 2)
    expect(falseResult).toBe(false)
    expect(func(3, 3)).toBe(true)
  })

  it('can construct complex expressions', () => {
    const first = (a, b, c, d) => a
    const second = (a, b, c, d) => b
    const third = (a, b, c, d) => c
    const fourth = (a, b, c, d) => d
    const func = (pred(first).eq(second)).and(pred(third).eq(fourth))
    expect(func(1, 1, 2, 2)).toBe(true)
    expect(func(1, 2, 3, 3)).toBe(false)
    expect(func(1, 1, 3, 4)).toBe(false)
  })
})
