import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import Card from './Card';

export default class BookGrid extends React.Component {
  cardList() {
    if (this.props.books.length === 0) {
      return <p>books not loaded</p>;
    }
    else {
      return this.props.books.map(book =>
        <Col key={book.id} xs={6} md={4}>
          <Card book={book} />
        </Col>
      );
    }
  }

  render() {
    return (
      <Grid className="book-grid">
        <Row>
          {this.cardList()}
        </Row>
      </Grid>
    );
  }
}
