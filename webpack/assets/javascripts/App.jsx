import React from 'react';
import {RouteHandler} from 'react-router';

import Navigation from './Navigation';

export default class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Navigation />
        <RouteHandler />
      </div>
    );
  }
};
