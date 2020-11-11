import { connect } from 'react-redux';
import { composePost } from '../../actions/post_actions';
import PostForm from './post_form';

const mapDispatchToProps = dispatch => {
  return {
    composePost: post => dispatch(composePost(post))
  };
};

export default connect(null, mapDispatchToProps)(PostForm);