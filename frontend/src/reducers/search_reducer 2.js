import { RECEIVE_FISH } from '../actions/search_actions';

const searchReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_FISH:
      debugger
      return action.fish
    default:
      return state
  }
};

export default searchReducer;