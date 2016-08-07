/* eslint-env mocha */

import expect from 'expect'
import * as actions from 'watif/master/actions'

describe('master actions', () => {
  describe(actions.CREATE_ITEM, () => {
    it('instantiates the class with class name', () => {
      class SpyClass {}
      const action = actions.createItem(SpyClass)
      expect(action.payload.name).toBe('SpyClass')
      expect(action.payload.item).toBeA(SpyClass)
    })
  })
})
