require('bootstrap/dist/js/bootstrap.js');
if (typeof __TEST__ === 'undefined') require('bootstrap/dist/css/bootstrap.css');

const React = require('react');
const Router = require('react-router');

const Routes = require('./Routes');

document.addEventListener('DOMContentLoaded', () => {

  Router.run(Routes, Router.HistoryLocation, (Root) => {
    React.render(<Root />, document.body);
  });
});
