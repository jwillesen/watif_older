import {createAction} from 'redux-actions'
import {INVENTORY} from './constants'

// Player Actions

export const ADD_LOG = 'ADD_LOG'
export const addLog = createAction(ADD_LOG)

export const EXAMINE_ITEM = 'EXAMINE_ITEM'
export const examineItem = createAction(EXAMINE_ITEM)

export const EXAMINE_ROOM = 'EXAMINE_ROOM'
export const examineRoom = createAction(EXAMINE_ROOM)

export const DISPLAY_ERROR = 'DISPLAY_ERROR'
export const displayError = createAction(DISPLAY_ERROR)

// Universe Actions

export const SET_ITEMS = 'SET_ITEMS'
export const setItems = createAction(SET_ITEMS)

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
