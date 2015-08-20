import {createAction} from 'redux-actions';
import * as api from './api';

function shouldFetchBooks(state) {
  return state.books ? state.books.status !== 'success' : true;
}

function shouldFetchBook(state, bookId) {
  const asyncValue = state.bookDetails[bookId];
  return asyncValue ? asyncValue.status !== 'success' : true;
}

export const FETCH_BOOKS = 'FETCH_BOOKS';
export const fetchBooks = createAction(FETCH_BOOKS, () => api.fetchBooks());
export function fetchBooksIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchBooks(getState())) return dispatch(fetchBooks());
    else return null;
  };
}

export const FETCH_BOOK = 'FETCH_BOOK';
export const fetchBook = createAction(FETCH_BOOK,
  bookId => api.fetchBook(bookId),
  bookId => ({bookId})
);
export function fetchBookIfNeeded(bookId) {
  return (dispatch, getState) => {
    if (shouldFetchBook(getState(), bookId)) return dispatch(fetchBook(bookId));
    else return null;
  };
}
