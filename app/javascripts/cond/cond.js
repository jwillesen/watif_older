import {executeClause} from './util'

export function cond (predicate) {
  let primaryClause, alternateClause
  let self = function (...args) {
    return predicate(...args)
    ? executeClause(primaryClause, ...args)
    : executeClause(alternateClause, ...args)
  }

  self.then = clause => {
    primaryClause = clause
    return self
  }

  self.else = clause => {
    alternateClause = clause
    return self
  }

  return self
}
