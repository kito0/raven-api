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
				user: [action.payload, ...state.deadline],
				authenticated: true,
				loading: false,
			};
		},
		loadingUser: (state, action) => {
			return {
				loading: true,
			};
		},
	},
});

export const { loginUser, signupUser, loadingUser } = userSlice.actions;

export default userSlice.reducer;
