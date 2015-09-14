/* eslint-env mocha */

import expect from 'expect'
import {triggerEvent} from 'watif/manipulators'

describe('triggerEvent', () => {
  it('returns a function', () => {
    const result = triggerEvent('blah')
    expect(typeof result).toBe('function')
  })
})
