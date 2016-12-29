/* eslint-env mocha */

import expect from 'expect'
import StoryDisplayActionAdapter from 'watif/master/story-display-action-adapter'

describe('StoryDisplayActionAdapter', () => {
  const createJailed = () => {
    return {
      setInterface: expect.createSpy(),
      remote: { setDisplayState: expect.createSpy() },
    }
  }

  it('registers api with jailed', () => {
    const jailed = createJailed()
    // eslint-disable-next-line no-unused-vars
    const adapter = new StoryDisplayActionAdapter({}, {application: jailed})
    expect(jailed.setInterface).toHaveBeenCalled()
  })

  it('calls callbacks', () => {
    const jailed = createJailed()
    const callbacks = {
      examineItem: expect.createSpy(),
      selectVerb: expect.createSpy(),
    }
    const adapter = new StoryDisplayActionAdapter(callbacks, {application: jailed})
    adapter.handleDisplayItemSelected('42')
    expect(callbacks.examineItem).toHaveBeenCalledWith('42')
    adapter.handleDisplayVerbSelected('frob', 'mug', 'handle')
    expect(callbacks.selectVerb).toHaveBeenCalledWith('frob', 'mug', 'handle')
  })

  it('calls remote method', () => {
    const jailed = createJailed()
    const adapter = new StoryDisplayActionAdapter({}, {application: jailed})
    adapter.sendDisplayState({health: 'incapacitated'})
    expect(jailed.remote.setDisplayState).toHaveBeenCalledWith({health: 'incapacitated'})
  })
})
