/* eslint-env mocha */

import expect from 'expect'
import Immutable from 'immutable'
import {event, item} from 'watif/objects'
import * as UC from 'watif/universal-constants'
import {takeItemVerb, openVerb, closeVerb} from 'watif/common-verbs'

function mockItem () {
  return Immutable.fromJS({id: 'mock'})
}

describe('takeItemVerb', () => {
  it('takes an item and triggers an event', () => {
    const priorState = Immutable.fromJS({
      objects: {
        'take-item': event('take-item', {description: 'item taken'}),
        mock: item('mock', {description: 'a mock object'}),
      },
    })
    const takeVerb = takeItemVerb()
    expect(takeVerb.action.length).toBe(2)
    const nextState = takeVerb.action.reduce(
      function (prior, action) { return action(prior, mockItem()) },
      priorState)
    expect(nextState.getIn([UC.READER_KEY, UC.CURRENT_EVENT_KEY])).toBe('take-item')
    expect(nextState.getIn(
      [UC.OBJECTS_KEY, 'mock', UC.STATE_KEY, UC.LOCATION_KEY]
    )).toBe(UC.INVENTORY_LOCATION)
  })

  it('is enabled if the item is not in inventory', () => {
    const universe = Immutable.fromJS({})
    const context = universe
    const takeVerb = takeItemVerb()
    expect(takeVerb[UC.ENABLED_KEY](universe, context)).toExist() // to be truthy
  })

  it('is disabled if the item is already in the inventory', () => {
    const universe = Immutable.fromJS({})
    const context = Immutable.fromJS({[UC.STATE_KEY]: {[UC.LOCATION_KEY]: UC.INVENTORY_LOCATION}})
    const takeVerb = takeItemVerb()
    expect(takeVerb[UC.ENABLED_KEY](universe, context)).toNotExist() // to be falsey
  })
})

describe('openVerb', () => {
  it('is enabled when item is not open', () => {
    const universe = Immutable.fromJS({})
    const context = universe
    const open = openVerb()
    expect(open[UC.ENABLED_KEY](universe, context)).toExist() // to be truthy
  })
})

describe('closeVerb', () => {
  it('is disabled when item is not open', () => {
    const universe = Immutable.fromJS({})
    const context = universe
    const close = closeVerb()
    expect(close[UC.ENABLED_KEY](universe, context)).toNotExist() // to be truthy
  })
})
