/* eslint-env mocha */

import expect from 'expect'
import StoryPlayerActionAdapter from 'watif/master/story-player-action-adapter'

describe(StoryPlayerActionAdapter, () => {
  const createJailed = () => {
    return {
      setInterface: expect.createSpy(),
      remote: { setPlayerState: expect.createSpy() },
    }
  }

  it('registers api with jailed', () => {
    const jailed = createJailed()
    // eslint-disable-next-line no-unused-vars
    const adapter = new StoryPlayerActionAdapter({}, {application: jailed})
    expect(jailed.setInterface).toHaveBeenCalled()
  })

  it('calls callbacks', () => {
    const jailed = createJailed()
    const callbacks = {
      selectItem: expect.createSpy(),
      selectVerb: expect.createSpy(),
    }
    const adapter = new StoryPlayerActionAdapter(callbacks, {application: jailed})
    adapter.handlePlayerItemSelected('42')
    expect(callbacks.selectItem).toHaveBeenCalledWith('42')
    adapter.handlePlayerVerbSelected('42', 'frob', '43')
    expect(callbacks.selectVerb).toHaveBeenCalledWith('42', 'frob', '43')
  })

  it('calls remote method', () => {
    const jailed = createJailed()
    const adapter = new StoryPlayerActionAdapter({}, {application: jailed})
    adapter.sendPlayerState({health: 'incapacitated'})
    expect(jailed.remote.setPlayerState).toHaveBeenCalledWith({health: 'incapacitated'})
  })
})
