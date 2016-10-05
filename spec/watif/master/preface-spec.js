/* eslint-env mocha */

import expect from 'expect'
import preface from 'watif/master/preface'

class TestItem {
  constructor (universe) {
    this.universe = universe
  }

  initialLocation () { return 'TheAbyss' }
  initialState () { return {foo: 'bar'} }
}

function mockUniverse () {
  return {
    setItems: expect.createSpy(),
    relocate: expect.createSpy(),
  }
}

describe('preface', () => {
  it('initializes items', () => {
    const universe = mockUniverse()

    preface.begin({items: [TestItem]}, universe)
    expect(universe.setItems).toHaveBeenCalled()
    const testItem = universe.setItems.calls[0].arguments[0].get('TestItem')
    expect(testItem).toBeA(TestItem)
    expect(testItem.universe).toBe(universe)
  })

  it('sets the initial location of items', () => {
    const universe = mockUniverse()
    preface.begin({items: [TestItem]}, universe)
    expect(universe.relocate).toHaveBeenCalled('TestItem', 'TheAbyss')
    expect(universe.relocate).toHaveBeenCalledWith('TestItem', 'TheAbyss')
  })
})
