import {createAction} from 'redux-actions'

export const START_STORY = 'START_STORY'
export const startStory = createAction(START_STORY)

export const EXECUTE_VERB = 'EXECUTE_VERB'
export const executeVerb = createAction(EXECUTE_VERB)

export const SELECT_ITEM = 'SELECT_ITEM'
export const selectItem = createAction(SELECT_ITEM)
