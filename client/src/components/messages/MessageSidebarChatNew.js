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

export default function MessageSidebarChatNew({ details }) {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userSlice.user);
	const current = useSelector((state) => state.conversationSlice.current);

	return (
		<div
			className={`message-sidebar-chat ${
				conversations?.findIndex((x) => x._id === conversation?._id) === current
					? 'active'
					: ''
			}`}
			onClick={() => {
				SetCurrent(
					dispatch,
					conversations?.findIndex((x) => x._id === conversation?._id)
				);
				SetOpen(dispatch, true);
			}}
			key={conversation?._id}
		>
			<Avatar className="avatar" src={friendDetails?.avatar} />
			<div className="message-sidebar-chat__info">
				<h2>{friendDetails?.name}</h2>
				<p>{lastMessage}</p>
			</div>
		</div>
	);
}
