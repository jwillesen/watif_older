import React from 'react';
import {RouteHandler} from 'react-router';

export default class Wrapper extends React.Component {
  render() {
    return (
      <div className="container">
        <RouteHandler />
      </div>
    );
  }
}
