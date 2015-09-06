import {createStore} from 'redux'
import * as actions from './actions'
import reducer from './reducer'

import {introduction} from 'book'

function optionPresent (options, option) {
  return !options[option] ? option + ' is required' : []
}

function validateOptions (options) {
  let errors = []
  errors = errors.concat(optionPresent(options, 'updateReader'))

  if (errors.length) throw errors
}

export class Executor {
  constructor (options) {
    validateOptions(options)

    this._options = options
    this._store = createStore(reducer)
    this._unsubscribeFromStore = this._store.subscribe(() => this._stateChanged())
  }

  executeVerb (verb) {
    this._store.dispatch(verb)
  }

  start () {
    this._store.dispatch(actions.setLog(introduction))
  }

  _stateChanged () {
    const state = this._store.getState()
    this._options.updateReader(state.reader)
  }
}
