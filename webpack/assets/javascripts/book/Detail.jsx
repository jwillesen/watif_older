import React from 'react';

export default class Detail extends React.Component {
  render() {
    if (!this.props.book.id) return <p>Loading...</p>;

    return (
      <div>
        <h1>{this.props.book.title}</h1>
        <p>{this.props.book.description}</p>
      </div>
    );
  }
}
