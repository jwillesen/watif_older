// hmm... it would be nice to not have to pass arguments through these
// user defined functions all the time. But that would require some kind of
// "context" mechanism, like react has, yes? Can't use "this" mechanism because
// they might want to use arrow functions.

// might be worth doing this context thing since this is supposed to be user
// friendly code.

import {triggerEvent, setLocationOf, setStateOf} from 'watif/manipulators'
import {getStateOf, locationOf} from 'watif/info'

export const introduction = {
  description: `
When you agreed to house sit for the Bakers, you didn't know what you were getting into.
`,

  // I'm not sure I like this type of syntax, but it would allow for chaining
  // of events.
  start (context) {
    context.triggerEvent('startStory')
  },
}

export const startStory = {
  description: `
Your father has just dropped you off in front of the Bakers' house.
`,
}

// for things like this, though, we'd lke to be able to pass in parameters, right?
export const takeItem = {
  description (universe, action) {
    return `you take the %{action.payload.name}`
  },
}

export const waveGoodbye =
"You turn around to wave goodbye to your Dad, but he's already gone."

export const frontPorch = {
  name: 'Front Porch',

  description (universe, target) {
    let text = `
You're standing on the front porch, facing the [front door|frontDoorOutside].
Along the path leading to the porch lie a set of [decorative rocks|decorativeRocks]
`
    if (locationOf(universe, 'introductoryNote', 'location') === target.id) { // or 'frontPorch'
      text = text + `
There is a [folded piece of paper|introductoryNote] on the ground.
`
    }
    return text
  },

  // verbs can be either objects or functions, kind of how react works
  knock: {
    enabled (universe, target) {
      return !getStateOf(universe, target.id, 'knocked')
    },

    action (universe, target) {
      // Do we want to force people to remember this pattern?
      // Should returning undefined be a valid way to say "no changes"?
      let nextUniverse = universe
      if (locationOf('introductoryNote') === 'frontDoorOutside') {
        // not sure I like this -- seems like I'd just want to chain these
        // somehow. But then how would people define their own manipulators?
        nextUniverse = triggerEvent(universe, 'fallingNote')
        nextUniverse = setLocationOf(universe, 'introductoryNote', 'frontPorch')
      } else if (!getStateOf(universe, target.id, 'knocked')) {
        nextUniverse = triggerEvent(universe, 'knockOnDoor')
        nextUniverse = setStateOf(universe, target.id, 'knocked', true)
      }
      // else, this shouldn't have been called because it wasn't enabled
      return nextUniverse
    },
  },
}
