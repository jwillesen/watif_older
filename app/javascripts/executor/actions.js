import {createAction} from 'redux-actions'

export const EXECUTE_VERB = 'EXECUTE_VERB'
export const executeVerb = createAction(EXECUTE_VERB)

export const START_STORY = 'START_STORY'
export const startStory = createAction(START_STORY)
