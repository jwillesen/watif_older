import React from 'react'
import {Item, Room, Openable, Lockable} from 'watif/story'

export class FrontPorch extends Room {
  describe () {
    return <text>
      Ivy covers the entire right side of the porch. It would take a lot of work to make it usable again.
      On the left side is <item id={FrontDoor}>an old door.</item>
    </text>
  }
}

export class RustyKey extends Item
// .augment(Takeable)
{
  describe () { return 'a large, rusty key' } // note the possible return of a string instead of a <text> element
}

export class FrontDoor extends Item
.augment(Openable)
.augment(Lockable)
{
  traverses () { return ['FrontPorch', 'LivingRoom'] }
  describe () {
    return <text>
      The front door is old and deeply weathered. It looks like it hasn't been opened in years.
    </text>
  }

  keyForLock () { return 'RustyKey' }
  unlockEvent () {
    this.findItem('RustyKey').relocate(null)
    return <text>
      The rusted lock resists turning and squeaks loudly as you force the key to turn.
      Finally there is a satisfying click and the lock drops free. The key, however,
      won't pull free from the lock. You leave both behind.
    </text>
  }

  canUnlock () {
    const unlockable = super.canUnlock()
    if (unlockable) return true
    this.event(<text>
      The door is locked tight by a heavy iron lock. The lock looks pretty rusted, but it's still quite strong.
    </text>)
    return false
  }
  openEvent () { return <text>The door creaks open on rusty hinges.</text> }
}
