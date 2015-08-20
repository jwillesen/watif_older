import rest from 'rest';
import mime from 'rest/interceptor/mime';

const fetch = rest.wrap(mime);

export function fetchBooks() {
  return fetch({
    path: '/api/books',
  }).entity();
}

export function fetchBook(bookId) {
  return fetch({
    path: `/api/books/${bookId}`,
  }).entity();
}
