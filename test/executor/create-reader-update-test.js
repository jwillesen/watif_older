/* eslint-env mocha */

import expect from 'expect'
import Immutable from 'immutable'
import createReaderUpdate from 'executor/create-reader-update'
import {event, room, item, verb} from 'watif/objects'
import * as UC from 'watif/universal-constants'

describe('createReaderUpdate', () => {
  it('includes the current event', () => {
    const universe = Immutable.fromJS({
      reader: {'current-event': 'introduction'},
      objects: {
        introduction: event('introduction', {description: 'intro'}),
      },
    })
    expect(createReaderUpdate(universe)).toEqual({
      'current-event': {
        id: 'introduction',
        name: 'introduction',
        description: 'intro',
        verbs: [],
      },
    })
  })

  it('includes current room', () => {
    const universe = Immutable.fromJS({
      reader: {'current-room': 'office'},
      objects: {
        office: room('office', {description: 'the office'}),
      },
    })
    expect(createReaderUpdate(universe)).toEqual({
      'current-room': {
        id: 'office',
        name: 'office',
        description: 'the office',
        verbs: [],
      },
    })
  })

  it('includes current item', () => {
    const universe = Immutable.fromJS({
      [UC.READER_KEY]: {[UC.CURRENT_ITEM_KEY]: 'door'},
      [UC.OBJECTS_KEY]: {
        'door': item('door', {description: 'a door', verbs: [verb('open', () => {})]}),
      },
    })
    expect(createReaderUpdate(universe)).toEqual({
      [UC.CURRENT_ITEM_KEY]: {
        [UC.ID_KEY]: 'door',
        [UC.NAME_KEY]: 'door',
        [UC.DESCRIPTION_KEY]: 'a door',
        [UC.VERBS_KEY]: [
          {[UC.ID_KEY]: 'open', [UC.NAME_KEY]: 'open', [UC.OBJECT_KEY]: 'door'},
        ],
      },
    })
  })

  it('filters out disabled verbs', () => {
    const kickSpy = expect.createSpy()
    const takeSpy = expect.createSpy()
    const universe = Immutable.fromJS({
      [UC.READER_KEY]: {[UC.CURRENT_ITEM_KEY]: 'rock'},
      [UC.OBJECTS_KEY]: {
        'rock': item('rock', {
          description: 'a rock',
          verbs: [verb('kick', kickSpy), verb('take', takeSpy, {enabled: () => false})],
        }),
      },
    })
    const readerState = createReaderUpdate(universe)
    expect(readerState[UC.CURRENT_ITEM_KEY][UC.VERBS_KEY]).toEqual(
      [{[UC.ID_KEY]: 'kick', [UC.NAME_KEY]: 'kick', [UC.OBJECT_KEY]: 'rock'}]
    )
  })

  it('executes `enabled` in the context of the object and passes in universe', () => {
    const enabledSpy = expect.createSpy()
    const rockItem = item('rock', {
      description: 'a rock',
      verbs: [verb('kick', () => {}, {enabled: enabledSpy})],
    })
    const universe = Immutable.fromJS({
      [UC.READER_KEY]: {[UC.CURRENT_ITEM_KEY]: 'rock'},
      [UC.OBJECTS_KEY]: {'rock': rockItem},
    })
    createReaderUpdate(universe)
    expect(enabledSpy).toHaveBeenCalled()
    expect(enabledSpy.calls[0].context).toExist()
    expect(enabledSpy.calls[0].context.toJS()).toEqual(rockItem)
    expect(enabledSpy.calls[0].arguments[0]).toExist()
    expect(enabledSpy.calls[0].arguments[0].toJS()).toEqual(universe.toJS())
  })

  it('includes inventory', () => {
    const universe = Immutable.fromJS({
      reader: {},
      objects: {
        key: {id: 'key', name: 'silver key', state: {location: UC.INVENTORY_LOCATION}},
        door: {id: 'door', name: 'front door', state: {location: 'somewhere else'}},
      },
    })
    expect(createReaderUpdate(universe)).toEqual({
      inventory: [{id: 'key', name: 'silver key'}],
    })
  })
})
