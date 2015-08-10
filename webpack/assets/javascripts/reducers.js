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
