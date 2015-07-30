import React from 'react';
import {Jumbotron} from 'react-bootstrap';

export default class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <Jumbotron>
          <h1>Welcome to watif</h1>
          <p>Watif is an interactive fiction playing and authoring system.</p>
          <p>Oh, and the answer is {gon.answer}</p>
        </Jumbotron>
      </div>
    );
  }
}
