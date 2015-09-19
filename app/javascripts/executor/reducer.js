import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import * as actions from './actions'
import {
  OBJECT_KEY, VERBS_KEY, ACTION_KEY, OBJECTS_KEY, READER_KEY, CURRENT_EVENT_KEY, KEY_KEY
} from 'watif/universal-constants'

function handleStartStory (universe, action) {
  return universe.setIn([READER_KEY, CURRENT_EVENT_KEY], action.payload)
}

function handleExecuteVerb (universe, action) {
  const readerVerb = action.payload

  const objectKey = readerVerb[OBJECT_KEY]
  const mainTargetObject = universe.getIn([OBJECTS_KEY, objectKey])
  if (!mainTargetObject) throw Error(`could not find object: "${objectKey}"`)

  const verbKey = readerVerb[KEY_KEY]
  const targetVerb = mainTargetObject.get(VERBS_KEY).find(verb => verb.get(KEY_KEY) === verbKey)
  if (!targetVerb) throw Error(`could not find verb: "${verbKey}"`)

  let actions = targetVerb.get(ACTION_KEY)
  if (typeof actions === 'function') actions = Immutable.List.of(actions)

  const nextUniverse = actions.reduce(
    (priorUniverse, action) => action.call(this, priorUniverse),
    universe,
    this)
  return nextUniverse
}

const reducer = handleActions({
  [actions.START_STORY]: handleStartStory,
  [actions.EXECUTE_VERB]: handleExecuteVerb,
}, 'blahfrogduckchicken')

export default reducer
