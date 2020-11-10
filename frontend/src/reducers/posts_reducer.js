import { RECEIVE_POSTS, RECEIVE_USER_POSTS, RECEIVE_NEW_POST, RECEIVE_POST, RECEIVE_REGION_POSTS } from '../actions/post_actions';
  
  const PostsReducer = (state = { all: {}, region: {}, user: {}, new: undefined, post: {} }, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch(action.type) {
      case RECEIVE_POSTS:
        newState.all = action.posts.data;
        return newState;
      case RECEIVE_USER_POSTS:
        newState.user = action.posts.data;
        return newState;
      case RECEIVE_NEW_POST:
        // debugger
        newState.new = action.post.data
        // newState[action.post._id] = action.post
        return newState;
      case RECEIVE_POST:
        newState.post = action.post.data
        return newState;
      case RECEIVE_REGION_POSTS:
        newState.all = action.posts.data;
        newState.region = action.posts.data;
        return newState;
      default:
        return state;
    }
  };
  
  export default PostsReducer;