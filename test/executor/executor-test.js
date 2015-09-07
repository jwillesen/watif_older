/* eslint-env mocha */

import expect from 'expect'
import {createExecutor} from 'executor'

describe('createExecutor', () => {
  it('requires options', () => {
    expect(() => createExecutor({})).toThrow()
  })

  it('accepts valid options', () => {
    expect(() => createExecutor({updateReader: () => {}})).toNotThrow()
  })
})

describe('Executor', () => {
  it('invokes updateReader callback on start', () => {
    const callback = expect.createSpy()
    const exec = createExecutor({updateReader: callback})
    exec.start()
    expect(callback).toHaveBeenCalled()
  })

  it('invokes updateReader callback on verb', () => {
    const callback = expect.createSpy()
    const exec = createExecutor({updateReader: callback})
    exec.executeVerb({type: 'test', payload: 'test'})
    expect(callback).toHaveBeenCalled()
  })
})
