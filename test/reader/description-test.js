/* eslint-env mocha */

import expect from 'expect'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

import Description from 'reader/description'

describe('Description', () => {
  let component = null

  afterEach(() => {
    if (component) {
      const container = ReactDOM.findDOMNode(component).parentNode
      ReactDOM.unmountComponentAtNode(container)
      component = null
    }
  })

  it('renders simple text', () => {
    component = TestUtils.renderIntoDocument(
      <Description description='something simple' />
    )
    expect(ReactDOM.findDOMNode(component).textContent).toBe('something simple')
  })

  it('renders multiple paragraphs', () => {
    const description = ' a \n\n b \n\n c \n\n d '
    component = TestUtils.renderIntoDocument(
      <Description description={description} />
    )
    const ps = TestUtils.scryRenderedDOMComponentsWithClass(component, 'text-display__paragraph')
    expect(ps.length).toBe(4)
  })

  it('renders object links', () => {
    const description = 'The [pen] is mightier than the [sword|excalibur].'
    component = TestUtils.renderIntoDocument(
      <Description description={description} />
    )
    const links = TestUtils.scryRenderedDOMComponentsWithTag(component, 'a')
    expect(links.length).toBe(2)
  })

  it('calls back with object id on click', () => {
    const callback = expect.createSpy()
    component = TestUtils.renderIntoDocument(
      <Description
        description="My kingdom for a [sword|excalibur]!"
        onObjectReferenceSelected={callback}
      />
    )
    const link = TestUtils.findRenderedDOMComponentWithTag(component, 'a')
    TestUtils.Simulate.keyPress(link, {type: 'keypress', key: ' '}) // test space for a11y
    expect(callback).toHaveBeenCalledWith('excalibur')
  })
})
