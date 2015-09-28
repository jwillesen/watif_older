/* eslint-env mocha */

import expect from 'expect'
import shouldUpdate from 'reader/smart-should-update'

const initialState = {
  element: {props: {foo: {bar: [1, 2, 3]}}, state: {baz: {bing: [4, 5, 6]}}},
  nextProps: {foo: {bar: [1, 2, 3]}},
  nextState: {baz: {bing: [4, 5, 6]}},
}

describe('shouldUpdate', () => {
  it('performs deep comparison and returns false if no differences', () => {
    const {element, nextProps, nextState} = initialState
    expect(shouldUpdate(element, nextProps, nextState)).toNotExist()
  })

  it('returns true when differences in props are detected', () => {
    const {element, nextProps, nextState} = initialState
    nextProps.foo.bar[1] = 42
    expect(shouldUpdate(element, nextProps, nextState)).toExist()
  })

  it('returns true when differences in state are detected', () => {
    const {element, nextProps, nextState} = initialState
    nextState.baz.bing[1] = 42
    expect(shouldUpdate(element, nextProps, nextState)).toExist()
  })

  it('considers all functions equal', () => {
    const element = {props: foo => foo + 1, state: bar => bar + 2}
    const nextProps = baz => baz + 3
    const nextState = bing => bing + 4
    expect(shouldUpdate(element, nextProps, nextState)).toNotExist()
  })
})
