require('bootstrap/dist/js/bootstrap.js');
if (typeof __TEST__ === 'undefined') require('bootstrap/dist/css/bootstrap.css');

import React from 'react';
import Router from 'react-router';
import {Provider} from 'react-redux';

import {combineReducers, applyMiddleware, createStore} from 'redux';
import thunker from 'redux-thunk';
import promiser from 'redux-promise';

import logger from './logger';
import * as reducers from './reducers';
import Routes from './Routes';

document.addEventListener('DOMContentLoaded', () => {
  const middleware = [
    thunker,
    promiser,
    logger,
  ];
  const createStoreWithMiddleware = applyMiddleware.apply(this, middleware)(createStore);
  const store = createStoreWithMiddleware(combineReducers(reducers));

  Router.run(Routes, Router.HistoryLocation, (Root) => {
    React.render(
      // wrap children of Provider in function to work around an issue in react 0.13
      <Provider store={store}>
        {() => <Root />}
      </Provider>,
      document.body);
  });
});
