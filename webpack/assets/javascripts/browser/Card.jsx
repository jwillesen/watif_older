import React from 'react';

import {Thumbnail, ButtonToolbar, Button} from 'react-bootstrap';
import {ButtonLink} from 'react-router-bootstrap';

export default class Card extends React.Component {
  render() {
    let book = this.props.book;

    return (
      <Thumbnail className="book-grid__card clearfix" src={book.thumbnailUrl} alt=''>
        <h3>{book.title}<br/>
          <p className='text-right'><small>by {book.author}</small></p>
        </h3>
        <p className="browser__card-description">{book.description}</p>
        <ButtonToolbar className="pull-right">
          <ButtonLink to="book-info" params={{bookId: book.id}} bsStyle='info'>Info</ButtonLink>
          <ButtonLink to="book-play" params={{bookId: book.id}} bsStyle='primary'>Play</ButtonLink>
        </ButtonToolbar>
      </Thumbnail>
    );
  }
}
