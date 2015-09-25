/* eslint-env mocha */

import expect from 'expect'
import Immutable from 'immutable'

import * as UC from 'watif/universal-constants'
import {item, verb} from 'watif/objects'
import {executeVerb} from 'executor/actions'
import reducer from 'executor/reducer'

describe('executor/reducer', () => {
  it('clears current event before every action', () => {
    const initialState = Immutable.fromJS({
      [UC.READER_KEY]: {
        [UC.CURRENT_EVENT_KEY]: 'some-event',
      },
    })
    const nextState = reducer(initialState, {type: 'fake-action'})
    expect(nextState.getIn([UC.READER_KEY, UC.CURRENT_EVENT_KEY])).toBe('')
  })

  it('sets the context to the outer object when executing verbs', () => {
    let contextOfSpy
    const spy = expect.createSpy().andCall(function () { contextOfSpy = this })
    const mockItem = item('mock', {
      description: 'a mock object',
      verbs: [verb('spy', spy)],
    })
    const initialState = Immutable.fromJS({
      [UC.OBJECTS_KEY]: {mock: mockItem},
    })
    reducer(initialState, executeVerb({
      [UC.ID_KEY]: 'spy',
      [UC.OBJECT_KEY]: 'mock',
      [UC.NAME_KEY]: 'spy',
    }))
    expect(spy).toHaveBeenCalled()
    expect(contextOfSpy.toJS()).toEqual(mockItem)
  })
})
