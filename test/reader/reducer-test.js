/* eslint-env mocha */

import expect from 'expect'
import {reducer, actions} from 'reader'

describe('reader readucer', () => {
  it('appends log updates to log state', () => {
    const initialState = { log: {text: 'prior', verbs: []} }
    const nextState = reducer(initialState,
      actions.updateInterface({ log: {text: 'next', verbs: []} }))
    expect(nextState.log.text).toBe('priornext')
  })

  it('replaces verbs', () => {
    const initialState = { log: {text: '', verbs: ['a', 'b', 'c']} }
    const nextState = reducer(initialState,
      actions.updateInterface({ log: {text: '', verbs: ['d', 'e', 'f']} }))
    expect(nextState.log.verbs).toEqual(['d', 'e', 'f'])
  })
})
