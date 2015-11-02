require('file?name=[name].[ext]!index.html')
require('bootstrap/dist/css/bootstrap.css')
require('imports?jQuery=jquery!bootstrap/dist/js/bootstrap.js')

import React from 'react'
import ReactDOM from 'react-dom'

import {applyMiddleware, combineReducers, createStore} from 'redux'
import {Provider} from 'react-redux'
import promiser from 'redux-promise'
import thunker from 'redux-thunk'
import createLogger from 'redux-logger'

import {createExecutor} from 'executor'
import {loadBook} from 'watif/book-parser'
import book from 'book'

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

  const initialState = loadBook(book)

  const bookExecutor = createExecutor({
    updateReader: (readerState) => {
      readerStore.dispatch(readerActions.updateInterface(readerState))
    },
    initialState,
  })

  bookExecutor.start()

  ReactDOM.render(
    <Provider store={readerStore}>
      <App executor={bookExecutor} />
    </Provider>,
    document.getElementById('watif-reader'))
})
