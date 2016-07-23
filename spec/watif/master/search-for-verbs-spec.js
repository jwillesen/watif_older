/* eslint-env mocha */

import expect from 'expect'
import searchForVerbs from 'watif/master/search-for-verbs'

describe('search-for-verbs', () => {
  it('finds simple verb methods on an object', () => {
    const obj = {
      verb_open: function () {},
      verb_close: function () {},
      do_other_stuff: function () {},
    }
    const verbs = searchForVerbs(obj)
    verbs.sort()
    expect(verbs).toEqual(['close', 'open'])
  })

  it('finds verbs in the prototype chain', () => {
    const prototypeBase = { verb_jump: () => {} }
    const prototypeDerived = Object.create(prototypeBase, { verb_frob: () => {} })
    const obj = Object.create(prototypeDerived)
    const verbs = searchForVerbs(obj)
    verbs.sort()
    expect(verbs).toEqual(['frob', 'jump'])
  })

  it('filters verbs based on predicate methods', () => {
    const verbs = searchForVerbs({ verb_jump: () => {}, can_jump: () => false })
    expect(verbs).toEqual([])
  })

  it('finds inenumerable methods', () => {
    const obj = {}
    Object.defineProperty(obj, 'verb_search', {
      enumerable: false,
      value: () => {},
    })
    expect(searchForVerbs(obj)).toEqual(['search'])
  })
})
