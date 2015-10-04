/* eslint-env mocha */

import expect from 'expect'
import {cond} from 'cond'

describe('cond', () => {
  it('true executes primary clause and not alternate clause', () => {
    const predicate = expect.createSpy().andReturn(true)
    const primary = expect.createSpy().andReturn(42)
    const alternate = expect.createSpy().andReturn(84)
    const func = cond(predicate).then(primary).else(alternate)
    const args = [1, 'a', 2, 'b']
    const result = func(...args)
    expect(predicate).toHaveBeenCalledWith(...args)
    expect(primary).toHaveBeenCalledWith(...args)
    expect(alternate).toNotHaveBeenCalled()
    expect(result).toBe(42)
  })

  it('false executes alternate clause and not primary clause', () => {
    const predicate = expect.createSpy().andReturn(false)
    const primary = expect.createSpy().andReturn(42)
    const alternate = expect.createSpy().andReturn(84)
    const func = cond(predicate).then(primary).else(alternate)
    const args = [1, 'a', 2, 'b']
    const result = func(...args)
    expect(predicate).toHaveBeenCalledWith(...args)
    expect(primary).toNotHaveBeenCalled()
    expect(alternate).toHaveBeenCalledWith(...args)
    expect(result).toBe(84)
  })

  it('returns literal clauses', () => {
    const func = cond(u => u).then(1).else(2)
    expect(func(true)).toBe(1)
    expect(func(false)).toBe(2)
  })

  it('returns undefined if no primary', () => {
    const func = cond(() => true).else(2)
    expect(func()).toBe(undefined)
  })

  it('returns undefined if no alternate', () => {
    const func = cond(() => false).then(1)
    expect(func()).toBe(undefined)
  })

  // it('supports .elseif', () => {
  //   const func =
  //     cond(i => i === 1).then('a')
  //     .elseif(i => i === 2).then('b')
  //     .else('c')
  //   expect(func(1)).toBe('a')
  //   expect(func(2)).toBe('b')
  //   expect(func(3)).toBe('c')
  // })
})
