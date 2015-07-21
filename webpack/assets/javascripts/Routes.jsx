import React from 'react';
import {Route, DefaultRoute, NotFoundRoute} from 'react-router';

import App from './App';
import BookDetail from './book/Detail';
import BookPlayer from './book/Player';
import Browser from './Browser';
import Home from './Home';
import NotFound from './NotFound';

const Routes = (
  <Route handler={App}>
    <DefaultRoute name="home" handler={Home} />
    <Route name="browse" handler={Browser} />
    <Route name="books">
      <Route name="book-info" path=":bookId" handler={BookDetail} />
      <Route name="book-play" path=":bookId/play" handler={BookPlayer} />
    </Route>
    <NotFoundRoute handler={NotFound} />
  </Route>
);

export default Routes;
