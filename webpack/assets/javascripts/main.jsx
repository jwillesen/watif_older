require('bootstrap/dist/js/bootstrap.js');
if (typeof __TEST__ === 'undefined') require('bootstrap/dist/css/bootstrap.css');

import React from 'react';
import Router from 'react-router';
import FluxComponent from 'flummox/component';

import AppFlux from './AppFlux';
import Routes from './Routes';

document.addEventListener('DOMContentLoaded', () => {
  let flux = new AppFlux();

  Router.run(Routes, Router.HistoryLocation, (Root) => {
    React.render(
      <FluxComponent flux={flux}>
        <Root />
      </FluxComponent>,
      document.body);
  });
});
