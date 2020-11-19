import axios from 'axios';

export const followUser = (actionId, currentId) => {
    return axios.post(`/api/users/follow/${actionId}/${currentId}`)
};

export const getUser = id => {
    console.log("hello")
    return axios.get(`/api/users/${id}`)
};