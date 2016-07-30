/* eslint-disable camelcase */

import {canCallCheck} from 'utils'

export default Base => class Openable extends Base {
  isOpen () { return !!this.getState('open') }

  can_open () {
    return canCallCheck(this, super.can_open, true)
  }

  verb_open () {
    this.setState('open', true)
  }

  can_close () {
    if (super.can_close) return super.can_close()
    else return true
  }

  verb_close () {
    this.setState('close', true)
  }
}
