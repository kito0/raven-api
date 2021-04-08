import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: {},
		token: localStorage.getItem('auth-token'),
		authenticated: localStorage.getItem('auth-token') ? true : false,
		loadingUser: true,
		errors: null,
		updateErrors: null,
	},
	reducers: {
		loginUser: (state, action) => {
			return {
				...state,
				user: action.payload.user,
				token: action.payload.token,
				authenticated: true,
				loadingUser: false,
			};
		},
		signupUser: (state, action) => {
			return {
				...state,
				user: action.payload.user,
				token: action.payload.token,
				authenticated: true,
				loadingUser: false,
			};
		},
		loadingUser: (state) => {
			return {
				...state,
				loadingUser: true,
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
				loadingUser: false,
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
		setUpdateErrors: (state, action) => {
			return {
				...state,
				updateErrors: action.payload,
			};
		},
		clearUpdateErrors: (state) => {
			return {
				...state,
				updateErrors: null,
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
	setUpdateErrors,
	clearUpdateErrors,
} = userSlice.actions;

export default userSlice.reducer;
