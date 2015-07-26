import {Store} from 'flummox';

export default class BookStore extends Store {
  constructor(flux) {
    super();

    const bookActionIds = flux.getActionIds('books');
    this.register(bookActionIds.fetchBooks, this.handleFetchBooks);

    this.state = {
      books: [],
    };
  }

  handleFetchBooks(books) {
    this.setState({
      books: books,
    });
  }

}
