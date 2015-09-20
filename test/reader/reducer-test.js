/* eslint-env mocha */

import expect from 'expect'
import * as actions from 'reader/actions'
import {reducer} from 'reader/reducer'
import * as UC from 'watif/universal-constants'

describe('reader reducer', () => {
  function initialState () {
    return reducer(undefined, {type: 'initialize'})
  }

  it('creates an initial state', () => {
    expect(initialState()).toExist()
  })

  it('appends events to log history', () => {
    const testEvent = {a: 1, b: 2, c: 3}
    const testCommand = {d: 4, e: 5, f: 6}

    let nextState = initialState()
    nextState = reducer(nextState, actions.updateInterface({
      [UC.CURRENT_EVENT_KEY]: testEvent,
    }))
    nextState = reducer(nextState, actions.verbCommand(testCommand))

    expect(nextState.log.history.length).toBe(2)
    expect(nextState.log.history[0].type).toBe('event')
    expect(nextState.log.history[0].payload).toEqual(testEvent)
    expect(nextState.log.history[1].type).toBe('command')
    expect(nextState.log.history[1].payload).toEqual(testCommand)
  })

  it("doesn't update log history if there is no event", () => {
    const nextState = reducer(nextState, actions.updateInterface({}))
    expect(nextState.log.history.length).toBe(0)
  })

  it('replaces verbs', () => {
    const testVerbs = ['foo', 'bar', 'baz']
    const testEvent = { [UC.VERBS_KEY]: testVerbs }
    const nextState = reducer(initialState(), actions.updateInterface({
      [UC.CURRENT_EVENT_KEY]: testEvent,
    }))
    expect(nextState.log.currentVerbs).toEqual(testVerbs)
  })

  it('sets current room', () => {
    const testRoom = {a: 1, b: 2}
    const nextState = reducer(initialState(), actions.updateInterface({
      [UC.CURRENT_ROOM_KEY]: testRoom,
    }))
    expect(nextState[UC.CURRENT_ROOM_KEY]).toEqual(testRoom)
  })

  it('sets current object', () => {
    const testItem = {c: 3, d: 4}
    const nextState = reducer(initialState(), actions.updateInterface({
      [UC.CURRENT_ITEM_KEY]: testItem,
    }))
    expect(nextState[UC.CURRENT_ITEM_KEY]).toEqual(testItem)
  })
})
