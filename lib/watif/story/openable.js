import {canCallCheck} from './utils'

export default Base => class Openable extends Base {
  isOpen () { return !!this.getState('open') }

  canOpen () {
    return canCallCheck(this, super.canOpen, true)
  }

  verbOpen () {
    this.setState('open', true)
  }

  canClose () {
    if (super.canClose) return super.canClose()
    else return true
  }

  verbClose () {
    this.setState('close', true)
  }
}
