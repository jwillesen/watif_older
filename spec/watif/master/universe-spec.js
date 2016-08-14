/* eslint-env mocha */

import expect from 'expect'

import Universe from 'watif/master/universe'
import * as Actions from 'watif/master/Actions'

describe('Universe', () => {
  let pluginReducerSpy = null
  let testItem = null

  const makeAdapter = () => {
    return {
    }
  }

  function TestItem () {
    testItem = this
  }

  const makeItemClass = () => {
    TestItem.prototype.description = expect.createSpy().andReturn('a test item')
    TestItem.prototype.verbFrob = expect.createSpy()
    return TestItem
  }

  const makePlugins = () => {
    pluginReducerSpy = expect.createSpy().andCall((state, action) => state)
    return [{
      reducer: pluginReducerSpy,
    }]
  }

  const makeStory = () => {
    return {
      title: 'Test Story',
      items: [makeItemClass()],
      plugins: makePlugins(),
    }
  }

  const makeUniverse = (store) => {
    return new Universe(
      makeStory(), {
        adapter: makeAdapter(),
        store: store,
      }
    )
  }

  it('initializes and finds items', () => {
    const universe = makeUniverse()
    expect(universe.findItem('TestItem')).toBeA(TestItem)
  })

  it('calls plugin reducer', () => {
    makeUniverse()
    expect(pluginReducerSpy).toHaveBeenCalled()
  })

  it('dispatches error when selected item not found', () => {
    const universe = makeUniverse()
    universe.handleSelectItem('DoesNotExist')
    const call = pluginReducerSpy.calls.pop()
    expect(call.arguments[1]).toMatch({type: Actions.DISPLAY_ERROR})
  })

  it('dispatches error when verb subject not found', () => {
    const universe = makeUniverse()
    universe.handleExecuteVerb('Frob', 'duck', 'TestItem')
    const call = pluginReducerSpy.calls.pop()
    expect(call.arguments[1]).toMatch({type: Actions.DISPLAY_ERROR})
  })

  it('dispatches error when verb target not found', () => {
    const universe = makeUniverse()
    universe.handleExecuteVerb('Frob', 'TestItem', 'duck')
    const call = pluginReducerSpy.calls.pop()
    expect(call.arguments[1]).toMatch({type: Actions.DISPLAY_ERROR})
  })

  it('dispatches successfully when target is not specified', () => {
    const universe = makeUniverse()
    universe.handleExecuteVerb('Frob', 'TestItem')
    expect(testItem.verbFrob).toHaveBeenCalled()
  })

  it('dispatches successfully when subject and target are found', () => {
    const universe = makeUniverse()
    universe.handleExecuteVerb('Frob', 'TestItem', 'TestItem')
    expect(testItem.verbFrob).toHaveBeenCalledWith(testItem)
  })
})
