import React from 'react';
import {Route, DefaultRoute} from 'react-router';

import App from './App';
import Home from './Home';
import Browser from './Browser';
import BookDetail from './book/Detail';
import BookPlayer from './book/Player';

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

export default Routes;
