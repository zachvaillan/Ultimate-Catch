import { connect } from 'react-redux';
import { fetchPosts, heartPost, fetchPost, unheartPost, leaveComment, fetchPostsByRegion } from '../../actions/post_actions';
import PostsIndex from './posts_index';
import post_index_item from './post_index_item';
import {fetchRegions} from '../../actions/region_actions'
import { fetchWeather } from '../../actions/weather_actions'

const mapStateToProps = (state) => {
  return {
    posts: Object.values(state.entities.posts.all),
    regionPosts: Object.values(state.entities.posts.region),
    userId: state.session.user.id,
    user: state.session.user,
    regionId: state.posts,
    regions: state.entities.regions,
    weather: state.entities.weather,
    // region: state.
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    heartPost: post => dispatch(heartPost(post)),
    unheartPost: post => dispatch(unheartPost(post)),
    leaveComment: (postId, commentData) => dispatch(leaveComment(postId, commentData)),
    fetchPostsByRegion: (regionId) => dispatch(fetchPostsByRegion(regionId)),
    fetchRegions: () => dispatch(fetchRegions()),
    fetchWeather: (lat, lng) => dispatch(fetchWeather(lat, lng)),
    fetchPost: (id) => dispatch(fetchPost(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsIndex);