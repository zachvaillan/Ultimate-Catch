import { fetchUserPosts } from '../../actions/post_actions';
import { connect } from 'react-redux';
import UserPosts from './user_posts';
import { heartPost, fetchPost, unheartPost, leaveComment } from '../../actions/post_actions';

const mapStateToProps = state => {
    return {
        user: state.session.user,
        userId: state.session.user.id,
        userPosts: Object.values(state.entities.posts.user)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserPosts: userId => dispatch(fetchUserPosts(userId)),
        heartPost: post => dispatch(heartPost(post)),
        unheartPost: post => dispatch(unheartPost(post)),
        leaveComment: (postId, commentData) => dispatch(leaveComment(postId, commentData)),
        fetchPost: (id) => dispatch(fetchPost(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPosts);
