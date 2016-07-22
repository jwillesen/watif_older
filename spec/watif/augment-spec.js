/* eslint-env mocha */

import expect from 'expect'
import augment from 'watif/augment'

describe('augment', () => {
  it('supports dot syntax', () => {
    class MixA { a () { return 'a' }}
    class MixB { b () { return 'b' }}
    class Base {
      static augment (Mixin) { return augment(this, Mixin) }
      base () { return 'base' }
    }
    class Mixed extends Base
      .augment(MixA)
      .augment(MixB) {
      mixed () { return 'mixed' }
    }
    const m = new Mixed()
    expect(Mixed.augment).toExist()
    expect(m.a()).toBe('a')
    expect(m.b()).toBe('b')
    expect(m.base()).toBe('base')
    expect(m.mixed()).toBe('mixed')
  })

  it('allows overrides of mixin methods', () => {
    class MixA {
      a () { return 'a' }
      base () { return 'base override' }
    }
    class Base { base () { return 'base' } }
    class Custom extends augment(Base, MixA) {
      a () { return 'a override' }
      base () { return 'base override' }
    }
    const c = new Custom()
    expect(c.a()).toEqual('a override')
    expect(c.base()).toEqual('base override')
  })

  it('supports base class statics', () => {
    class MixA {}
    class Base { static sb () { return 'sb' }}
    class Mixed extends augment(Base, MixA) {}
    expect(Mixed.sb()).toBe('sb')
  })

  // this doesn't work yet
  it('supports mixin class statics')
  // it('supports mixin statics', () => {
  //   class MixA { static sa () { return 'sa' }}
  //   class Base {}
  //   class Mixed extends augment(Base, MixA) {}
  //   expect(Mixed.sa()).toBe('sa')
  // })
})
