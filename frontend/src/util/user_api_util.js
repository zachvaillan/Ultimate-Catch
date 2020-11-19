import axios from 'axios';

export const followUser = (actionId, currentId) => {
    return axios.post(`/api/users/follow/${actionId}/${currentId}`)
};

export const unfollowUser = (actionId, currentId) => {
    return axios.post(`/api/users/unfollow/${actionId}/${currentId}`)
};