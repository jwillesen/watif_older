import * as actions from './actions';

export function books(state = {value: []}, action) {
  switch (action.type) {
  case actions.FETCH_BOOKS:
    return action.error ?
      {status: 'error', error: action.payload, value: []} :
      {status: 'success', value: action.payload};
  }
  return state;
}

function bookValue(action) {
  return action.error ?
    {status: 'error', error: action.payload, value: {}} :
    {status: 'success', value: action.payload};
}

export function bookDetails(state = {}, action) {
  switch(action.type) {
  case actions.FETCH_BOOK:
    return {...state, [action.meta.bookId]: bookValue(action) };
  }
  return state;
}
