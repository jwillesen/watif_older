
export default ({getState, dispatch}) => next => action => {
  console.log('action', action); // eslint-disable-line no-console
  return next(action);
};
