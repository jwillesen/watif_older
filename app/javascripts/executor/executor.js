import {createStore} from 'redux'
const checker = require('api-check')()
import * as UC from 'watif/universal-constants'
import * as actions from './actions'
import reducer from './reducer'
import createReaderState from './create-reader-update'

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

  _stateChanged () {
    this._updateReader(createReaderState(this.universe()))
  }
}
