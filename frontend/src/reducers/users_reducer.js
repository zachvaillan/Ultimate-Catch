import { RECEIVE_FOLLOW } from '../actions/user_actions';

const usersReducer = (state = {}, action) => {

  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_FOLLOW:
      return action.payload.data;
    default:
      return state
  }
};

export default usersReducer;