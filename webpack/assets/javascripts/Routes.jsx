const React = require('react');
const Router = require('react-router');
const Route = Router.Route;
const DefaultRoute = Router.DefaultRoute;

const App = require('./App');
const Home = require('./Home');

const Routes = (
  <Route handler={App}>
    <DefaultRoute handler={Home} />
  </Route>
);

module.exports = Routes;
