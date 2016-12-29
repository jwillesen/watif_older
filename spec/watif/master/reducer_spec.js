/* eslint-env mocha */

import expect from 'expect'
import reducer from 'watif/master/reducer'

import Item from 'watif/story/item'
import * as Actions from 'watif/master/actions'
import * as Const from 'watif/master/constants'

class Foo extends Item {
  description () { return 'a foo' }
}

class Bar extends Item {
  description () { return 'a bar' }
}

class Baz extends Item {
  description () { return 'a baz' }
}

function initialUniverseState () {
  let state = reducer(undefined, {type: 'init'})
  state = reducer(state, Actions.createItem(Foo))
  state = reducer(state, Actions.createItem(Bar))
  state = reducer(state, Actions.createItem(Baz))
  return state
}

function getStateOf (state, itemId) {
  return state.getIn([Const.ITEMS, itemId, Const.STATE])
}

describe('master reducer', () => {
  describe('log', () => {
    it('appends log items to log', () => {
      let state = initialUniverseState()
      state = reducer(state, Actions.addLog('first log'))
      expect(state.getIn([Const.DISPLAY_STATE, Const.LOG]).toJS())
        .toEqual(['first log'])

      state = reducer(state, Actions.addLog('second log'))
      expect(state.getIn([Const.DISPLAY_STATE, Const.LOG]).toJS())
        .toEqual(['first log', 'second log'])
    })
  })

  describe('relocation', () => {
    it('relocates items from the void', () => {
      let state = initialUniverseState()
      state = reducer(state, Actions.relocateItem('Foo', 'Bar'))
      expect(state.getIn([Const.ITEMS, 'Foo', Const.STATE, Const.LOCATION])).toBe('Bar')
      expect(state.getIn([Const.ITEMS, 'Bar', Const.STATE, Const.CONTENTS]).toJS())
        .toEqual(['Foo'])
    })

    it('relocates items to the void', () => {
      let state = initialUniverseState()
      state = reducer(state, Actions.relocateItem('Foo', 'Bar'))
      state = reducer(state, Actions.relocateItem('Foo', null))
      expect(getStateOf(state, 'Foo').get(Const.LOCATION)).toBe(null)
      expect(getStateOf(state, 'Bar').get(Const.CONTENTS).includes('Foo')).toBeFalsy()
    })

    it('relocates items from one item to another', () => {
      let state = initialUniverseState()
      state = reducer(state, Actions.relocateItem('Foo', 'Bar'))
      expect(getStateOf(state, 'Bar').get(Const.CONTENTS).includes('Foo')).toBeTruthy()
      state = reducer(state, Actions.relocateItem('Foo', 'Baz'))
      expect(getStateOf(state, 'Bar').get(Const.CONTENTS).includes('Foo')).toBeFalsy()
      expect(getStateOf(state, 'Baz').get(Const.CONTENTS).includes('Foo')).toBeTruthy()
    })

    it('processes equivalent source and destination as a noop', () => {
      let state = initialUniverseState()
      state = reducer(state, Actions.relocateItem('Foo', 'Bar'))
      state = reducer(state, Actions.relocateItem('Foo', 'Bar'))
      expect(state.getIn([Const.ITEMS, 'Foo', Const.STATE, Const.LOCATION])).toBe('Bar')
      expect(state.getIn([Const.ITEMS, 'Bar', Const.STATE, Const.CONTENTS]).toJS())
        .toEqual(['Foo'])
    })
  })
})
