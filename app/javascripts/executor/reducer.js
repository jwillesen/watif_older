import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import * as actions from './actions'
import {
  ID_KEY, OBJECT_KEY, VERBS_KEY, ACTION_KEY, OBJECTS_KEY, READER_KEY,
  CURRENT_EVENT_KEY, CURRENT_ITEM_KEY, TYPE_KEY,
  INTRODUCTION_ID, ITEM_TYPE, EVENT_TYPE,
} from 'watif/universal-constants'

function handleStartStory (universe, action) {
  const intro = universe.getIn([OBJECTS_KEY, INTRODUCTION_ID])
  if (!intro) throw Error(`could not find event: ${INTRODUCTION_ID}`)
  if (intro.get(TYPE_KEY) !== EVENT_TYPE) throw Error(`${INTRODUCTION_ID} object is not an ${EVENT_TYPE}`)
  return universe.setIn([READER_KEY, CURRENT_EVENT_KEY], INTRODUCTION_ID)
}

function handleExecuteVerb (universe, action) {
  const readerVerb = action.payload

  const objectKey = readerVerb[OBJECT_KEY]
  const mainTargetObject = universe.getIn([OBJECTS_KEY, objectKey])
  if (!mainTargetObject) throw Error(`could not find object: "${objectKey}"`)

  const verbKey = readerVerb[ID_KEY]
  const targetVerb = mainTargetObject.get(VERBS_KEY).find(verb => verb.get(ID_KEY) === verbKey)
  if (!targetVerb) throw Error(`could not find verb: "${verbKey}"`)

  let actions = targetVerb.get(ACTION_KEY)
  if (typeof actions === 'function') actions = Immutable.List.of(actions)

  const nextUniverse = actions.reduce(
    (priorUniverse, action) => action.call(mainTargetObject, priorUniverse),
    universe,
    this)
  return nextUniverse
}

function handleSelectItem (universe, action) {
  const itemId = action.payload
  const item = universe.getIn([OBJECTS_KEY, itemId])
  if (!item) throw Error(`could not find item: ${itemId}`)
  if (item.get(TYPE_KEY) !== ITEM_TYPE) throw Error(`${itemId} object is not an ${ITEM_TYPE}`)
  return universe.setIn([READER_KEY, CURRENT_ITEM_KEY], itemId)
}

const actionHandler = handleActions({
  [actions.START_STORY]: handleStartStory,
  [actions.EXECUTE_VERB]: handleExecuteVerb,
  [actions.SELECT_ITEM]: handleSelectItem,
})

export default function reducer (universe, action) {
  if (universe === undefined) throw Error('explicit initial state required')

  // every action clears this because we don't want the UI to print the same event twice
  let nextUniverse = universe.deleteIn([READER_KEY, CURRENT_EVENT_KEY])

  nextUniverse = actionHandler(nextUniverse, action)
  return nextUniverse
}
