/* eslint-env mocha */

import expect from 'expect'

import * as Actions from 'watif/master/actions'
import preface from 'watif/master/preface'

class TestItem {
  constructor () {
    this.constructorSpy = expect.createSpy()
    this.constructorSpy(...arguments)
  }
}

function mockStore () {
  return {
    dispatch: expect.createSpy(),
  }
}

function mockUniverse () {
  return {
    store: mockStore(),
    getStore: function () { return this.store },
  }
}

describe('preface', () => {
  it('initializes items', () => {
    const universe = mockUniverse()
    preface.begin(
      {items: [TestItem]},
      universe
    )
    const mockDispatch = universe.store.dispatch
    expect(mockDispatch).toHaveBeenCalled()

    const dispatchAction = mockDispatch.calls[0].arguments[0]
    expect(dispatchAction).toMatch({type: Actions.SET_ITEMS})
    expect(dispatchAction.payload.get('TestItem')).toBeA(TestItem)
  })
})
