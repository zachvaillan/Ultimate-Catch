import { getPosts, getPost, getUserPosts, writePost, likePost, getRegionPosts, unlikePost, commentPost } from '../util/post_api_util';

export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_USER_POSTS = "RECEIVE_USER_POSTS";
export const RECEIVE_NEW_POST = "RECEIVE_NEW_POST";
export const RECEIVE_POST = "RECEIVE_POST";
export const RECEIVE_REGION_POSTS = "RECEIVE_REGION_POSTS";

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
});

export const receiveUserPosts = posts => ({
  type: RECEIVE_USER_POSTS,
  posts
});

export const receiveNewPost = post => ({
  type: RECEIVE_NEW_POST,
  post
})

export const receivePost = post => ({
  type: RECEIVE_POST,
  post
})

export const receiveRegionPosts = posts => ({
  type: RECEIVE_REGION_POSTS,
  posts
})

export const fetchPosts = () => dispatch => (
  getPosts()
    .then(posts => dispatch(receivePosts(posts)))
    .catch(err => console.log(err))
); 

export const fetchPostsByRegion = (regionId) => dispatch => (
  console.log(regionId),
  getRegionPosts(regionId)
    .then(posts => dispatch(receiveRegionPosts(posts)))
    .catch(err => console.log(err))
);

export const fetchUserPosts = id => dispatch => (
  getUserPosts(id)
    .then(posts => dispatch(receiveUserPosts(posts)))
    .catch(err => console.log(err))
);

export const composePost = data => dispatch => (
  
  writePost(data)
    .then(post => dispatch(receiveNewPost(post)))
    .catch(err => console.log(err))
);

export const fetchPost = postId => dispatch => (
  getPost(postId)
    .then(post => dispatch(receivePost(post)))
    .catch(err => console.log(err))
);

export const heartPost = (postId, likeData) => dispatch => (
  // console.log(post)  THIS IS WHERE YOUR ERROR WAS ZACH post.id undefined but post._id exists
  likePost(postId, likeData)
    .then(post => dispatch(receivePost(post)))
    .catch(err => console.log(err))
);

export const unheartPost = (postId, likeData) => dispatch => (
  // console.log(post)  THIS IS WHERE YOUR ERROR WAS ZACH post.id undefined but post._id exists
  unlikePost(postId, likeData)
    .then(post => dispatch(receivePost(post)))
    .catch(err => console.log(err))
);

export const leaveComment = (postId, commentData) => dispatch => (
  commentPost(postId, commentData)
    .then(post => dispatch(receivePost(post)))
    .catch(err => console.log(err))
);