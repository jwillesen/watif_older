import * as UC from './universal-constants'
import {findObject, isOpen} from './info'
import {cond} from 'cond'

const isType = (object, type) => {
  if (type) return object && object.get(UC.TYPE_KEY) === type
  return !!object
}

const checkValidObject = (universe, target, objectKey, objectType) => {
  const object = findObject(universe, objectKey)
  if (!isType(object, objectType)) {
    throw new Error(
      `unrecognized ${objectType} "${objectKey}" referenced from "${target.get(UC.ID_KEY)}"`
    )
  }
  return object
}

export const doAll = (...args) => {
  return (universe, target) => {
    // TODO: this is a repeat of what's in executor reducer
    const nextUniverse = args.reduce(
      (priorUniverse, action) => action(priorUniverse, target),
      universe)
    return nextUniverse
  }
}

export const setState = (stateKey, stateValue) => {
  return (universe, target) => universe.setIn(
    [UC.OBJECTS_KEY, target.get(UC.ID_KEY), UC.STATE_KEY, stateKey],
    stateValue)
}

export const setStateOf = (objectId, stateKey, stateValue) => {
  return (universe, target) => {
    const object = findObject(universe, objectId)
    checkValidObject(universe, target, objectId)
    return setState(stateKey, stateValue)(universe, object)
  }
}

export const triggerEvent = (eventKey) => {
  return (universe, target) => {
    checkValidObject(universe, target, eventKey, UC.EVENT_TYPE)
    return universe.setIn([UC.READER_KEY, UC.CURRENT_EVENT_KEY], eventKey)
  }
}

export const setCurrentRoom = (roomKey) => {
  return (universe, target) => {
    checkValidObject(universe, target, roomKey, UC.ROOM_TYPE)
    return universe.setIn([UC.READER_KEY, UC.CURRENT_ROOM_KEY], roomKey)
  }
}

export const takeItem = (itemKey) => {
  return (universe, target) => {
    itemKey = itemKey || target.get(UC.ID_KEY)
    checkValidObject(universe, target, itemKey, UC.ITEM_TYPE)
    return setStateOf(itemKey, UC.LOCATION_KEY, UC.INVENTORY_LOCATION)(universe, target)
  }
}

export const openItem = (itemKey) => {
  return (universe, target) => {
    itemKey = itemKey || target.get(UC.ID_KEY)
    checkValidObject(universe, target, itemKey, UC.ITEM_TYPE)
    return setStateOf(itemKey, UC.OPEN_KEY, true)(universe, target)
  }
}

export const closeItem = (itemKey) => {
  return (universe, target) => {
    itemKey = itemKey || target.get(UC.ID_KEY)
    checkValidObject(universe, target, itemKey, UC.ITEM_TYPE)
    return setStateOf(itemKey, UC.OPEN_KEY, false)(universe, target)
  }
}

export const setLocation = (locationId) => setState(UC.LOCATION_KEY, locationId)
export const setLocationOf = (itemId, locationId) => setStateOf(itemId, UC.LOCATION_KEY, locationId)

export const listContentsIfOpen = () => {
  return cond(isOpen()).then(listContents())
}

export const listContents = () => {
  return (universe, target) => {
    return `<contents of container goes here>`
  }
}
