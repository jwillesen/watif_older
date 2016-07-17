/* eslint-env mocha */

import expect from 'expect'
import React from 'react'
import {mount} from 'enzyme'
import ItemButton from 'watif/player/item-button'

describe('ItemButton', () => {
  it('renders a button', () => {
    const wrapper = mount(<ItemButton watext={{id: '42'}} />)
    expect(wrapper.find('button').length).toBe(1)
  })

  it('calls the click handler with watext', () => {
    const spy = expect.createSpy()
    const wrapper = mount(<ItemButton watext={{id: '42'}} onItemClick={spy} />)
    wrapper.find('button').simulate('click')
    expect(spy).toHaveBeenCalledWith({id: '42'})
  })

  it('handles click without handler', () => {
    mount(<ItemButton watext={{}} />).simulate('click')
  })

  it('renders children in the button', () => {
    const wrapper = mount(
      <ItemButton watext={{}}>
        <div className='test-div'>testing</div>
      </ItemButton>
    )
    expect(wrapper.find('button .test-div').length).toBe(1)
  })
})
