import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import * as Actions from 'watif/master/actions'
import * as Const from 'watif/master/constants'

// Universe State: {
  // player: {
    // log: Immutable.List of Watext
    // room: Watext of current room description
    // item: Watext of current item description
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

const INITIAL_STATE = Immutable.fromJS({
  player: { // the structure that gets passed to the watif player for the gui
    log: [], // array of watext objects
    room: null, // watext description of the current room (if any)
    item: null, // watext description of the current item (if any)
  },
  items: {}, // maps item ids to item state and Item instances
})

const INITIAL_ITEM_STATE = Immutable.fromJS({
  [Const.LOCATION]: null,
  [Const.CONTAINS]: Immutable.OrderedSet(),
})

const playerReducer = handleActions({

}, {})

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
    const oldLocationContentsPath = [oldLocationId, Const.STATE, Const.CONTAINS]
    const oldLocationContents = state
      .getIn(oldLocationContentsPath)
      .remove(itemId)
    state = state.setIn(oldLocationContentsPath, oldLocationContents)
  }

  // set location of item
  state = state.setIn([itemId, Const.STATE, Const.LOCATION], newLocationId)

  // add to contents of newLocation
  if (newLocationId) {
    const newLocationContentsPath = [newLocationId, Const.STATE, Const.CONTAINS]
    const newLocationContents = state
      .getIn(newLocationContentsPath)
      .add(itemId)
    state = state.setIn(newLocationContentsPath, newLocationContents)
  }

  return state
}

const itemReducer = handleActions({
  [Actions.CREATE_ITEM]: createItemReducer,
  [Actions.RELOCATE_ITEM]: relocateItemReducer,
}, Immutable.Map())

const partialReducer = combineReducers({
  player: playerReducer,
  items: itemReducer,
})

function globalReducer (state, action) {
  return state
}

export default function reducer (state, action) {
  if (state === undefined) return INITIAL_STATE

  state = globalReducer(state, action)
  state = partialReducer(state, action)

  return state
}
