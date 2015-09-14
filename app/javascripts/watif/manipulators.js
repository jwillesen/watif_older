import {TYPE_KEY, OBJECTS_KEY, READER_KEY, CURRENT_EVENT_KEY, EVENT_TYPE} from './universal-constants'

export function triggerEvent (eventKey) {
  return function (universe) {
    const event = universe.getIn([OBJECTS_KEY, eventKey])
    if (!event || event.get(TYPE_KEY) !== EVENT_TYPE) {
      throw new Error(`unrecognized event "${eventKey}" referenced from "${this.key}"`)
    }
    return universe.setIn([READER_KEY, CURRENT_EVENT_KEY], eventKey)
  }
}
