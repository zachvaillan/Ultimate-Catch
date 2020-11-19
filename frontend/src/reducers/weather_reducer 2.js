import {
    RECEIVE_WEATHER
} from '../actions/weather_actions';


const weatherReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state)
    switch (action.type) {
        case RECEIVE_WEATHER:
            newState = action.weather
            return newState
        default:
            return state;
    }
};

export default weatherReducer;