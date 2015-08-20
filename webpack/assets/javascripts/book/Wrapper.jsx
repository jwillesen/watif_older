import React from 'react';
import {RouteHandler} from 'react-router';
import {connect} from 'react-redux';
import {fetchBookIfNeeded} from '../actions';

class Wrapper extends React.Component {
  componentWillMount() {
    this.props.fetchBookIfNeeded(this.props.params.bookId);
  }

  render() {
    return (
      <div className="container">
        <RouteHandler book={this.props.book} />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  let book = state.bookDetails[ownProps.params.bookId];
  if (book) book = book.value;
  else book = {};
  return {book};
}

export default connect(
  mapStateToProps,
  {fetchBookIfNeeded}
)(Wrapper);

