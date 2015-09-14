import {event, verb} from 'watif/objects'
import {triggerEvent} from 'watif/manipulators'

export default [
  event('introduction', {
    description: `When you agreed to house sit for the Bakers', you didn't know what you were getting into.`,
    verbs: [verb('start', triggerEvent('start-story'))],
  }),

  event('start-story', {
    description: `Your Father has just dropped you off in front of the Bakers' house.`,
    verbs: [
      verb('wave', triggerEvent('wave-goodbye')),
      verb('knock on door', triggerEvent('knock-on-door')),
    ],
  }),
]
