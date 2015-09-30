/* eslint-env mocha */

import expect from 'expect'
import Immutable from 'immutable'
import {createExecutor} from 'executor'
import {verb, event, item} from 'watif/objects'
import * as UC from 'watif/universal-constants'

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
          introduction: event('introduction', {description: 'the story begins'}),
        },
      }),
    })
    exec.start()
    expect(callback).toHaveBeenCalled()
  })

  it('invokes verb and updateReader callback on executeVerb', () => {
    const callback = expect.createSpy()
    const knockAction = expect.createSpy().andCall((o, u) => u)

    const exec = createExecutor({
      updateReader: callback,
      initialState: Immutable.fromJS({
        objects: {
          door: item('door', {
            description: 'a door',
            verbs: [verb('knock', knockAction)],
          }),
        },
      }),
    })
    exec.executeVerb({id: 'knock', object: 'door'})
    expect(knockAction).toHaveBeenCalled()
    expect(callback).toHaveBeenCalled()
  })

  it('sets current item and invokes updateReader on selectItem', () => {
    const callback = expect.createSpy()
    const exec = createExecutor({
      updateReader: callback,
      initialState: Immutable.fromJS({
        objects: {
          door: item('door', {
            description: 'a door',
          }),
        },
      }),
    })
    exec.selectItem('door')
    expect(exec.universe().getIn([UC.READER_KEY, UC.CURRENT_ITEM_KEY])).toBe('door')
    expect(callback).toHaveBeenCalled()
  })
})
