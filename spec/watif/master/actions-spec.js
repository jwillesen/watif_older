/* eslint-env mocha */

import expect from 'expect'
import * as actions from 'watif/master/actions'

describe('master actions', () => {
  describe(actions.SELECT_ITEM, () => {
    it('pulls a description from an item', () => {
      const universe = {}
      const item = {description: expect.createSpy().andReturn('a frob')}
      const action = actions.selectItem(universe, item)
      expect(item.description).toHaveBeenCalledWith(universe)
      expect(action.payload).toMatch({item: item, description: 'a frob'})
    })
  })
})
