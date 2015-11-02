/* eslint-env mocha */

import expect from 'expect'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

import InventoryDisplay from 'reader/inventory-display'

describe('InventoryDisplay', () => {
  let component = null

  afterEach(() => {
    if (component) {
      const container = ReactDOM.findDOMNode(component).parentNode
      ReactDOM.unmountComponentAtNode(container)
      component = null
    }
  })

  it('renders an object link for each inventory item', () => {
    component = TestUtils.renderIntoDocument(
      <InventoryDisplay inventory={ [{id: 'foo', name: 'bar'}, {id: 'baz', name: 'bing'}] } />
    )
    const links = TestUtils.scryRenderedDOMComponentsWithTag(component, 'a')
    expect(links.length).toBe(2)
  })

  it('calls back with item id on activate', () => {
    const callback = expect.createSpy()
    component = TestUtils.renderIntoDocument(
      <InventoryDisplay
        inventory={ [{id: 'foo', name: 'bar'}] }
        onObjectReferenceSelected={callback}
      />
    )
    const link = TestUtils.findRenderedDOMComponentWithTag(component, 'a')
    TestUtils.Simulate.keyPress(link, {type: 'keypress', key: ' '}) // test space for a11y
    expect(callback).toHaveBeenCalledWith('foo')
  })
})
