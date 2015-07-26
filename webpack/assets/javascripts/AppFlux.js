import {Flux} from 'flummox';
import BookActions from './book/BookActions';
import BookStore from './book/BookStore';

export default class AppFlux extends Flux {
  constructor() {
    super();

    this.createActions('books', BookActions);
    this.createStore('books', BookStore, this);
  }
}
