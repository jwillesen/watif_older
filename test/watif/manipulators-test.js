/* eslint-env mocha */

import expect from 'expect'
import Immutable from 'immutable'
import * as UC from 'watif/universal-constants'
import {item} from 'watif/objects'
import {
  triggerEvent, setCurrentRoom, setState, setStateOf,
  takeItem, openItem, closeItem,
} from 'watif/manipulators'

function mockItem () {
  return Immutable.fromJS({id: 'mock'})
}

describe('triggerEvent', () => {
  it('updates current event in reader', () => {
    const priorState = Immutable.fromJS({
      objects: {start: {[UC.TYPE_KEY]: UC.EVENT_TYPE}},
    })
    const nextState = triggerEvent('start')(priorState, mockItem())
    expect(nextState.getIn([UC.READER_KEY, UC.CURRENT_EVENT_KEY])).toBe('start')
  })

  it('throws if event does not exist', () => {
    const priorState = Immutable.fromJS({
      objects: {start: {[UC.TYPE_KEY]: UC.EVENT_TYPE}},
    })
    expect(() => triggerEvent('does-not-exist')(priorState, mockItem())).toThrow()
  })

  it('throws if object is not an event', () => {
    const priorState = Immutable.fromJS({
      objects: {start: {[UC.TYPE_KEY]: UC.ROOM_TYPE}},
    })
    expect(() => triggerEvent('start')(priorState, mockItem())).toThrow()
  })
})

describe('setCurrentRoom', () => {
  it('updates current room in reader', () => {
    const priorState = Immutable.fromJS({
      objects: {room: {[UC.TYPE_KEY]: UC.ROOM_TYPE}},
    })
    const nextState = setCurrentRoom('room')(priorState, mockItem())
    expect(nextState.getIn([UC.READER_KEY, UC.CURRENT_ROOM_KEY])).toBe('room')
  })

  it('throws if room does not exist', () => {
    const priorState = Immutable.fromJS({
      objects: {room: {[UC.TYPE_KEY]: UC.ROOM_TYPE}},
    })
    expect(() => setCurrentRoom('non-existent')(priorState, mockItem())).toThrow()
  })

  it('throws if object is not a room', () => {
    const priorState = Immutable.fromJS({
      objects: {room: {[UC.TYPE_KEY]: UC.EVENT_TYPE}},
    })
    expect(() => setCurrentRoom('room')(priorState, mockItem())).toThrow()
  })
})

describe('setState', () => {
  it('modifies arbitrary state of context object', () => {
    const rock = item('rock', {description: 'a rock'})
    const priorState = Immutable.fromJS({
      objects: {rock: rock},
    })
    const nextState = setState('foo', 'bar')(priorState, Immutable.fromJS(rock))
    expect(nextState.getIn(
      [UC.OBJECTS_KEY, 'rock', UC.STATE_KEY, 'foo'])
    ).toBe('bar')
  })
})

describe('setStateOf', () => {
  it('modifies arbitrary state of specified object', () => {
    const rock = item('rock', {description: 'a rock'})
    const other = item('other', {description: 'other thing'})
    const priorState = Immutable.fromJS({objects: {rock, other}})
    const nextState = setStateOf('rock', 'broken', 'pieces')(priorState, Immutable.fromJS(other))
    expect(nextState.getIn(
      [UC.OBJECTS_KEY, 'other', UC.STATE_KEY, 'broken'])
    ).toNotExist()
    expect(nextState.getIn(
      [UC.OBJECTS_KEY, 'rock', UC.STATE_KEY, 'broken'])
    ).toBe('pieces')
  })
})

// could add tests for setLocation and setLocationOf, but they're just
// partial applications of setState and setStateOF

describe('takeItem', () => {
  it('sets location to inventory', () => {
    const priorState = Immutable.fromJS({
      objects: {item: item('item', {description: 'an item'})},
    })
    const nextState = takeItem('item')(priorState, mockItem())
    expect(nextState.getIn(
      [UC.OBJECTS_KEY, 'item', UC.STATE_KEY, UC.LOCATION_KEY])
    ).toBe(UC.INVENTORY_LOCATION)
  })

  it("defaults to the context's item id", () => {
    const priorState = Immutable.fromJS({
      objects: {mock: item('mock', {description: 'a mock object'})},
    })
    const nextState = takeItem()(priorState, mockItem())
    expect(nextState.getIn(
      [UC.OBJECTS_KEY, 'mock', UC.STATE_KEY, UC.LOCATION_KEY])
    ).toBe(UC.INVENTORY_LOCATION)
  })
})

describe('openItem', () => {
  it('sets open state to true', () => {
    const priorState = Immutable.fromJS({
      [UC.OBJECTS_KEY]: {'item': item('item', {description: 'an item'})},
    })
    const nextState = openItem('item')(priorState, mockItem())
    expect(nextState.getIn(
      [UC.OBJECTS_KEY, 'item', UC.STATE_KEY, UC.OPEN_KEY])
    ).toBe(true)
  })

  it('defaults to the context item', () => {
    const priorState = Immutable.fromJS({
      objects: {mock: item('mock', {description: 'a mock object'})},
    })
    const nextState = openItem()(priorState, mockItem())
    expect(nextState.getIn(
      [UC.OBJECTS_KEY, 'mock', UC.STATE_KEY, UC.OPEN_KEY])
    ).toBe(true)
  })
})

describe('closeItem', () => {
  it('sets open state to true', () => {
    const priorState = Immutable.fromJS({
      [UC.OBJECTS_KEY]: {'item': item('item', {
        description: 'an item',
        state: {open: true},
      })},
    })
    const nextState = closeItem('item')(priorState, mockItem())
    expect(nextState.getIn(
      [UC.OBJECTS_KEY, 'item', UC.STATE_KEY, UC.OPEN_KEY])
    ).toBe(false)
  })

  it('defaults to the context item', () => {
    const priorState = Immutable.fromJS({
      [UC.OBJECTS_KEY]: {'mock': item('mock', {
        description: 'a mock object',
        state: {open: true},
      })},
    })
    const nextState = closeItem()(priorState, mockItem())
    expect(nextState.getIn(
      [UC.OBJECTS_KEY, 'mock', UC.STATE_KEY, UC.OPEN_KEY])
    ).toBe(false)
  })
})
