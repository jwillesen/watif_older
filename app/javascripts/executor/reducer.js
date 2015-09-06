import {combineReducers} from 'redux'
import {handleActions} from 'redux-actions'

import * as actions from './actions'

const DEFAULT_READER_STATE = {text: '', verbs: []}

function fsaIdentity (state, action) {
  return action.payload
}

function universeReducer (state, action) {
  return state || {}
}

const readerReducers = {
  log: handleActions({
    [actions.SET_LOG]: fsaIdentity,
  }, DEFAULT_READER_STATE),
}

export default combineReducers({
  reader: combineReducers(readerReducers),
  universe: universeReducer,
})
