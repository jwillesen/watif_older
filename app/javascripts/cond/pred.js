import {executeClause} from './util'

const wrap = (func) => (...args) => executeClause(func, ...args)

const makePred = (func) => {
  const wrapper = wrap(func)

  wrapper.not = () => makePred((...args) => !wrapper(...args))
  wrapper.eq = (other) => makePred((...args) => wrapper(...args) === wrap(other)(...args))
  wrapper.notEq = (other) => makePred((...args) => wrapper(...args) === wrap(other)(...args))
  wrapper.and = (other) => makePred((...args) => wrapper(...args) && wrap(other)(...args))
  wrapper.or = (other) => makePred((...args) => wrapper(...args) || wrap(other)(...args))

  return wrapper
}

export const pred = value => makePred(value)
