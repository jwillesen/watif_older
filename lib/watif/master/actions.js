import {createAction} from 'redux-actions'
import {INVENTORY} from './constants'

export const SELECT_ITEM = 'SELECT_ITEM'
export const selectItem = createAction(SELECT_ITEM, (universe, item) => {
  const description = item.description(universe)
  return { item, description }
})

export const DISPLAY_ERROR = 'DISPLAY_ERROR'
export const displayError = createAction(DISPLAY_ERROR)

export const CREATE_ITEM = 'CREATE_ITEM'
export const createItem = createAction(CREATE_ITEM, (ItemClass) => {
  const name = ItemClass.name
  const item = new ItemClass()
  return {name, item}
})

export const RELOCATE_ITEM = 'RELOCATE_ITEM'
export const relocateItem = createAction(RELOCATE_ITEM,
  (itemId, newLocationId) => ({itemId, newLocationId}))

export const takeItem = (itemId) => relocateItem(itemId, INVENTORY)
