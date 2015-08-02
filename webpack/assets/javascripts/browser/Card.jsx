import React from 'react';

import {Thumbnail, ButtonToolbar, Glyphicon} from 'react-bootstrap';
import {ButtonLink} from 'react-router-bootstrap';

export default class Card extends React.Component {
  render() {
    let book = this.props.book;

    return (
      <Thumbnail className="browser__card clearfix" src={book.thumbnailUrl} alt=''>
        <h3 className='browser__card-title'>{book.title}</h3>
        <p className='text-right'><small>by {book.author}</small></p>
        <p className="browser__card-description">{book.description}</p>
        <ButtonToolbar className="pull-right">
          <ButtonLink to="book-info" params={{bookId: book.id}} bsStyle='default'>
            <Glyphicon glyph="info-sign" /> Info
          </ButtonLink>
          <ButtonLink to="book-play" params={{bookId: book.id}} bsStyle='primary'>
            <Glyphicon glyph="play-circle" /> Play
          </ButtonLink>
        </ButtonToolbar>
      </Thumbnail>
    );
  }
}
