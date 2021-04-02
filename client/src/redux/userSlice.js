import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: {},
		token: localStorage.getItem('auth-token'),
		authenticated: localStorage.getItem('auth-token') ? true : false,
		loading: false,
	},
	reducers: {
		loginUser: (state, action) => {
			return {
				...state,
				user: action.payload.user,
				token: action.payload.token,
				authenticated: true,
				loading: false,
			};
		},
		signupUser: (state, action) => {
			return {
				...state,
				user: action.payload.user,
				token: action.payload.token,
				authenticated: true,
				loading: false,
			};
		},
		loadingUser: (state) => {
			return {
				...state,
				loading: true,
			};
		},
		logoutUser: (state) => {
			return {
				...state,
				user: {},
				token: '',
				authenticated: false,
			};
		},
		getUser: (state, action) => {
			return {
				...state,
				user: action.payload,
				loading: false,
			};
		},
		editUser: (state, action) => {
			return {
				...state,
				user: action.payload,
			};
		},
		setErrors: (state, action) => {
			return {
				...state,
				errors: action.payload,
			};
		},
		clearErrors: (state) => {
			return {
				...state,
				errors: null,
			};
		},
	},
});

export const {
	loginUser,
	signupUser,
	loadingUser,
	logoutUser,
	getUser,
	editUser,
	setErrors,
	clearErrors,
} = userSlice.actions;

export default userSlice.reducer;
