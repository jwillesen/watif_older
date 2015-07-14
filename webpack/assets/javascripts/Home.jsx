const React = require('react')
const RB = require('react-bootstrap');
const Jumbotron = RB.Jumbotron;

class Home extends React.Component {
  render() {
    return (
      <Jumbotron>
        <h1>Welcome to watif</h1>
        <p>Watif is an interactive fiction playing and authoring system.</p>
        <p>Oh, and the answer is {gon.answer}</p>
      </Jumbotron>
    );
  }
};

module.exports = Home;
