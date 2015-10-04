import {executeClause} from './util'

export function pred (value) {
  const result = (...args) => executeClause(value, ...args)

  result.eq = (other) => {
    return (...args) => executeClause(value, ...args) === executeClause(other, ...args)
  }

  return result
}
