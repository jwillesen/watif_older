export default function augment (Base, Mixin) {
  const NewClass = class extends Base {}
  Object.getOwnPropertyNames(Mixin.prototype).forEach(name => {
    const propertyDescriptor = Object.getOwnPropertyDescriptor(Mixin.prototype, name)
    Object.defineProperty(NewClass.prototype, name, propertyDescriptor)
  })
  return NewClass
}

// class MixA { a () { console.log('mix A') } }
// class MixB { b () { console.log('mix B') } }
// class Base {
//   static augment (Mixin) { return augment(this, Mixin) }
//   base () { console.log('base') }
// }
//
// class Mixed extends Base
//   .augment(MixA)
//   .augment(MixB) {
//   mixed () { console.log('mixed') }
// }
//
// m = new Mixed()
// m.base()
// m.a()
// m.b()
// m.mixed()
