import React from 'react';

import {Thumbnail, ButtonToolbar, Button} from 'react-bootstrap';
import {ButtonLink} from 'react-router-bootstrap';

export default class Card extends React.Component {
  render() {
    return(
      <Thumbnail src='images/duck.jpg' alt=''>
        <h3>Title</h3>
        <p>Description</p>
        <ButtonToolbar>
          <ButtonLink to="book-info" params={{bookId: 42}} bsStyle='info'>Info</ButtonLink>
          <ButtonLink to="book-play" params={{bookId: 42}} bsStyle='primary'>Play</ButtonLink>
        </ButtonToolbar>
      </Thumbnail>
    );
  }
};
