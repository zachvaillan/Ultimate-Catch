import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { withRouter } from 'react-router-dom';
import { fetchPosts } from '../../actions/post_actions'


import NavBar from './navbar';

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated,
  posts: state.entities.posts
});

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    fetchPosts: () => dispatch(fetchPosts())
  };
};

export default withRouter(connect(
  mapStateToProps, mapDispatchToProps
)(NavBar));