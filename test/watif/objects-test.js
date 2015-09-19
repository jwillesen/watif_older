/* eslint-env mocha */

import expect from 'expect'
import {event, room, item, verb} from 'watif/objects'
import {ID_KEY, TYPE_KEY, EVENT_TYPE, ROOM_TYPE, ITEM_TYPE} from 'watif/universal-constants'

describe('object creators', () => {
  describe('event', () => {
    it('creates a basic event', () => {
      const result = event('key', {description: 'an event'})
      expect(result[ID_KEY]).toBe('key')
      expect(result[TYPE_KEY]).toBe(EVENT_TYPE)
    })

    it('requires description', () => {
      expect(() => event('key', {})).toThrow()
    })

    it('rejects unrecognized options', () => {
      expect(() => event('key', {description: '', 'unrecognized': ''})).toThrow()
    })

    it('accepts verbs as an array of verb shapes', () => {
      expect(() => event('key', { description: '', verbs: [{id: '', name: '', action: () => ({})}] })).toNotThrow()
    })

    it('requires verbs to be an array', () => {
      expect(() => event('key', {description: '', verbs: 'verb'})).toThrow()
    })

    describe('verb shape', () => {
      it('requires a key', () => {
        expect(() => event('key', { description: '', verbs: [{name: '', action: () => {}}] })).toThrow()
      })

      it('requires a name', () => {
        expect(() => event('key', { description: '', verbs: [{id: '', action: () => {}}] })).toThrow()
      })

      it('requires action to be a function', () => {
        expect(() => event('key', {description: '', verbs: [{id: '', name: '', action: 'not-a-function'}]})).toThrow()
      })
    })
  })

  describe('room', () => {
    it('creates a basic room', () => {
      const result = room('key', {name: 'name', description: 'description'})
      expect(result.type).toBe(ROOM_TYPE)
    })

    it('defaults name to key', () => {
      expect(room('key', {description: 'a room'})).toEqual({id: 'key', type: 'room', name: 'key', description: 'a room'})
    })

    it('requires description', () => {
      expect(() => room('key', {name: ''})).toThrow()
    })

    it('accepts state', () => {
      expect(() => room('key', {name: '', description: '', state: {}})).toNotThrow()
    })
  })

  describe('item', () => {
    it('creates a basic item', () => {
      const result = item('key', {name: '', description: '', location: ''})
      expect(result.type).toBe(ITEM_TYPE)
    })

    it('requires location', () => {
      expect(() => item('key', {name: '', description: ''})).toThrow()
    })
  })

  describe('verb', () => {
    it('creates a verb', () => {
      const action = () => {}
      expect(verb('key', action)).toEqual({id: 'key', name: 'key', action: action})
    })

    it('creates a verb with a custom name', () => {
      const action = () => {}
      expect(verb('key', action, {name: 'name'})).toEqual({id: 'key', name: 'name', action: action})
    })

    it('allows actions to be an array of functions', () => {
      const actions = [() => {}, f => f]
      expect(verb('key', actions)).toEqual({id: 'key', name: 'key', action: actions})
    })

    it('allows properties as the second parameter', () => {
      const f = u => u
      expect(verb('key', {action: f})).toEqual({id: 'key', name: 'key', action: f})
    })
  })
})
