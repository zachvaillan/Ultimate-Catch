import { connect } from 'react-redux';
import Map from './map'
import {fetchWeather} from '../../actions/weather_actions'
import { fetchPosts, fetchPostsByRegion} from '../../actions/post_actions'
import {fetchRegions} from '../../actions/region_actions'
const mapStateToProps = (state) => {
    return {
        loggedIn: state.session.isAuthenticated,
        posts: Object.values(state.entities.posts.all),

        // weatherBool: false,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPostsByRegion: (regionId) => dispatch(fetchPostsByRegion(regionId)),
        fetchPosts: () => dispatch(fetchPosts()),
        fetchRegions: () => dispatch(fetchRegions())
        //fetchRegions
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);