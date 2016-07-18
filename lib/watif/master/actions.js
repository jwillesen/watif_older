import {createAction} from 'redux-actions'

export const SELECT_ITEM = 'SELECT_ITEM'
export const selectItem = createAction(SELECT_ITEM, (universe, item) => {
  const description = item.description(universe)
  return { item, description }
})

export const DISPLAY_ERROR = 'DISPLAY_ERROR'
export const displayError = createAction(DISPLAY_ERROR)
