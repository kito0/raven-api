import { createSlice } from '@reduxjs/toolkit';

export const postsSlice = createSlice({
	name: 'posts',
	initialState: {
		loading: true,
		posts: [],
	},
	reducers: {
		setPosts: (state, action) => {
			return {
				...state,
				posts: [...action.payload],
				loading: false,
			};
		},
		newPost: (state, action) => {
			return {
				...state,
				posts: [action.payload, ...state.posts],
				loading: false,
			};
		},
		editPost: (state, action) => {
			return {
				...state,
				posts: state.posts.filter((post) => post._id !== action.payload),
			};
		},
		deletePost: (state, action) => {
			return {
				...state,
				posts: state.posts.filter((post) => post._id !== action.payload),
				loading: false,
			};
		},
		loadingPosts: (state) => {
			return {
				...state,
				loading: true,
			};
		},
	},
});

export const {
	setPosts,
	newPost,
	editPost,
	deletePost,
	loadingPosts,
} = postsSlice.actions;

export default postsSlice.reducer;
