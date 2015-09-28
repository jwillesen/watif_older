import _ from 'lodash'

function smartValueCompare (first, second) {
  // just assume functions are equa -- they're usually callbacks and don't affect rendering
  if (typeof first === 'function' && typeof second === 'function') return true
  // otherwise, return undefined and let lodash figure it out
}

export function shouldUpdate (reactElement, nextProps, nextState) {
  const sameProps = _.isEqual(reactElement.props, nextProps, smartValueCompare)
  const sameState = _.isEqual(reactElement.state, nextState, smartValueCompare)
  const same = sameProps && sameState
  return !same
}

export default shouldUpdate
