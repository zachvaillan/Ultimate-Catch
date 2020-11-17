import { searchUsers } from '../util/search_util';

export const FOUND_USERS = 'FOUND_USERS';

const foundUsers = payload => {
  return {
    type: FOUND_USERS,
    payload
  }
};

export const userSearch = query => dispatch => {
  return (
    searchUsers(query)
      .then(data => dispatch(foundUsers(data)))
      .catch(err => console.log(err))
  )
}