import React from 'react';

export default class Player extends React.Component {
  render() {
    return <p>Play book {this.props.params.bookId}</p>;
  }
}
