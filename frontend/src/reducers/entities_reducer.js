import { combineReducers } from 'redux';
import search from './search_reducer'
import users from './users_reducer'
// import weather from './weather_reducer';
import posts from './posts_reducer';
import regions from './regions_reducer';

export default combineReducers({
    // weather,
    posts,
    search,
    regions,
    users
});