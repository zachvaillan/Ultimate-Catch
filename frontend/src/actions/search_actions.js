import * as APIUtil from '../util/search_util';

export const RECEIVE_FISH = 'RECEIVE_FISH';

const receiveFish = fish => {
  // debugger
  return ({
    type: RECEIVE_FISH,
    fish
  });
};

export const fetchFish = query => dispatch => {
  // debugger
  return (
    APIUtil.getFish(query)
      .then(fish => dispatch(receiveFish(fish)))
      .catch(err => console.log('BOB'))
  )
};