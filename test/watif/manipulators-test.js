/* eslint-env mocha */

import expect from 'expect'
import Immutable from 'immutable'
import {
  TYPE_KEY, READER_KEY, OBJECTS_KEY, STATE_KEY, LOCATION_KEY,
  CURRENT_EVENT_KEY, CURRENT_ROOM_KEY,
  EVENT_TYPE, ROOM_TYPE,
  INVENTORY_LOCATION,
} from 'watif/universal-constants'

import {item} from 'watif/objects'

import {
  triggerEvent, setCurrentRoom, takeItem,
} from 'watif/manipulators'

function mockContext () {
  return {id: 'mock'}
}

describe('triggerEvent', () => {
  it('updates current event in reader', () => {
    const priorState = Immutable.fromJS({
      objects: {start: {[TYPE_KEY]: EVENT_TYPE}},
    })
    const nextState = triggerEvent('start').call(mockContext(), priorState)
    expect(nextState.getIn([READER_KEY, CURRENT_EVENT_KEY])).toBe('start')
  })

  it('throws if event does not exist', () => {
    const priorState = Immutable.fromJS({
      objects: {start: {[TYPE_KEY]: EVENT_TYPE}},
    })
    expect(() => triggerEvent('does-not-exist').call(mockContext(), priorState)).toThrow()
  })

  it('throws if object is not an event', () => {
    const priorState = Immutable.fromJS({
      objects: {start: {[TYPE_KEY]: ROOM_TYPE}},
    })
    expect(() => triggerEvent('start').call(mockContext(), priorState)).toThrow()
  })
})

describe('setCurrentRoom', () => {
  it('updates current room in reader', () => {
    const priorState = Immutable.fromJS({
      objects: {room: {[TYPE_KEY]: ROOM_TYPE}},
    })
    const nextState = setCurrentRoom('room').call(mockContext(), priorState)
    expect(nextState.getIn([READER_KEY, CURRENT_ROOM_KEY])).toBe('room')
  })

  it('throws if room does not exist', () => {
    const priorState = Immutable.fromJS({
      objects: {room: {[TYPE_KEY]: ROOM_TYPE}},
    })
    expect(() => setCurrentRoom('non-existent').call(mockContext(), priorState)).toThrow()
  })

  it('throws if object is not a room', () => {
    const priorState = Immutable.fromJS({
      objects: {room: {[TYPE_KEY]: EVENT_TYPE}},
    })
    expect(() => setCurrentRoom('room').call(mockContext(), priorState)).toThrow()
  })
})

describe('takeItem', () => {
  it('sets location to inventory', () => {
    const priorState = Immutable.fromJS({
      objects: {item: item('item', {description: 'an item'})},
    })
    const nextState = takeItem('item').call(mockContext(), priorState)
    expect(nextState.getIn(
      [OBJECTS_KEY, 'item', STATE_KEY, LOCATION_KEY])
    ).toBe(INVENTORY_LOCATION)
  })
})
