import axios from 'axios';

export const getPosts = () => {
  return axios.get('/api/posts')
};

export const getRegionPosts = (regionId) => {
  return axios.get(`/api/posts/region/${regionId}`)
};

export const getPost = id => {
  return axios.get(`/api/posts/${id}`)
};

export const getUserPosts = id => {
  return axios.get(`/api/posts/user/${id}`)
};

export const writePost = data => {
  return axios.post('/api/posts/', data)
}

export const likePost = (id, likeData) => {
  // console.log(id)
  // console.log(axios.put(`/api/posts/${id}`))
  return axios.post(`/api/posts/like/${id}`, likeData)
}

export const unlikePost = (id, likeData) => {
  // console.log(id)
  // console.log(axios.put(`/api/posts/${id}`))
  return axios.post(`/api/posts/unlike/${id}`, likeData)
}

export const commentPost = (id, commentData) => {
  return axios.post(`/api/posts/comment/${id}`, commentData)
}