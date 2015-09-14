import {createAction} from 'redux-actions'

export const EXECUTE_VERB = 'EXECUTE_VERB'
export const executeVerb = createAction(EXECUTE_VERB)

export const SET_CURRENT_EVENT = 'SET_CURRENT_EVENT'
export const setCurrentEvent = createAction(SET_CURRENT_EVENT)
