import {Actions} from 'flummox';
import rest from 'rest';
import mime from 'rest/interceptor/mime';

export default class BookActions extends Actions {
  async fetchBooks() {
    try {
      return await this.serverFetchBooks();
    } catch (error) {
      // TODO: really handle the error
      console.warn(error);
    }
  }

  serverFetchBooks() {
    return rest.wrap(mime)({
      path: '/api/books',
    }).entity();
  }
}
