import React from 'react';

export default class Detail extends React.Component {
  render() {
    return <p>details for book {this.props.params.bookId}</p>;
  }
}
