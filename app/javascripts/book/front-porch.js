import {event, room, item, verb} from 'watif/objects'
import {triggerEvent} from 'watif/manipulators'

export default [
  event('wave-goodbye', {
    description: `You turn around to wave goodbye to your Dad, but he's already gone.`,
  }),

  event('knock-on-door', {
    description: `You knock loudly on the door with the knocker, but no one answers.`,
  }),

  room('front-porch', {
    name: 'Front Porch',
    description: `You're standing on the front porch, facing the [front door|front-door-outside].`,
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
]
