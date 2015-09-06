require('file?name=[name].[ext]!index.html')
require('bootstrap/dist/css/bootstrap.css')
require('imports?jQuery=jquery!bootstrap/dist/js/bootstrap.js')

import React from 'react'

import {applyMiddleware, combineReducers, createStore} from 'redux'
import {Provider} from 'react-redux'
import promiser from 'redux-promise'
import thunker from 'redux-thunk'
import createLogger from 'redux-logger'

import {createExecutor} from 'executor'

import {actions as readerActions, reducer as readerReducer} from 'reader'
import {appReducer} from 'app-reducer'
import App from './app'

document.addEventListener('DOMContentLoaded', () => {
  const middleware = [
    thunker,
    promiser,
    createLogger(),
  ]
  const createStoreWithMiddleware = applyMiddleware.apply(this, middleware)(createStore)
  const reducer = combineReducers({
    reader: readerReducer,
    app: appReducer,
  })
  const readerStore = createStoreWithMiddleware(reducer)

  const bookExecutor = createExecutor({
    updateReader: (readerState) => {
      readerStore.dispatch(readerActions.updateInterface(readerState))
    },
  })

  bookExecutor.start()

  React.render(
    <Provider store={readerStore}>
      {() => <App />}
    </Provider>,
    document.body)
})
