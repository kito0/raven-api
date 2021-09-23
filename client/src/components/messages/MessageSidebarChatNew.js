import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SetCurrent, SetOpen } from '../../redux/conversation';
import axios from 'axios';
import env from 'react-dotenv';
import { Avatar } from '@material-ui/core';

const api =
	env.REACT_APP_ENV === 'development'
		? 'http://localhost:5000/api'
		: 'https://raven-x.herokuapp.com/api';

export default function MessageSidebarChatNew({ details }) {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userSlice.user);
	const conversations = useSelector(
		(state) => state.conversationSlice.conversations
	);

	const createNewConversation = async () => {
		console.log(user, details);
		await axios.post(
			`${api}/conversations/create/${user?._id}/${details?._id}`,
			{
				title: `${user.name}, ${details.name}`,
			}
		);
	};

	return (
		<div
			className={`message-sidebar-chat`}
			onClick={() => {
				createNewConversation();
				SetCurrent(
					dispatch,
					conversations?.findIndex((x) => x._id === details?._id)
				);
				SetOpen(dispatch, true);
			}}
			key={details?._id}
		>
			<Avatar className="avatar" src={details?.avatar} />
			<div className="message-sidebar-chat__info">
				<h2>{details?.name}</h2>
			</div>
		</div>
	);
}
