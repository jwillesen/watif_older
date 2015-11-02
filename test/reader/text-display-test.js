/* eslint-env mocha */

import expect from 'expect'
import TextDisplay from 'reader/text-display'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

describe('TextDisplay', () => {
  let component = null

  afterEach(() => {
    if (component) {
      const container = ReactDOM.findDOMNode(component).parentNode
      ReactDOM.unmountComponentAtNode(container)
      component = null
    }
  })

  it('displays title and text', () => {
    component = TestUtils.renderIntoDocument(
      <TextDisplay title='test title'>
        <span>test text</span>
      </TextDisplay>
    )
    const titleComponent = TestUtils.findRenderedDOMComponentWithClass(component, 'text-display__header')
    const titleNode = ReactDOM.findDOMNode(titleComponent)
    expect(titleNode.textContent).toBe('test title')

    const textComponent = TestUtils.findRenderedDOMComponentWithClass(component, 'text-display__body')
    const textNode = ReactDOM.findDOMNode(textComponent)
    expect(textNode.textContent).toBe('test text')
  })

  it('renders buttons for verbs', () => {
    const verbs = [
      {name: 'first'},
      {name: 'second'},
      {name: 'third'},
    ]

    component = TestUtils.renderIntoDocument(<TextDisplay verbs={verbs} />)
    const buttonComponents = TestUtils.scryRenderedDOMComponentsWithTag(component, 'button')
    expect(buttonComponents.length).toBe(3)
    const buttonNodes = buttonComponents.map(bc => ReactDOM.findDOMNode(bc))
    expect(buttonNodes[0].textContent).toBe('first')
    expect(buttonNodes[1].textContent).toBe('second')
    expect(buttonNodes[2].textContent).toBe('third')
  })

  it('sends verb in click callback', () => {
    const verbs = [
      {name: 'first', other: 'stuff'},
      {name: 'second', moreStuff: 'goes'},
      {name: 'third', anything: 'here'},
    ]
    const verbSpy = expect.createSpy()
    component = TestUtils.renderIntoDocument(<TextDisplay verbs={verbs} onVerb={verbSpy}/>)
    const buttonComponents = TestUtils.scryRenderedDOMComponentsWithTag(component, 'button')
    const buttonNodes = buttonComponents.map(bc => ReactDOM.findDOMNode(bc))
    TestUtils.Simulate.click(buttonNodes[1], {})
    expect(verbSpy).toHaveBeenCalledWith(verbs[1])
  })
})
