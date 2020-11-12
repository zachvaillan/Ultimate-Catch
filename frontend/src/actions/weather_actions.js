import * as APIUtil from '../util/weather_api_util';

export const RECEIVE_WEATHER = "RECEIVE_WEATHER"
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";

export const receiveWeather = (weather) => ({
    type: RECEIVE_WEATHER,
    weather
});
// We dispatch this one to show authentication errors on the frontend
export const receiveErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});
export const fetchWeather = (lat,lng) => dispatch => (
    APIUtil.fetchWeather(lat,lng).then((weather) => (
        dispatch(receiveWeather(weather))
    ), err => (
        dispatch(receiveErrors(err.response.data))
    ))
);