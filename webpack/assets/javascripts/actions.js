import {createAction} from 'redux-actions';
import * as api from './api';

function shouldFetchBooks(state) {
  return state.books ? state.books.status !== 'success' : true;
}

export const FETCH_BOOKS = 'FETCH_BOOKS';
export const fetchBooks = createAction(FETCH_BOOKS, () => api.fetchBooks());
export function fetchBooksIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchBooks(getState())) return dispatch(fetchBooks());
    else return null;
  };
}
