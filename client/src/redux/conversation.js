import { setConversations, setCurrent, setOpen } from './conversationSlice';
import axios from 'axios';
import env from 'react-dotenv';

const api =
	env.REACT_APP_ENV === 'development'
		? 'http://localhost:5000/api/conversations'
		: 'https://raven-x.herokuapp.com/api/conversations';

export const FetchConversations = (dispatch, userId) => {
	axios
		.get(`${api}/${userId}`)
		.then((res) => {
			dispatch(setConversations(res.data));
		})
		.catch((err) => console.error(err));
};

export const SetCurrent = async (dispatch, current) => {
	dispatch(setCurrent(current));
};

export const SetOpen = async (dispatch, open) => {
	dispatch(setOpen(open));
};
