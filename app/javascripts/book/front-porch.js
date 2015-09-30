import {event, room, item, verb} from 'watif/objects'
import {
  doAll, triggerEvent, setState, setLocationOf, listContents,
} from 'watif/manipulators'
import {takeItemVerb, openVerb, closeVerb} from 'watif/common-verbs'
import {ifHere, isOpen, isInInventory, getState, getStateOf, getLocationOf} from 'watif/info'
import {cond} from 'cond'

export default [
  event('wave-goodbye', {
    description: `You turn around to wave goodbye to your Dad, but he's already gone.`,
  }),

  event('falling-note', {
    description: `As you lift the knocker to knock on the door, a folded piece of paper falls to the ground.`,
  }),

  event('knock-on-door', {
    description: `You knock loudly on the door with the knocker, but no one answers.`,
  }),

  room('front-porch', {
    name: 'Front Porch',
    verbs: [],
    description: [`
You're standing on the front porch, facing the [front door|front-door-outside].
Along the path leading to the porch is a set of [decorative rocks|decorative-rocks].
`,
ifHere('introductory-note').then(
  `There is a [folded piece of paper|introductory-note] on the ground.`
),
    ],
  }),

  item('introductory-note', {
    name: "Amanda Baker's Note",
    description: `A note from Amanda Baker`,
    verbs: [
      takeItemVerb(),
      verb('read',
        [setState('read', true)],
        {enabled: (getState('read').not()).and(isInInventory())}),
    ],
    state: {location: 'front-door-outside'},
  }),

  item('front-door-outside', {
    name: 'Front Door',
    description: `It's just a normal front door with a knocker. You've seen it many times.`,
    verbs: [
      verb(
        'knock',
        cond(getLocationOf('introductory-note').eq('front-door-outside'))
          .then(doAll(
            triggerEvent('falling-note'),
            setLocationOf('introductory-note', 'front-porch')))
          .else(doAll(
            triggerEvent('knock-on-door'),
            setState('knocked', true))),
        {enabled: getState('knocked').not()}
      ),
    ],
  }),

  item('decorative-rocks', {
    name: 'Decorative Rocks',
    description: [`
Along the path you see a set of white, evenly spaced rocks, each about the size of your fist.
`,
cond(getStateOf('introductory-note', 'read')).then(`
One of the rocks appears to be [plastic|plastic-rock].
`),
    ],
  }),

  item('plastic-rock', {
    name: 'Hide-A-Key',
    description: [
      `A plastic rock with a hidden compartment for storing a key.`,
      cond(getState('open')).then(listContents()),
    ],
    verbs: [
      takeItemVerb(),
      openVerb({enabled: (isOpen().not()).and(isInInventory())}),
      closeVerb({enabled: isOpen().and(isInInventory())}),
    ],
  }),
]
