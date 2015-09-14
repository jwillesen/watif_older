/* eslint-env mocha */

import expect from 'expect'
import {Map, fromJS} from 'immutable'
import {createExecutor} from 'executor'
import {verb, event, item} from 'watif/objects'

describe('createExecutor', () => {
  it('requires options', () => {
    expect(() => createExecutor({})).toThrow()
  })

  it('accepts valid options', () => {
    expect(() => createExecutor({updateReader: () => {}, initialState: Map()})).toNotThrow()
  })
})

describe('Executor', () => {
  it('invokes updateReader callback on start', () => {
    const callback = expect.createSpy()
    const exec = createExecutor({
      updateReader: callback,
      initialState: fromJS({
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
        key: 'introduction',
        name: 'Book Title', // events don't have names
        description: 'something happened',
        verbs: [{key: 'start', name: 'start', object: 'introduction'}],
      },
    }])
  })

  it('invokes verb and updateReader callback on executeVerb', () => {
    const callback = expect.createSpy()
    const knockAction = expect.createSpy().andCall(u => u)

    const exec = createExecutor({
      updateReader: callback,
      initialState: fromJS({
        objects: {
          door: item('door', {
            description: 'a door',
            location: 'room',
            verbs: [verb('knock', knockAction)],
          }),
        },
      }),
    })
    exec.executeVerb({key: 'knock', object: 'door'})
    expect(knockAction).toHaveBeenCalled()
    expect(callback).toHaveBeenCalled()
  })
})
