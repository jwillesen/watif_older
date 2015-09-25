import {event, room, item, verb} from 'watif/objects'
import {triggerEvent, takeItemVerb} from 'watif/manipulators'

export default [
  event('wave-goodbye', {
    description: `You turn around to wave goodbye to your Dad, but he's already gone.`,
  }),

  event('knock-on-door', {
    description: `You knock loudly on the door with the knocker, but no one answers.`,
  }),

  room('front-porch', {
    name: 'Front Porch',
    description: `
You're standing on the front porch, facing the [front door|front-door-outside].
Along the path leading to the porch is a set of [decorative rocks|decorative-rocks].
`,
    verbs: [],
  }),

  item('introductory-note', {
    name: "Amanda Baker's Note",
    description: `A note from Amanda Baker`,
  }),

  item('front-door-outside', {
    name: 'Front Door',
    description: `It's just a normal front door with a knocker. You've seen it many times.`,
    verbs: [verb('knock', triggerEvent('knock-on-door'))],
  }),

  item('decorative-rocks', {
    name: 'Decorative Rocks',
    description: `
Along the path you see a set of white, evenly spaced rocks, each about the size of your fist.
`,
    verbs: [takeItemVerb()],
  }),
]
