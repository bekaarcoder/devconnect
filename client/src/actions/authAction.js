import {GET_ERRORS, SET_CURRENT_USER} from './types';
import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

// Register user
export const registerUser = (userData, history) => dispatch => {
	axios.post('/api/users/register', userData)
		.then(res => history.push('/login'))
		.catch(err => dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		}));
};

// Login- get user token
export const loginUser = (userdata) => dispatch => {
	axios.post('/api/users/login', userData)
		.then(res => {
			// save to localStorage
			const {token} = res.data;
			localStorage.setItem('jwtToken', token);
			// set token to auth header
			setAuthToken(token);
			// decode token
			const decoded = jwt_decode(token);
			// set current user
			dispatch(setCurrentUser(decoded));
		}).catch(err => dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		}));
};

// set logged in user
export const setCurrentUser = (decoded) => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	}
};