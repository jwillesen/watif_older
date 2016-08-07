import augment from 'watif/augment'

export default class Item {
  constructor (universe) {
    // protect this property from derived classes, but let them read it
    Object.defineProperty(this, 'universe', {value: universe})
  }

  static augment (mixin) {
    return augment(this, mixin)
  }

  describe () {
    const klass = Object.getPrototypeOf(this)
    this.showError(`The item ${klass.name} needs a description`)
    return klass.name
  }

  showError (errorString) {
    return this.universe.showError(errorString)
  }

  findPlayer () {
    return this.universe.findPlayer()
  }

  findItem (itemName) {
    return this.universe.findItem(itemName)
  }

  relocate (newLocation) {
    return this.universe.relocate(this, newLocation)
  }

  event (eventDescription) {
    return this.universe.event(eventDescription)
  }
}
