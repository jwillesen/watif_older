import {combineReducers} from 'redux'
import {handleActions} from 'redux-actions'
import * as UC from 'watif/universal-constants'

import * as actions from './actions'

export function createEventHistory (event) {
  return {type: 'event', payload: event}
}

export function createCommandHistory (command) {
  return {type: 'command', payload: command}
}

function appendEventToHistory (history, action) {
  return history.concat(createEventHistory(action.payload[UC.CURRENT_EVENT_KEY]))
}

function appendCommandToHistory (history, action) {
  return history.concat(createCommandHistory(action.payload))
}

const readerReducers = {
  log: combineReducers({
    history: handleActions({
      [actions.UPDATE_INTERFACE]: appendEventToHistory,
      [actions.VERB_COMMAND]: appendCommandToHistory,
    }, []),

    currentVerbs: handleActions({
      [actions.UPDATE_INTERFACE]: (state, action) => action.payload[UC.CURRENT_EVENT_KEY][UC.VERBS_KEY] || [],
    }, []),
  }),
}

export const reducer = combineReducers(readerReducers)
