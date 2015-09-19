/* eslint-env mocha */

import expect from 'expect'
import Immutable from 'immutable'
import {createExecutor} from 'executor'
import {verb, event, room, item} from 'watif/objects'

describe('createExecutor', () => {
  it('requires options', () => {
    expect(() => createExecutor({})).toThrow()
  })

  it('accepts valid options', () => {
    expect(() => createExecutor({updateReader: () => {}, initialState: Immutable.Map()})).toNotThrow()
  })
})

describe('Executor', () => {
  it('invokes updateReader callback on start', () => {
    const callback = expect.createSpy()
    const exec = createExecutor({
      updateReader: callback,
      initialState: Immutable.fromJS({
        objects: {
          introduction: event('introduction', {
            name: 'Book Title',
            description: 'something happened',
            verbs: [verb('start', u => u)],
          }),
        },
      }),
    })
    exec.start()
    expect(callback).toHaveBeenCalled()
    expect(callback.calls[0].arguments).toEqual([{
      'current-event': {
        id: 'introduction',
        name: 'Book Title', // events don't have names
        description: 'something happened',
        verbs: [{id: 'start', name: 'start', object: 'introduction'}],
      },
    }])
  })

  it('invokes verb and updateReader callback on executeVerb', () => {
    const callback = expect.createSpy()
    const knockAction = expect.createSpy().andCall(u => u)

    const exec = createExecutor({
      updateReader: callback,
      initialState: Immutable.fromJS({
        objects: {
          door: item('door', {
            description: 'a door',
            location: 'room',
            verbs: [verb('knock', knockAction)],
          }),
        },
      }),
    })
    exec.executeVerb({id: 'knock', object: 'door'})
    expect(knockAction).toHaveBeenCalled()
    expect(callback).toHaveBeenCalled()
  })

  it('includes current room in ui state', () => {
    const updateReader = expect.createSpy()
    const exec = createExecutor({
      updateReader,
      initialState: Immutable.fromJS({
        reader: {'current-room': 'office'},
        objects: {
          office: room('office', {description: 'the office'}),
        },
      }),
    })
    expect(exec.generateUiState()).toEqual({
      'current-room': {
        id: 'office',
        name: 'office',
        description: 'the office',
        verbs: [],
      },
    })
  })
})
