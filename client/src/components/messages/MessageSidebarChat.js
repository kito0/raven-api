import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import env from "react-dotenv";
import { Avatar } from '@material-ui/core';

const api = env.REACT_APP_ENV === 'development' ? 'http://localhost:5000/api' : 'https://raven-x.herokuapp.com/api';

export default function MessageSidebarChat({
	messages,
	conversation,
	current,
	setCurrent,
}) {
	const user = useSelector((state) => state.userSlice.user);
	const [user2, setUser2] = useState({});

	useEffect(() => {
		axios
			.get(
				`${api}/user/handle/${
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
			className={`message-sidebar-chat ${
				messages.findIndex((x) => x._id === conversation._id) === current &&
				'active'
			}`}
			onClick={() =>
				setCurrent(messages.findIndex((x) => x._id === conversation._id))
			}
		>
			<Avatar className="avatar" src={user2.avatar} />
			<div className="message-sidebar-chat__info">
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
