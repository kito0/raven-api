import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './css/message.sidebar.chat.css';
import { Avatar } from '@material-ui/core';
import axios from 'axios';

export default function MessageSidebarChat({
	messages,
	conversation,
	current,
	setCurrent,
}) {
	const user = useSelector((state) => state.userSlice.user);
	const [user2, setUser2] = useState({});
	//const api = "http://localhost:5000";
	const api = 'https://raven-x.herokuapp.com';

	useEffect(() => {
		axios
			.get(
				`${api}/api/user/handle/${
					conversation.handle1 === user.handle
						? conversation.handle2
						: conversation.handle1
				}`
			)
			.then((res) => {
				setUser2(res.data);
			});
		// eslint-disable-next-line
	}, []);

	return (
		<div
			className={`message__sidebar__chat ${
				messages.findIndex((x) => x._id === conversation._id) === current &&
				'active'
			}`}
			onClick={() =>
				setCurrent(messages.findIndex((x) => x._id === conversation._id))
			}
		>
			<Avatar className="avatar" src={user2.avatar} />
			<div className="message__sidebar__chat__info">
				<h2>
					{conversation.handle1 === user.handle
						? conversation.handle2
						: conversation.handle1}
				</h2>
				<p>{conversation.messages.slice(-1)[0].text}</p>
			</div>
		</div>
	);
}
