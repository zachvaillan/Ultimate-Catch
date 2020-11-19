import { fetchUserPosts } from '../../actions/post_actions';
import { connect } from 'react-redux';
import UserPosts from './user_posts';
import { heartPost, fetchPost, unheartPost, leaveComment } from '../../actions/post_actions';
import { follow, unfollow, fetchUser } from '../../actions/user_actions';

const mapStateToProps = state => {
    return {
        user: state.session.user,
        userId: state.session.user.id,
        userPosts: Object.values(state.entities.posts.userPosts),
        userPage: state.entities.users.userPage,
        nonSessionUser: state.entities
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserPosts: userId => dispatch(fetchUserPosts(userId)),
        heartPost: post => dispatch(heartPost(post)),
        unheartPost: post => dispatch(unheartPost(post)),
        leaveComment: (postId, commentData) => dispatch(leaveComment(postId, commentData)),
        fetchPost: (id) => dispatch(fetchPost(id)),
        follow: (actionId, currentId) => dispatch(follow(actionId, currentId)),
        unfollow: (actionId, currentId) => dispatch(unfollow(actionId, currentId)),
        fetchUser: userId => dispatch(fetchUser(userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPosts);
