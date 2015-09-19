/* eslint-env mocha */

import expect from 'expect'
import Immutable from 'immutable'
import {
  TYPE_KEY, READER_KEY,
  CURRENT_EVENT_KEY, CURRENT_ROOM_KEY,
  EVENT_TYPE, ROOM_TYPE,
} from 'watif/universal-constants'

import {
  triggerEvent, setCurrentRoom,
} from 'watif/manipulators'

describe('triggerEvent', () => {
  it('updates current event in reader', () => {
    const context = {id: 'foo'}
    const priorState = Immutable.fromJS({
      objects: {start: {[TYPE_KEY]: EVENT_TYPE}},
    })
    const nextState = triggerEvent('start').call(context, priorState)
    expect(nextState.getIn([READER_KEY, CURRENT_EVENT_KEY])).toBe('start')
  })

  it('throws if event does not exist', () => {
    const context = {id: 'foo'}
    const priorState = Immutable.fromJS({
      objects: {start: {[TYPE_KEY]: EVENT_TYPE}},
    })
    expect(() => triggerEvent('does-not-exist').call(context, priorState)).toThrow()
  })

  it('throws if object is not an event', () => {
    const context = {id: 'foo'}
    const priorState = Immutable.fromJS({
      objects: {start: {[TYPE_KEY]: ROOM_TYPE}},
    })
    expect(() => triggerEvent('start').call(context, priorState)).toThrow()
  })
})

describe('setCurrentRoom', () => {
  it('updates current room in reader', () => {
    const context = {id: 'foo'}
    const priorState = Immutable.fromJS({
      objects: {room: {[TYPE_KEY]: ROOM_TYPE}},
    })
    const nextState = setCurrentRoom('room').call(context, priorState)
    expect(nextState.getIn([READER_KEY, CURRENT_ROOM_KEY])).toBe('room')
  })

  it('throws if room does not exist', () => {
    const context = {id: 'foo'}
    const priorState = Immutable.fromJS({
      objects: {room: {[TYPE_KEY]: ROOM_TYPE}},
    })
    expect(() => setCurrentRoom('non-existent').call(context, priorState)).toThrow()
  })

  it('throws if object is not a room', () => {
    const context = {id: 'foo'}
    const priorState = Immutable.fromJS({
      objects: {room: {[TYPE_KEY]: EVENT_TYPE}},
    })
    expect(() => setCurrentRoom('room').call(context, priorState)).toThrow()
  })
})
