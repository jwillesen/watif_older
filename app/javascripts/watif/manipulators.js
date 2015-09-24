import {
  TYPE_KEY, OBJECTS_KEY, READER_KEY, CURRENT_EVENT_KEY, CURRENT_ROOM_KEY,
  STATE_KEY, LOCATION_KEY,
  EVENT_TYPE, ROOM_TYPE, ITEM_TYPE,
  INVENTORY_LOCATION,
} from './universal-constants'

function findObject (universe, objectKey) {
  return universe.getIn([OBJECTS_KEY, objectKey])
}

function isType (object, type) {
  return object && object.get(TYPE_KEY) === type
}

function findValidObject (universe, objectKey, objectType) {
  const object = findObject(universe, objectKey)
  if (!isType(object, objectType)) {
    throw new Error(
      `unrecognized ${objectType} "${objectKey}" referenced from "${this.id}"`
    )
  }
  return object
}

export function triggerEvent (eventKey) {
  return function (universe) {
    findValidObject.call(this, universe, eventKey, EVENT_TYPE)
    return universe.setIn([READER_KEY, CURRENT_EVENT_KEY], eventKey)
  }
}

export function setCurrentRoom (roomKey) {
  return function (universe) {
    findValidObject.call(this, universe, roomKey, ROOM_TYPE)
    return universe.setIn([READER_KEY, CURRENT_ROOM_KEY], roomKey)
  }
}

export function takeItem (itemKey) {
  return function (universe) {
    findValidObject.call(this, universe, itemKey, ITEM_TYPE)
    return universe.setIn([OBJECTS_KEY, itemKey, STATE_KEY, LOCATION_KEY], INVENTORY_LOCATION)
  }
}
