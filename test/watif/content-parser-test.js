/* eslint-env mocha */

import expect from 'expect'
import {
  parseContent,
  PARAGRAPH_ELEMENT_TYPE, TEXT_ELEMENT_TYPE, OBJECT_REFERENCE_ELEMENT_TYPE,
} from 'watif/content-parser'

describe('parseContent', () => {
  it('generates a simple paragraph element', () => {
    const result = parseContent('some text')
    expect(result).toEqual([{
      type: PARAGRAPH_ELEMENT_TYPE,
      payload: [{
        type: TEXT_ELEMENT_TYPE,
        payload: 'some text',
      }],
    }])
  })

  it('generates multiple paragraph elements', () => {
    const result = parseContent('first\n\nsecond')
    expect(result).toEqual([{
      type: PARAGRAPH_ELEMENT_TYPE,
      payload: [{
        type: TEXT_ELEMENT_TYPE,
        payload: 'first',
      }],
    }, {
      type: PARAGRAPH_ELEMENT_TYPE,
      payload: [{
        type: TEXT_ELEMENT_TYPE,
        payload: 'second',
      }],
    }])
  })

  it('does not include blank paragraphs', () => {
    const result = parseContent('\n\n\n\nfirst\n\n  \n\nsecond\n\n\n\n')
    expect(result).toEqual([{
      type: PARAGRAPH_ELEMENT_TYPE,
      payload: [{
        type: TEXT_ELEMENT_TYPE,
        payload: 'first',
      }],
    }, {
      type: PARAGRAPH_ELEMENT_TYPE,
      payload: [{
        type: TEXT_ELEMENT_TYPE,
        payload: 'second',
      }],
    }])
  })

  it('removes leading and trailing whitespace', () => {
    const result = parseContent(' \n line 1 \n line 2\n')
    expect(result).toEqual([{
      type: PARAGRAPH_ELEMENT_TYPE,
      payload: [{
        type: TEXT_ELEMENT_TYPE,
        payload: 'line 1 \n line 2',
      }],
    }])
  })

  it('creates object link elements', () => {
    const result = parseContent('there is a [pen|trapped-pen] on the floor')
    expect(result).toEqual([{
      type: PARAGRAPH_ELEMENT_TYPE,
      payload: [{
        type: TEXT_ELEMENT_TYPE,
        payload: 'there is a ',
      }, {
        type: OBJECT_REFERENCE_ELEMENT_TYPE,
        payload: {
          id: 'trapped-pen',
          name: 'pen',
        },
      }, {
        type: TEXT_ELEMENT_TYPE,
        payload: ' on the floor',
      }],
    }])
  })

  it('removes leading and trailing whitespace on object link parts', () => {
    const result = parseContent('[ pen     |  trapped-pen   ]')
    expect(result).toEqual([{
      type: PARAGRAPH_ELEMENT_TYPE,
      payload: [{
        type: OBJECT_REFERENCE_ELEMENT_TYPE,
        payload: {
          id: 'trapped-pen',
          name: 'pen',
        },
      }],
    }])
  })

  it('defaults the id to the name if only the name is specified', () => {
    const result = parseContent('[trapped pen]')
    expect(result).toEqual([{
      type: PARAGRAPH_ELEMENT_TYPE,
      payload: [{
        type: OBJECT_REFERENCE_ELEMENT_TYPE,
        payload: {
          id: 'trapped pen',
          name: 'trapped pen',
        },
      }],
    }])
  })
})
