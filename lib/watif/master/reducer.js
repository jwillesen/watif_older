import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import * as Actions from './actions'
import * as Const from './constants'

// Universe State: {
  // player: {
    // log: Immutable.List of Watext
    // room: Watext of current room description
    // item: Watext of current item description
    // error: Error string
  // },
  // items: {
    // "WoodenChest": {
      // item: instance of `new WoodenChest`,
      // state: {
        // location: 'SecretRoom', // an item id
        // contents: ['Lantern', 'IcePick'], // a list of item ids
        // locked: true, // other state defined by the item
        // broken: false,
      // },
    // },
  // },
// }

function identity (state, action) {
  return action.payload
}

const INITIAL_PLAYER_STATE = Immutable.fromJS({
  log: [],
  room: null,
  item: null,
  error: null,
})

const INITIAL_ITEM_STATE = Immutable.fromJS({
  [Const.LOCATION]: null,
  [Const.CONTENTS]: Immutable.OrderedSet(),
})

const INITIAL_STATE = Immutable.fromJS({
  [Const.PLAYER_STATE]: INITIAL_PLAYER_STATE,
  [Const.ITEMS]: {},
})

const playerLogReducer = handleActions({
  [Actions.ADD_LOG]: (state, action) => state.push(action.payload),
}, Immutable.List())

const playerRoomReducer = handleActions({
  [Actions.EXAMINE_ROOM]: identity,
}, null)

const playerItemReducer = handleActions({
  [Actions.EXAMINE_ITEM]: identity,
}, null)

const playerErrorReducer = handleActions({
  [Actions.DISPLAY_ERROR]: identity,
}, null)

const playerReducer = combineReducers({
  log: playerLogReducer,
  room: playerRoomReducer,
  item: playerItemReducer,
  error: playerErrorReducer,
})

function createItemReducer (state, action) {
  return state
    .setIn([action.payload.name, Const.ITEM], action.payload.item)
    .setIn([action.payload.name, Const.STATE], INITIAL_ITEM_STATE)
}

function relocateItemReducer (state, action) {
  const {itemId, newLocationId} = action.payload
  const itemLocationPath = [itemId, Const.STATE, Const.LOCATION]

  // remove item from the old container
  const oldLocationId = state.getIn(itemLocationPath)
  if (oldLocationId) {
    const oldLocationContentsPath = [oldLocationId, Const.STATE, Const.CONTENTS]
    const oldLocationContents = state
      .getIn(oldLocationContentsPath)
      .remove(itemId)
    state = state.setIn(oldLocationContentsPath, oldLocationContents)
  }

  // set location of item
  state = state.setIn([itemId, Const.STATE, Const.LOCATION], newLocationId)

  // add to contents of newLocation
  if (newLocationId) {
    const newLocationContentsPath = [newLocationId, Const.STATE, Const.CONTENTS]
    const newLocationContents = state
      .getIn(newLocationContentsPath)
      .add(itemId)
    state = state.setIn(newLocationContentsPath, newLocationContents)
  }

  return state
}

const itemReducer = handleActions({
  [Actions.SET_ITEMS]: identity,
  [Actions.CREATE_ITEM]: createItemReducer,
  [Actions.RELOCATE_ITEM]: relocateItemReducer,
}, Immutable.Map())

const partialReducer = combineReducers({
  player: playerReducer,
  items: itemReducer,
})

const globalReducer = handleActions({
})

export default function universalReducer (state, action) {
  if (state === undefined) return INITIAL_STATE

  state = globalReducer(state, action)
  state = partialReducer(state, action)

  return state
}
