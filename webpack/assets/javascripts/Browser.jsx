if (typeof __TEST__ === 'undefined') require('./browser/browser.css');

import React from 'react';
import {connect} from 'react-redux';

import {fetchBooksIfNeeded} from './actions';
import BookGrid from './browser/BookGrid';

class Browser extends React.Component {
  componentWillMount() {
    this.props.fetchBooksIfNeeded();
  }

  render() {
    return <BookGrid books={this.props.books.value} />;
  }
}

function mapStateToProps(state) {
  return {books: state.books};
}

export default connect(
  mapStateToProps,
  {fetchBooksIfNeeded}
)(Browser);
