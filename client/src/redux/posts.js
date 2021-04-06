import {
	setPosts,
	newPost,
	editPost,
	deletePost,
	loadingPosts,
} from './postsSlice.js';
import axios from 'axios';

const api = 'https://raven-x.herokuapp.com/api/posts';
//const api = 'http://localhost:5000/api/posts';

export const GetPosts = async (dispatch) => {
	dispatch(loadingPosts());
	await axios
		.get(api)
		.then((res) => dispatch(setPosts(res.data)))
		.catch((err) => console.error(err));
};

export const GetPostsByUser = async (dispatch, handle) => {
	dispatch(loadingPosts());
	await axios
		.get(`${api}/${handle}`)
		.then((res) => dispatch(setPosts(res.data)))
		.catch((err) => console.error(err));
};

export const NewPost = async (dispatch, post) => {
	await axios
		.post(api, post, {
			headers: { 'auth-token': localStorage.getItem('auth-token') },
		})
		.then((res) => dispatch(newPost(res.data)))
		.catch((err) => console.error(err));
};

export const EditPost = async (dispatch, id) => {
	await axios
		.put(`${api}/${id}`)
		.then(() => dispatch(editPost(id)))
		.catch((err) => console.error(err));
};

export const DeletePost = async (dispatch, id) => {
	await axios
		.delete(`${api}/${id}`, {
			headers: { 'auth-token': localStorage.getItem('auth-token') },
		})
		.then(() => dispatch(deletePost(id)))
		.catch((err) => console.error(err));
};

export const UpdatePosts = async (handle, name, avatar) => {
	await axios
		.put(
			`${api}/update/${handle}`,
			{
				name: name,
				avatar: avatar,
			},
			{ headers: { 'auth-token': localStorage.getItem('auth-token') } }
		)
		.then()
		.catch((err) => console.error(err));
};

export const AddComment = async (dispatch, id, name, handle, avatar, text) => {
	await axios
		.put(
			`${api}/comment/${id}`,
			{
				name: name,
				handle: handle,
				avatar: avatar,
				text: text,
			},
			{ headers: { 'auth-token': localStorage.getItem('auth-token') } }
		)
		.then((res) => dispatch(editPost(res.data)))
		.catch((err) => console.error(err));
};
