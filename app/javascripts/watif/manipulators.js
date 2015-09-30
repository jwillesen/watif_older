import _ from 'lodash'
import {
  ID_KEY, TYPE_KEY, OBJECTS_KEY, READER_KEY, CURRENT_EVENT_KEY, CURRENT_ROOM_KEY,
  STATE_KEY, LOCATION_KEY,
  EVENT_TYPE, ROOM_TYPE, ITEM_TYPE,
  INVENTORY_LOCATION, TAKE_VERB_ID, TAKE_ITEM_EVENT_ID,
} from './universal-constants'
import {verb} from './objects'

function findObject (universe, objectKey) {
  return universe.getIn([OBJECTS_KEY, objectKey])
}

function isType (object, type) {
  return object && object.get(TYPE_KEY) === type
}

function checkValidObject (targetObject, universe, objectKey, objectType) {
  const object = findObject(universe, objectKey)
  if (!isType(object, objectType)) {
    throw new Error(
      `unrecognized ${objectType} "${objectKey}" referenced from "${targetObject.get(ID_KEY)}"`
    )
  }
  return object
}

export function triggerEvent (eventKey) {
  return function (targetObject, universe) {
    checkValidObject(targetObject, universe, eventKey, EVENT_TYPE)
    return universe.setIn([READER_KEY, CURRENT_EVENT_KEY], eventKey)
  }
}

export function setCurrentRoom (roomKey) {
  return function (targetObject, universe) {
    checkValidObject(targetObject, universe, roomKey, ROOM_TYPE)
    return universe.setIn([READER_KEY, CURRENT_ROOM_KEY], roomKey)
  }
}

export function takeItem (itemKey) {
  return function (targetObject, universe) {
    if (!itemKey) itemKey = targetObject.get(ID_KEY)
    checkValidObject(targetObject, universe, itemKey, ITEM_TYPE)
    return universe.setIn([OBJECTS_KEY, itemKey, STATE_KEY, LOCATION_KEY], INVENTORY_LOCATION)
  }
}

function isInInventory (target) {
  return target.getIn([STATE_KEY, LOCATION_KEY]) === INVENTORY_LOCATION
}

export function takeItemVerb (itemKey) {
  return verb(TAKE_VERB_ID,
    [takeItem(itemKey), triggerEvent(TAKE_ITEM_EVENT_ID)], {
      enabled: _.negate(isInInventory),
    }
  )
}
