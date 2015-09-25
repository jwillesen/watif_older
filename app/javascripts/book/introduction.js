import {event, verb} from 'watif/objects'
import {triggerEvent, setCurrentRoom, takeItem} from 'watif/manipulators'

export default [
  event('introduction', {
    description: `
When you agreed to house sit for the Bakers, you didn't know what you were getting into.
    `,
    verbs: [
      verb('start', [
        triggerEvent('start-story'),
        setCurrentRoom('front-porch'),
        takeItem('introductory-note'),
      ]),
    ],
  }),

  event('start-story', {
    description: `Your Father has just dropped you off in front of the Bakers' house.`,
    verbs: [
      verb('wave', triggerEvent('wave-goodbye')),
    ],
  }),

  event('take-item', {
    description: `You got it.`,
  }),
]
