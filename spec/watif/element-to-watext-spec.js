/* eslint-env mocha */

import React from 'react'
import expect from 'expect'

import elementToWatext from 'watif/element-to-watext'

describe('elementToWatext', () => {
  it('translates simple string to string (base case)', () => {
    expect(elementToWatext('string')).toBe('string')
  })

  it('translates number to string (baes case)', () => {
    expect(elementToWatext(42)).toBe('42')
  })

  it('translates text element to watext text', () => {
    expect(elementToWatext(<text>some content</text>)).toEqual({type: 'text', text: 'some content'})
  })

  it('translates item element to item', () => {
    expect(elementToWatext(<item id='item id'>item description</item>)).toEqual({
      type: 'item',
      id: 'item id',
      text: 'item description',
    })
  })

  it('translates a tree', () => {
    const result = elementToWatext(
      <text>there is <item id='rustyKey'>a rusty key</item> on the floor</text>
    )
    expect(result).toEqual(
      { type: 'text', text: [
        'there is ',
        { type: 'item', id: 'rustyKey', text: 'a rusty key' },
        ' on the floor',
      ]}
    )
  })

  it('throws on unrecognized element type', () => {
    expect(() => elementToWatext(<thisisnotanelementtype>foo</thisisnotanelementtype>)).toThrow()
  })

  it('throws on unrecognied object', () => {
    expect(() => elementToWatext({blah: 'frog'})).toThrow()
  })

  it('throws if item does not have an id', () => {
    expect(() => elementToWatext(<item>what item?</item>)).toThrow()
  })
})
