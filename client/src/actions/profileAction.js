import {GET_PROFILE, LOAD_PROFILE, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER} from './types.js';
import axios from 'axios';

// get user profile
export const getUserProfile = () => dispatch => {
	dispatch(setProfileLoader());
	axios.get('/api/profile', {headers: {"Authorization": localStorage.getItem('jwtToken')}})
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

// create profile
export const createNewProfile = (userData, history) => dispatch => {
	axios.post('/api/profile', userData, {headers: {"Authorization": localStorage.getItem('jwtToken')}})
		.then(res => history.push('/dashboard'))
		.catch(err => dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		}));
}

// Delete Profile
export const deleteProfile = () => dispatch => {
	if(window.confirm("Are you sure you want to delete your profile?")) {
		axios.delete('/api/profile', {headers: {"Authorization": localStorage.getItem('jwtToken')}})
			.then(res => dispatch({
				type: SET_CURRENT_USER,
				payload: {}
			}))
			.catch(err => dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			}));
	}
}

// add experience
export const addExperience = (userData, history) => dispatch => {
	axios.post('/api/profile/experience', userData, {headers: {"Authorization": localStorage.getItem('jwtToken')}})
		.then(res => history.push('/dashboard'))
		.catch(err => dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		}));
}

// delete experience
export const deleteExperience = (exp_id) => dispatch => {
	if(window.confirm("Are you sure you want to delete this experience?")) {
		axios.delete(`/api/profile/experience/${exp_id}`, {headers: {"Authorization": localStorage.getItem('jwtToken')}})
			.then(res => dispatch({
				type: GET_PROFILE,
				payload: res.data
			}))
			.catch(err => dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			}));
	}
}

// add education
export const addEducation = (userData, history) => dispatch => {
	axios.post('/api/profile/education', userData, {headers: {"Authorization": localStorage.getItem('jwtToken')}})
		.then(res => history.push('/dashboard'))
		.catch(err => dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		}));
}

// delete education
export const deleteEducation = (edu_id) => dispatch => {
	if(window.confirm("Are you sure you want to delete this education?")) {
		axios.delete(`/api/profile/education/${edu_id}`, {headers: {"Authorization": localStorage.getItem('jwtToken')}})
			.then(res => dispatch({
				type: GET_PROFILE,
				payload: res.data
			}))
			.catch(err => dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			}));
	}
}