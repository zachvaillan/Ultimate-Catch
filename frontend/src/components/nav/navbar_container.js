import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { withRouter } from 'react-router-dom';
import { fetchPosts } from '../../actions/post_actions';
import { userSearch } from '../../actions/search_actions';


import NavBar from './navbar';

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated,
  posts: state.entities.posts,
  search: state.entities.search
});

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    fetchPosts: () => dispatch(fetchPosts()),
    userSearch: (query) => dispatch(userSearch(query))
  };
};

export default withRouter(connect(
  mapStateToProps, mapDispatchToProps
)(NavBar));