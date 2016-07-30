/* eslint-env mocha */

import expect from 'expect'
import augment from 'watif/augment'

describe('augment', () => {
  it('supports dot syntax', () => {
    const MixA = Base => class extends Base { a () { return 'a' }}
    const MixB = Base => class extends Base { b () { return 'b' }}
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
    const MixA = Base => class extends Base {
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
    const MixA = (Base) => class MixA extends Base {}
    class Base { static sb () { return 'sb' }}
    class Mixed extends augment(Base, MixA) {}
    expect(Mixed.sb()).toBe('sb')
  })

  it('allows calls to super', () => {
    const mixSpy = expect.createSpy()
    const baseSpy = expect.createSpy()
    class Base { func () { baseSpy() }}
    const Mix = (Base) => class Mix extends Base {
      func () { mixSpy(); super.func() }
    }
    class D extends augment(Base, Mix) {}
    new D().func()
    expect(mixSpy).toHaveBeenCalled()
    expect(baseSpy).toHaveBeenCalled()
  })

  // this doesn't work yet
  it('supports mixin class statics', () => {
    const MixA = Base => class extends Base { static sm () { return 'sm' }}
    class Base {}
    class Mixed extends augment(Base, MixA) {}
    expect(Mixed.sm()).toBe('sm')
  })

  it('supports mixin statics', () => {
    const MixA = Base => class extends Base { static sa () { return 'sa' }}
    class Base {}
    class Mixed extends augment(Base, MixA) {}
    expect(Mixed.sa()).toBe('sa')
  })
})
