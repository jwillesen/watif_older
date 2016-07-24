/* eslint-disable camelcase */

import {canCallCheck} from 'utils'

export default class Lockable {
  isLocked () { return this.getState('locked') }

  can_lock () { return canCallCheck(this, super.can_lock, !this.isLocked()) }
  verb_lock () {
    this.setState('locked', true)
  }

  can_unlock () {
    const playerHasKey = this.keyForLock &&
      this.findItem(this.keyForLock()).location() === 'inventory'
    if (!playerHasKey) return false
    return canCallCheck(this, super.can_unlock, this.isLocked())
  }

  verb_unlock () {
    this.setState('locked', false)
  }

  // interop with Openable
  // either this overrides Openable's can_lock,
  // or Openable's can_lock calls this from super,
  // or this is not openable, in which case this function should never be called
  can_open () {
    return !this.getState('locked')
  }
}
