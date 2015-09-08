/* eslint-env mocha */

import expect from 'expect'
import TextDisplay from 'reader/text-display'
import React from 'react/addons'

const TestUtils = React.addons.TestUtils

describe('TextDisplay', () => {
  let component

  afterEach(() => {
    if (component) {
      const container = React.findDOMNode(component).parentNode
      React.unmountComponentAtNode(container)
    }
  })

  it('displays title and text', () => {
    component = TestUtils.renderIntoDocument(
      <TextDisplay
        title='test title'
        text='test text'
      />
    )
    const titleComponent = TestUtils.findRenderedDOMComponentWithTag(component, 'h2')
    const titleNode = React.findDOMNode(titleComponent)
    expect(titleNode.textContent).toBe('test title')

    const textComponent = TestUtils.findRenderedDOMComponentWithClass(component, 'panel-body')
    const textNode = React.findDOMNode(textComponent)
    expect(textNode.textContent).toBe('test text')
  })

  it('renders buttons for verbs', () => {
    const verbs = [
      {label: 'first', action: {type: 'FIRST'}},
      {label: 'second', action: {type: 'SECOND'}},
      {label: 'third', action: {type: 'THIRD'}},
    ]

    component = TestUtils.renderIntoDocument(<TextDisplay verbs={verbs} />)
    const buttonComponents = TestUtils.scryRenderedDOMComponentsWithTag(component, 'button')
    expect(buttonComponents.length).toBe(3)
    const buttonNodes = buttonComponents.map(bc => React.findDOMNode(bc))
    expect(buttonNodes[0].textContent).toBe('first')
    expect(buttonNodes[1].textContent).toBe('second')
    expect(buttonNodes[2].textContent).toBe('third')
  })

  it('sends verb in click callback', () => {
    const verbs = [
      {label: 'first', action: {type: 'FIRST', payload: '1st'}},
      {label: 'second', action: {type: 'SECOND', payload: '2nd'}},
      {label: 'third', action: {type: 'THIRD', payload: '3rd'}},
    ]
    const verbSpy = expect.createSpy()
    component = TestUtils.renderIntoDocument(<TextDisplay verbs={verbs} onVerb={verbSpy}/>)
    const buttonComponents = TestUtils.scryRenderedDOMComponentsWithTag(component, 'button')
    const buttonNodes = buttonComponents.map(bc => React.findDOMNode(bc))
    TestUtils.Simulate.click(buttonNodes[1], {})
    expect(verbSpy).toHaveBeenCalledWith(verbs[1])
  })
})
