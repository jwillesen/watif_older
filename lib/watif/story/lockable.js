import {canCallCheck} from './utils'

export default Base => class Lockable extends Base {
  isLocked () { return this.getState('locked') }

  canLock () { return canCallCheck(this, super.canLock, !this.isLocked()) }
  verbLock () {
    this.setState('locked', true)
  }

  canUnlock () {
    const playerHasKey = this.keyForLock &&
      this.findItem(this.keyForLock()).location() === 'inventory'
    if (!playerHasKey) return false
    return canCallCheck(this, super.canUnlock, this.isLocked())
  }

  verbUnlock () {
    this.setState('locked', false)
  }

  // interop with Openable
  // either this overrides Openable's canLock,
  // or Openable's canLock calls this from super,
  // or this is not openable, in which case this function should never be called
  canOpen () {
    return !this.getState('locked')
  }
}
