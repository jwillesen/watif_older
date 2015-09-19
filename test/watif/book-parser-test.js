/* eslint-env mocha */

import expect from 'expect'
import {initialEmptyState, loadBook} from 'watif/book-parser'
import {verb, event, room} from 'watif/objects'
import * as UC from 'watif/universal-constants'

describe('loadBook', () => {
  it('puts array of objects into objects hash', () => {
    const intro = event('intro', {description: 'introduction to the book'})
    const outro = event('outro', {description: 'the end of the book'})
    const result = loadBook([intro, outro])
    expect(result.toJS()).toEqual({
      ...initialEmptyState(),
      [UC.OBJECTS_KEY]: {intro, outro},
    })
  })

  it('converts verbs to keymap for efficiency') // eventually we should do this
  it('keeps verbs in array', () => {
    const office = room('office', {description: 'an office', verbs: [verb('work', u => u)]})
    const result = loadBook([office])
    expect(result.toJS()).toEqual({
      ...initialEmptyState(),
      [UC.OBJECTS_KEY]: {office},
    })
  })
})
