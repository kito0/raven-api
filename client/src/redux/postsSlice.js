import { createSlice } from '@reduxjs/toolkit';

export const postsSlice = createSlice({
	name: 'posts',
	initialState: {
		loading: false,
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
			state.posts.push(action.payload);
		},
		editPost: (state, action) => {
			const index = state.posts.findIndex(
				(post) => post._id === action.payload._id
			);
			const newArr = [...state.posts];
			newArr[index] = action.payload;
			console.log(action.payload._id);
			console.log(index);
			return {
				...state,
				posts: [...newArr],
			};
		},
		deletePost: (state, action) => {
			return {
				...state,
				posts: state.posts.filter((post) => post._id !== action.payload),
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
