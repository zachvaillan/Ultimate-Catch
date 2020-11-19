import { RECEIVE_FOLLOW, RECEIVE_USER } from '../actions/user_actions';

const usersReducer = (state = {}, action) => {

  Object.freeze(state);
  let newState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_FOLLOW:
        console.log("hello")
    case RECEIVE_USER:  
        newState.userPage = action.user.data
        return newState;
    default:
      return state
  }
};

export default usersReducer;