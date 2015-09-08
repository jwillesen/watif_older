import {createStore} from 'redux'
import * as actions from './actions'
import reducer from './reducer'

import {introduction, events} from 'book'

function optionPresent (options, option) {
  return !options[option] ? option + ' is required' : []
}

function validateOptions (options) {
  let errors = []
  errors = errors.concat(optionPresent(options, 'updateReader'))

  if (errors.length) throw new TypeError(errors.join('\n'))
}

export class Executor {
  constructor (options) {
    validateOptions(options)

    this._options = options
    this._store = createStore(reducer)
    this._unsubscribeFromStore = this._store.subscribe(() => this._stateChanged())
  }

  start () {
    this._store.dispatch(actions.setLog(introduction))
  }

  executeVerb (verb) {
    const event = events[verb.action.type]
    if (event.log) this._store.dispatch(actions.setLog(event.log))
  }

  _stateChanged () {
    const state = this._store.getState()
    this._options.updateReader(state.reader)
  }
}
