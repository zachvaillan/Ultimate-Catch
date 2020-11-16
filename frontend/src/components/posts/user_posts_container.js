import { fetchUserPosts } from '../../actions/post_actions';
import { connect } from 'react-redux';
import UserPosts from './user_posts';

const mapStateToProps = state => {
    return {
        user: state.session.user,
        userPosts: Object.values(state.entities.posts.user)
    };
};

const mapDispatchToProps = dispatch => {
    return {
      fetchUserPosts: userId => dispatch(fetchUserPosts(userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPosts);
