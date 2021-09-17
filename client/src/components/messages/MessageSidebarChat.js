import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SetCurrent, SetOpen } from '../../redux/conversation';
import axios from 'axios';
import env from 'react-dotenv';
import { Avatar } from '@material-ui/core';

const api =
	env.REACT_APP_ENV === 'development'
		? 'http://localhost:5000/api'
		: 'https://raven-x.herokuapp.com/api';

export default function MessageSidebarChat({ conversation }) {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userSlice.user);
	const conversations = useSelector(
		(state) => state.conversationSlice.conversations
	);
	const current = useSelector((state) => state.conversationSlice.current);
	const open = useSelector((state) => state.conversationSlice.open);
	const [name, setName] = useState('');
	const [avatar, setAvatar] = useState('');
	const [lastMessage, setLastMessage] = useState('');

	useEffect(() => {
		const userId = conversation.members.find((member) => member !== user._id);

		axios.get(`${api}/user/${userId}`).then((res) => {
			setName(res.data.name);
			setAvatar(res.data.avatar);
		});
		axios.get(`${api}/messages/last/${conversation._id}`).then((res) => {
			setLastMessage(res.data.text);
		});
	}, []);

	return (
		<div
			className={`message-sidebar-chat ${
				conversations.findIndex((x) => x._id === conversation._id) ===
					current && 'active'
			}`}
			onClick={() => {
				SetCurrent(
					dispatch,
					conversations.findIndex((x) => x._id === conversation._id)
				);
				SetOpen(dispatch, true);
			}}
			key={conversation._id}
		>
			<Avatar className="avatar" src={avatar} />
			<div className="message-sidebar-chat__info">
				<h2>{name}</h2>
				<p>{lastMessage}</p>
			</div>
		</div>
	);
}
