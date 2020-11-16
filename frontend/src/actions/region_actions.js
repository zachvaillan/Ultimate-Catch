import { getRegions } from '../util/region_api_util';

export const RECEIVE_REGIONS = "RECEIVE_REGIONS";

export const receiveRegions = regions => ({
    type: RECEIVE_REGIONS,
    regions
});

export const fetchRegions = () => dispatch => (
    getRegions()
        .then(regions => dispatch(receiveRegions(regions)))
        .catch(err => console.log(err))
); 