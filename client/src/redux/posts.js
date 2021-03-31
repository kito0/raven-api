import {
	setPosts,
	newPost,
	editPost,
	deletePost,
	loadingPosts,
} from './postsSlice.js';
import axios from 'axios';

const api = 'https://raven-x.herokuapp.com/api/posts';

export const GetPosts = async (dispatch) => {
	await axios
		.get(api)
		.then((res) => dispatch(setPosts(res.data)))
		.catch((err) => console.error(err));
};

export const NewPost = async (dispatch, post) => {
	await axios
		.post(api, post, {
			headers: {
				'content-type': 'application/json',
				'auth-token': localStorage.getItem('auth-token'),
			},
		})
		.then((res) => dispatch(newPost(res.data)))
		.catch((err) => console.error(err));
};

export const EditPost = async (dispatch, id) => {
	dispatch(loadingPosts());
	await axios
		.put(`${api}/${id}`)
		.then(() => dispatch(editPost(id)))
		.catch((err) => console.error(err));
};

export const DeletePost = async (dispatch, id) => {
	await axios
		.delete(`${api}/${id}`, {
			headers: {
				'auth-token': localStorage.getItem('auth-token'),
			},
		})
		.then(() => dispatch(deletePost(id)))
		.catch((err) => console.error(err));
};
