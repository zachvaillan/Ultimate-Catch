import { followUser, getUser } from '../util/user_api_util';

export const RECEIVE_FOLLOW = "RECEIVE_FOLLOW";
export const RECEIVE_USER = "RECEIVE_USER";

export const receiveFollower = ({
    type: RECEIVE_FOLLOW,
  });

  export const receiveUser = user => ({
    type: RECEIVE_USER,
    user
  })

export const follow = (actionId, currentId) => dispatch => (
    followUser(actionId, currentId)
      .then( () => dispatch(receiveFollower()))
      .catch(err => console.log(err))
  ); 

export const fetchUser = userId => dispatch => (
    getUser(userId)
        .then(user => console.log(user))
        .then(user => dispatch(receiveUser(user)))
        .catch(err => console.log(err))
    );
