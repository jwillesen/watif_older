import {combineReducers} from 'redux'

export const appReducers = {
  blah: (state, action) => state || {},
}

export const appReducer = combineReducers(appReducers)
