import {
	loginUser,
	signupUser,
	loadingUser,
	logoutUser,
	getUser,
	editUser,
	setErrors,
	clearErrors,
} from './userSlice';
import axios from 'axios';

const api = 'https://raven-x.herokuapp.com/api/user';
//const api = 'http://localhost:5000/api/user';

export const LoginUser = async (dispatch, user) => {
	dispatch(loadingUser);
	await axios
		.post(`${api}/login`, user)
		.then((res) => {
			setAuthorizationHeader(res.data.token, res.data.user._id);
			dispatch(loginUser(res.data));
			dispatch(clearErrors());
		})
		.catch((err) => {
			dispatch(setErrors(err.response.data));
		});
};

export const SignupUser = async (dispatch, user) => {
	dispatch(loadingUser);
	await axios
		.post(`${api}/register`, user)
		.then((res) => {
			setAuthorizationHeader(res.data.token, res.data.user._id);
			dispatch(signupUser(res.data));
			dispatch(clearErrors());
		})
		.catch((err) => {
			dispatch(setErrors(err.response.data));
		});
};

export const LogoutUser = async (dispatch) => {
	localStorage.removeItem('auth-token');
	localStorage.removeItem('id');
	delete axios.defaults.headers.common['Authorization'];
	dispatch(logoutUser());
};

export const GetUser = async (dispatch, id) => {
	dispatch(loadingUser);
	await axios
		.get(`${api}/${id}`)
		.then((res) => {
			dispatch(getUser(res.data));
			dispatch(clearErrors());
		})
		.catch((err) => {
			dispatch(setErrors(err.response.data));
		});
};

export const UpdateUser = async (dispatch, id, user) => {
	await axios
		.put(`${api}/${id}`, user)
		.then((res) => {
			dispatch(editUser(res.data));
			dispatch(clearErrors());
		})
		.catch((err) => {
			dispatch(setErrors(err.response.data));
		});
};

const setAuthorizationHeader = (token, id) => {
	localStorage.setItem('auth-token', token);
	localStorage.setItem('id', id);
	axios.defaults.headers.common['Authorization'] = token;
};
