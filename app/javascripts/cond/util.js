import _ from 'lodash'

export function executeClause (clause, ...args) {
  if (_.isFunction(clause)) return clause(...args)
  return clause
}
