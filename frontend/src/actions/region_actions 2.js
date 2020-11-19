import { getRegions } from '../util/region_api_util';

export const RECEIVE_REGIONS = "RECEIVE_REGIONS";

export const receiveRegions = regions => ({
    type: RECEIVE_REGIONS,
    regions
});

export const fetchRegions = () => dispatch => (
    getRegions()
        .then(posts => dispatch(receiveRegions(posts)))
        .catch(err => console.log(err))
); 