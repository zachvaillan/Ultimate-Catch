import { followUser } from '../util/user_api_util';

export const RECEIVE_FOLLOW = "RECEIVE_FOLLOW";

export const receiveFollower = ({
    type: RECEIVE_FOLLOW,
  });

export const follow = (actionId, currentId) => dispatch => (
    followUser(actionId, currentId)
      .then( () => dispatch(receiveFollower()))
      .catch(err => console.log(err))
  ); 