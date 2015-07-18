const React = require('react');
const Router = require('react-router');
const Route = Router.Route;
const DefaultRoute = Router.DefaultRoute;

const App = require('./App');
const Home = require('./Home');
const Browser = require('./Browser');
const BookDetail = require('./book/Detail');
const BookPlayer = require('./book/Player');

const Routes = (
  <Route handler={App}>
    <DefaultRoute name="home" handler={Home} />
    <Route name="browse" handler={Browser} />
    <Route name="books">
      <Route name="book-info" path=":bookId" handler={BookDetail} />
      <Route name="book-play" path=":bookId/play" handler={BookPlayer} />
    </Route>
  </Route>
);

module.exports = Routes;
