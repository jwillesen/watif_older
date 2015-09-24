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
  if (action.payload[UC.CURRENT_EVENT_KEY]) {
    return history.concat(createEventHistory(action.payload[UC.CURRENT_EVENT_KEY]))
  }
  return history
}

function appendCommandToHistory (history, action) {
  return history.concat(createCommandHistory(action.payload))
}

function currentEventVerbs (state, action) {
  const currentEvent = action.payload[UC.CURRENT_EVENT_KEY]
  if (!currentEvent) return []
  return currentEvent[UC.VERBS_KEY] || []
}

const readerReducers = {
  log: combineReducers({
    history: handleActions({
      [actions.UPDATE_INTERFACE]: appendEventToHistory,
      [actions.VERB_COMMAND]: appendCommandToHistory,
    }, []),

    currentVerbs: handleActions({
      [actions.UPDATE_INTERFACE]: currentEventVerbs,
    }, []),
  }),

  'current-room': handleActions({
    [actions.UPDATE_INTERFACE]: (state, action) => action.payload[UC.CURRENT_ROOM_KEY] || {},
  }, {}),

  'current-item': handleActions({
    [actions.UPDATE_INTERFACE]: (state, action) => action.payload[UC.CURRENT_ITEM_KEY] || {},
  }, {}),

  'inventory': handleActions({
    [actions.UPDATE_INTERFACE]: (state, action) => action.payload[UC.INVENTORY_KEY] || [],
  }, []),
}

export const reducer = combineReducers(readerReducers)
