import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: {},
		token: '',
		authenticated: false,
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
		loadingUser: () => {
			return {
				loading: true,
			};
		},
		logoutUser: () => {
			return {
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
	setErrors,
	clearErrors,
} = userSlice.actions;

export default userSlice.reducer;
