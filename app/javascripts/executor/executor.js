import {createStore} from 'redux'
const checker = require('api-check')()
import * as UC from 'watif/universal-constants'
import * as actions from './actions'
import reducer from './reducer'

const EXECUTOR_OPTIONS = checker.shape({
  updateReader: checker.func,
  initialState: checker.object,
}).strict

export class Executor {
  constructor (options) {
    checker.throw(EXECUTOR_OPTIONS, options)
    this._updateReader = options.updateReader
    this._universe = createStore(reducer, options.initialState)
    this._unsubscribeFromUniverse = this._universe.subscribe(() => this._stateChanged())
  }

  start () {
    const intro = this._universe.getState().getIn([UC.OBJECTS_KEY, UC.INTRODUCTION_KEY])
    if (!intro) throw new Error(`could not find event: ${UC.INTRODUCTION_KEY}`)
    if (intro.get(UC.TYPE_KEY) !== UC.EVENT_TYPE) throw new Error(`${UC.INTRODUCTION_KEY} object is not an ${UC.EVENT_TYPE}`)
    this._universe.dispatch(actions.setCurrentEvent(UC.INTRODUCTION_KEY))
  }

  executeVerb (verbFromReader) {
    this._universe.dispatch(actions.executeVerb(verbFromReader))
  }

  generateVerbContent (watifObject, verb) {
    return {
      [UC.KEY_KEY]: verb.get(UC.KEY_KEY),
      [UC.NAME_KEY]: verb.get(UC.NAME_KEY),
      [UC.OBJECT_KEY]: watifObject.get(UC.KEY_KEY),
    }
  }

  generateVerbsContent (watifObject) {
    const verbs = watifObject.get(UC.VERBS_KEY)
    if (!verbs) return []
    return verbs.map(verb => this.generateVerbContent(watifObject, verb)).toJS()
  }

  generateFieldContent (watifObject) {
    return {
      [UC.KEY_KEY]: watifObject.get(UC.KEY_KEY),
      [UC.NAME_KEY]: watifObject.get(UC.NAME_KEY),
      [UC.DESCRIPTION_KEY]: watifObject.get(UC.DESCRIPTION_KEY),
      [UC.VERBS_KEY]: this.generateVerbsContent(watifObject),
    }
  }

  generateUiState (universe) {
    const uiState = {}
    const currentEventKey = universe.getIn([UC.READER_KEY, UC.CURRENT_EVENT_KEY])
    const currentEvent = universe.getIn([UC.OBJECTS_KEY, currentEventKey])
    if (currentEvent) uiState[UC.CURRENT_EVENT_KEY] = this.generateFieldContent(currentEvent)

    return uiState
  }

  _stateChanged () {
    this._updateReader(this.generateUiState(this._universe.getState()))
  }
}
