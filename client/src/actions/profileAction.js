import {GET_PROFILE, LOAD_PROFILE, CLEAR_CURRENT_PROFILE} from './types.js';
import axios from 'axios';

// get user profile
export const getUserProfile = () => dispatch => {
	dispatch(setProfileLoader());
	axios.get('/api/profile')
		.then(res => dispatch({
			type: GET_PROFILE,
			payload: res.data
		})).catch(err => dispatch({
			type: GET_PROFILE,
			payload: {}
		}));
};

// profile loading
export const setProfileLoader = () => {
	return {
		type: LOAD_PROFILE
	};
};

// clear current profile
export const clearProfile = () => {
	return {
		type: CLEAR_CURRENT_PROFILE
	};
};