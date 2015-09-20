/* eslint-env mocha */

import expect from 'expect'
import Immutable from 'immutable'

import * as UC from 'watif/universal-constants'
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
})
