import rest from 'rest';
import mime from 'rest/interceptor/mime';

export function fetchBooks() {
  return rest.wrap(mime)({
    path: '/api/books',
  }).entity();
}
