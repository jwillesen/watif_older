/* eslint-env mocha */

import expect from 'expect'
import React from 'react'
import {shallow, mount} from 'enzyme'
import WatextView from 'watif/player/watext-view'
import Types from 'watif/watext/types'

describe('WatextView', () => {
  it('renders text as a span', () => {
    const wrapper = mount(<WatextView watext={{type: Types.TEXT, text: 'test text'}} />)
    const span = wrapper.find('span')
    expect(span.length).toBe(1)
    expect(span.text()).toBe('test text')
  })

  it('renders a paragraph', () => {
    const wrapper = mount(<WatextView watext={{type: Types.PARAGRAPH, text: 'paragraph text'}} />)
    const paragraph = wrapper.find('p')
    expect(paragraph.length).toBe(1)
    expect(paragraph.text()).toBe('paragraph text')
  })

  it('renders an item as an ItemButton with handler', () => {
    const spy = expect.createSpy()
    const wrapper = shallow(<WatextView watext={{type: Types.ITEM, id: '42', text: 'some text'}} onItemClick={spy} />)
    const button = wrapper.find('ItemButton')
    expect(button.length).toBe(1)
    expect(button.prop('onItemClick')).toBe(spy)
  })

  it('renders a tree', () => {
    const tree = {
      type: Types.PARAGRAPH,
      text: [
        'you see',
        {
          type: Types.ITEM,
          id: 'key-to-chest',
          text: 'a key',
        },
        'on the',
        {
          type: Types.ITEM,
          id: 'kitchen-floor',
          text: 'floor',
        },
      ],
    }
    const wrapper = shallow(<WatextView watext={tree} />)
    expect(wrapper.find('p').length).toBe(1)
    expect(wrapper.find('WatextView').length).toBe(4)
  })
})
