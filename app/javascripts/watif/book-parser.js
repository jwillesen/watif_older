import Immutable from 'immutable'
import {validateObject} from './objects'
import {
  KEY_KEY, READER_KEY, OBJECTS_KEY, PLAYER_KEY,
  CURRENT_EVENT_KEY, CURRENT_ROOM_KEY, CURRENT_ITEM_KEY,
} from './universal-constants'

function convertToKeymap (objects) {
  if (!objects) return {}
  return objects.reduce((map, obj) => {
    map[obj[KEY_KEY]] = obj
    return map
  }, {})
}

// function convertVerbsToKeymap (object) {
//   return {...object, verbs: convertToKeymap(object.verbs)}
// }

export function initialEmptyState () {
  return {
    [READER_KEY]: {
      [CURRENT_EVENT_KEY]: '',
      [CURRENT_ROOM_KEY]: '',
      [CURRENT_ITEM_KEY]: '',
    },
    [OBJECTS_KEY]: {},
    [PLAYER_KEY]: {},
  }
}

export function loadBook (watifObjects) {
  watifObjects.forEach((obj) => validateObject(obj))
  // const verbedObjects = watifObjects.map(convertVerbsToKeymap)
  // const keyedObjects = convertToKeymap(verbedObjects)
  const keyedObjects = convertToKeymap(watifObjects)

  const bookState = initialEmptyState()
  bookState[OBJECTS_KEY] = keyedObjects
  return Immutable.fromJS(bookState)
}
