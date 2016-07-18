/* eslint-env mocha */

import expect from 'expect'
import Universe from 'watif/master/universe'
import * as actions from 'watif/master/actions'

describe('Universe', () => {
  const makeAdapter = () => {
    return {
    }
  }

  const makeItem = () => {
    return {
      selectItem: expect.createSpy(),
      executeVerb: expect.createSpy(),
      description: () => 'an item',
    }
  }

  const makeStory = () => {
    return {
      _item: makeItem(),
      getItem: function () { return this._item },
      selectItem: expect.createSpy(),
      executeVerb: expect.createSpy(),
    }
  }

  const makeStore = () => {
    return {
      dispatch: expect.createSpy(),
    }
  }

  const makeUniverse = () => {
    return new Universe({
      adapter: makeAdapter(),
      story: makeStory(),
      store: makeStore(),
    })
  }

  it('calls item selection on items', () => {
    const universe = makeUniverse()
    universe.getStory().getItem().selectItem.andReturn(true)
    universe.handleSelectItem('spy')
    expect(universe.getStory().getItem().selectItem).toHaveBeenCalled()
  })

  it('calls item selection on story', () => {
    const universe = makeUniverse()
    universe.getStory().selectItem.andReturn(true)
    universe.handleSelectItem('spy')
    const item = universe.getStory().getItem()
    expect(universe.getStory().selectItem).toHaveBeenCalledWith(universe, item)
  })

  it('dispatches select item action', () => {
    const universe = makeUniverse()
    const store = universe.getStore()
    universe.handleSelectItem('spy')
    expect(store.dispatch).toHaveBeenCalled()
    expect(store.dispatch.calls[0].arguments[0]).toMatch({type: actions.SELECT_ITEM})
  })

  it('calls verb execution on subject item', () => {
    const universe = makeUniverse()
    const item = universe.getStory().getItem()
    item.executeVerb.andReturn(true)
    universe.handleExecuteVerb('42', 'frob', '43')
    expect(item.executeVerb.calls.length).toBe(1)
    expect(item.executeVerb).toHaveBeenCalledWith(universe, 'frob', item)
    expect(universe.getStore().dispatch).toNotHaveBeenCalled()
  })

  it('calls verb execution on target item', () => {
    const universe = makeUniverse()
    const item = universe.getStory().getItem()
    universe.handleExecuteVerb('42', 'frob', '43')
    expect(item.executeVerb.calls.length).toBe(2)
    expect(item.executeVerb).toHaveBeenCalledWith(universe, 'frob', item)
  })

  it('calls verb execution on story', () => {
    const universe = makeUniverse()
    expect(universe.getStory().executeVerb.andReturn(true))
    universe.handleExecuteVerb('42', 'frob', '43')
    expect(universe.getStory().executeVerb).toHaveBeenCalled()
    expect(universe.getStore().dispatch).toNotHaveBeenCalled()
  })

  it('dispatches display error if verb is not handled', () => {
    const universe = makeUniverse()
    universe.handleExecuteVerb('42', 'frob', '43')
    const store = universe.getStore()
    expect(store.dispatch).toHaveBeenCalled()
    expect(store.dispatch.calls[0].arguments[0]).toMatch({type: actions.DISPLAY_ERROR})
  })
})
