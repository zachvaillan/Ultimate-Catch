import { FOUND_USERS } from '../actions/search_actions';

const searchReducer = (state = {}, action) => {

  Object.freeze(state);
  switch (action.type) {
    case FOUND_USERS:
      return action.payload.data;
    default:
      return state
  }
};

export default searchReducer;