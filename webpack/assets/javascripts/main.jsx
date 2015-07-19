require('bootstrap/dist/js/bootstrap.js');
if (typeof __TEST__ === 'undefined') require('bootstrap/dist/css/bootstrap.css');

import React from 'react';
import Router from 'react-router';

import Routes from './Routes';

document.addEventListener('DOMContentLoaded', () => {

  Router.run(Routes, Router.HistoryLocation, (Root) => {
    React.render(<Root />, document.body);
  });
});
