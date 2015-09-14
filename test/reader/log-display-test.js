/* eslint-env mocha */

import expect from 'expect'
import LogDisplay from 'reader/log-display'
import TextDisplay from 'reader/text-display'
import React from 'react/addons'

import EventLog from 'reader/event-log'
import CommandLog from 'reader/command-log'

const TestUtils = React.addons.TestUtils

describe('LogDisplay', () => {
  it('passes history elements as children to TextDisplay', () => {
    const testEvent = {type: 'event', payload: {description: 'foo'}}
    const testCommand = {type: 'command', payload: {name: 'bar'}}
    const testHistory = [testEvent, testCommand]

    const shallow = TestUtils.createRenderer()
    shallow.render(
      <LogDisplay history={testHistory} other='prop value' />
    )
    const result = shallow.getRenderOutput()
    expect(result.type).toBe(TextDisplay)
    expect(result.props.other).toBe('prop value')
    expect(result.props.children).toEqual([
      <EventLog event={testEvent.payload} key={0} />,
      <CommandLog command={testCommand.payload} key={1} />,
    ])
  })
})
