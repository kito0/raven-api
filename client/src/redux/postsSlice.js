import { createSlice } from '@reduxjs/toolkit';

export const postsSlice = createSlice({
	name: 'posts',
	initialState: {
		posts: [],
		loading: true,
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
				posts: [action.payload, state.posts],
			};
		},
		editPost: (state, action) => {
			return {
				...state,
				posts: action.payload,
			};
		},
		deletePost: (state, action) => {
			return {
				...state,
				posts: state.posts.filter((post) => post._id !== action.payload),
			};
		},
		loadingPosts: () => {
			return {
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
