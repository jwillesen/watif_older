if (typeof __TEST__ === 'undefined') require('./browser/browser.css');

import React from 'react';
import FluxComponent from 'flummox/component';
import BookGrid from './browser/BookGrid';

export default class Browser extends React.Component {
  render() {
    return (
      <FluxComponent connectToStores='books'>
        <BookGrid />
      </FluxComponent>
    );
  }
}
