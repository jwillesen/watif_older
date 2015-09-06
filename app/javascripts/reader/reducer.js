import {combineReducers} from 'redux'
import {handleActions} from 'redux-actions'

import * as actions from './actions'

const DEFAULT_TEXT_AREA = {text: '', verbs: []}

function updateLog (state, action) {
  const newLog = action.payload.log
  return {
    text: state.text + newLog.text,
    verbs: newLog.verbs,
  }
}

const readerReducers = {
  log: handleActions({
    [actions.UPDATE_INTERFACE]: updateLog,
  }, DEFAULT_TEXT_AREA),
}

export const reducer = combineReducers(readerReducers)
