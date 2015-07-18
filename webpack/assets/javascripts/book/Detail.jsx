const React = require('react');

class Detail extends React.Component {
  render() {
    return <p>details for book {this.props.params.bookId}</p>;
  }
};

module.exports = Detail;
