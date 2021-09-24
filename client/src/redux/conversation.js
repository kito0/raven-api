import {
	setConversations,
	setSearch,
	newConversation,
	emptySearch,
	setCurrent,
	setOpen,
} from './conversationSlice';
import axios from 'axios';
import env from 'react-dotenv';

const api =
	env.REACT_APP_ENV === 'development'
		? 'http://localhost:5000/api'
		: 'https://raven-x.herokuapp.com/api';

export const FetchConversations = async (dispatch, userId) => {
	await axios
		.get(`${api}/conversations/${userId}`)
		.then((res) => {
			dispatch(setConversations(res.data));
		})
		.catch((err) => console.error(err));
};

export const SetSearch = async (dispatch, search) => {
	await axios
		.get(`${api}/user/search/${search}`)
		.then((res) => dispatch(setSearch(res.data)));
	//.catch((err) => console.error(err));
};

export const NewConversation = async (dispatch, userId, friendId) => {
	await axios
		.post(`${api}/conversations/create/${userId}/${friendId}`, {
			title: 'New Conversation',
		})
		.then((res) => dispatch(newConversation(res.data)))
		.catch((err) => console.error(err));
};

export const EmptySearch = async (dispatch) => {
	dispatch(emptySearch());
};

export const SetCurrent = async (dispatch, current) => {
	dispatch(setCurrent(current));
};

export const SetOpen = async (dispatch, open) => {
	dispatch(setOpen(open));
};
