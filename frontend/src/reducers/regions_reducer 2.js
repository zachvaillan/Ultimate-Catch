import { RECEIVE_REGIONS } from '../actions/region_actions';

const RegionsReducer = (state = { }, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_REGIONS:
            newState  = action.regions.data;
            return newState;
        default:
            return state;
    }
};

export default RegionsReducer;