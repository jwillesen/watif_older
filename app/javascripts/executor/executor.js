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

  universe () {
    return this._universe.getState()
  }

  start () {
    this._universe.dispatch(actions.startStory(UC.INTRODUCTION_KEY))
  }

  executeVerb (verbFromReader) {
    this._universe.dispatch(actions.executeVerb(verbFromReader))
  }

  selectItem (itemId) {
    this._universe.dispatch(actions.selectItem(itemId))
  }

  generateVerbContent (watifObject, verb) {
    return {
      [UC.ID_KEY]: verb.get(UC.ID_KEY),
      [UC.NAME_KEY]: verb.get(UC.NAME_KEY),
      [UC.OBJECT_KEY]: watifObject.get(UC.ID_KEY),
    }
  }

  generateVerbsContent (watifObject) {
    const verbs = watifObject.get(UC.VERBS_KEY)
    if (!verbs) return []
    return verbs.map(verb => this.generateVerbContent(watifObject, verb)).toJS()
  }

  generateFieldContent (watifObject) {
    return {
      [UC.ID_KEY]: watifObject.get(UC.ID_KEY),
      [UC.NAME_KEY]: watifObject.get(UC.NAME_KEY),
      [UC.DESCRIPTION_KEY]: watifObject.get(UC.DESCRIPTION_KEY),
      [UC.VERBS_KEY]: this.generateVerbsContent(watifObject),
    }
  }

  generateUiField (universe, fieldKey) {
    const currentObjectId = universe.getIn([UC.READER_KEY, fieldKey])
    const currentObject = universe.getIn([UC.OBJECTS_KEY, currentObjectId])
    if (currentObject) return {[fieldKey]: this.generateFieldContent(currentObject)}
  }

  generateUiState () {
    const universe = this._universe.getState()
    return {
      ...this.generateUiField(universe, UC.CURRENT_EVENT_KEY),
      ...this.generateUiField(universe, UC.CURRENT_ROOM_KEY),
      ...this.generateUiField(universe, UC.CURRENT_ITEM_KEY),
    }
  }

  _stateChanged () {
    this._updateReader(this.generateUiState())
  }
}
