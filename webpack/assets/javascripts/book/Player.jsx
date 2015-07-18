const React = require('react');

class Player extends React.Component {
  render() {
    return <p>Play book {this.props.params.bookId}</p>;
  }
};

module.exports = Player;
