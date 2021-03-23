import { loginUser, signupUser, loadingUser } from './userSlice';
import axios from 'axios';

//const api = 'https://raven-x.herokuapp.com/api/user';
const api = 'http://localhost:5000/api/user';

export const LoginUser = async (dispatch, user) => {
	dispatch(loadingUser);
	await axios
		.post(`${api}/login`, user)
		.then((res) => dispatch(loginUser(res.data)))
		.catch((err) => console.error(err));
};

export const SignupUser = async (dispatch, user) => {
	dispatch(loadingUser);
	await axios
		.post(`${api}/signup`, user)
		.then((res) => dispatch(signupUser(res.data)))
		.catch((err) => console.error(err));
};
