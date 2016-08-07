/* eslint-env mocha */

import expect from 'expect'
import searchForVerbs from 'watif/master/search-for-verbs'

describe('search-for-verbs', () => {
  it('finds simple verb methods on an object', () => {
    const obj = {
      verbOpen: function () {},
      verbClose: function () {},
      doOtherStuff: function () {},
    }
    const verbs = searchForVerbs(obj)
    verbs.sort()
    expect(verbs).toEqual(['close', 'open'])
  })

  it('finds verbs in the prototype chain', () => {
    const prototypeBase = { verbJump: () => {} }
    const prototypeDerived = Object.create(prototypeBase, { verbFrob: () => {} })
    const obj = Object.create(prototypeDerived)
    const verbs = searchForVerbs(obj)
    verbs.sort()
    expect(verbs).toEqual(['frob', 'jump'])
  })

  it('filters verbs based on predicate methods', () => {
    const verbs = searchForVerbs({ verbJump: () => {}, canJump: () => false })
    expect(verbs).toEqual([])
  })

  it('finds inenumerable methods', () => {
    const obj = {}
    Object.defineProperty(obj, 'verbSearch', {
      enumerable: false,
      value: () => {},
    })
    expect(searchForVerbs(obj)).toEqual(['search'])
  })
})
