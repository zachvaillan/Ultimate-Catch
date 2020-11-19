import axios from 'axios';

export const getRegions = () => {
    return axios.get('/api/regions')
};