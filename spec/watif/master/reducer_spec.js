/* eslint-env mocha */

import expect from 'expect'
// import Immutable from 'immutable'
import Item from 'watif/story/item'
import reducer from 'watif/master/reducer'
import {relocateItem, createItem} from 'watif/master/actions'
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
  state = reducer(state, createItem(Foo))
  state = reducer(state, createItem(Bar))
  state = reducer(state, createItem(Baz))
  return state
}

function getStateOf (state, itemId) {
  return state.getIn([Const.ITEMS, itemId, Const.STATE])
}

describe('master reducer', () => {
  it('relocates items from the void', () => {
    let state = initialUniverseState()
    state = reducer(state, relocateItem('Foo', 'Bar'))
    expect(state.getIn([Const.ITEMS, 'Foo', Const.STATE, Const.LOCATION])).toBe('Bar')
    expect(state.getIn([Const.ITEMS, 'Bar', Const.STATE, Const.CONTAINS]).toJS())
      .toEqual(['Foo'])
  })

  it('relocates items to the void', () => {
    let state = initialUniverseState()
    state = reducer(state, relocateItem('Foo', 'Bar'))
    state = reducer(state, relocateItem('Foo', null))
    expect(getStateOf(state, 'Foo').get(Const.LOCATION)).toBe(null)
    expect(getStateOf(state, 'Bar').get(Const.CONTAINS).includes('Foo')).toBeFalsy()
  })

  it('relocates items from one item to another', () => {
    let state = initialUniverseState()
    state = reducer(state, relocateItem('Foo', 'Bar'))
    expect(getStateOf(state, 'Bar').get(Const.CONTAINS).includes('Foo')).toBeTruthy()
    state = reducer(state, relocateItem('Foo', 'Baz'))
    expect(getStateOf(state, 'Bar').get(Const.CONTAINS).includes('Foo')).toBeFalsy()
    expect(getStateOf(state, 'Baz').get(Const.CONTAINS).includes('Foo')).toBeTruthy()
  })

  it('processes equivalent source and destination as a noop', () => {
    let state = initialUniverseState()
    state = reducer(state, relocateItem('Foo', 'Bar'))
    state = reducer(state, relocateItem('Foo', 'Bar'))
    expect(state.getIn([Const.ITEMS, 'Foo', Const.STATE, Const.LOCATION])).toBe('Bar')
    expect(state.getIn([Const.ITEMS, 'Bar', Const.STATE, Const.CONTAINS]).toJS())
      .toEqual(['Foo'])
  })
})
