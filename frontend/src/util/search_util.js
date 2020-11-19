import axios from 'axios';

export const searchUsers = (query) => {
  return axios.get(`/api/users/${query}`)
};

export const findUserById = (query) => {
  return axios.get(`/api/users/search/${query}`)
};

