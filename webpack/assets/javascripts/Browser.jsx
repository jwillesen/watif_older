if (typeof __TEST__ === 'undefined') require('./browser/browser.css');

import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import FluxComponent from 'flummox/component';
import BookGrid from './browser/BookGrid';
import Card from './browser/Card';

export default class Browser extends React.Component {
  render() {
    return (
      <FluxComponent connectToStores='books'>
        <BookGrid />
      </FluxComponent>
    );
  }
}
