import React from 'react';
import moment from 'moment';
import './css/message.css';
import { useSelector } from 'react-redux';

export default function Message({ message }) {
	const user = useSelector((state) => state.userSlice.user);

	return (
		<div
			className={`chat_message ${
				message.sender === user.handle && 'chat_receiver'
			}`}
		>
			<span className="chat_name">{message.sender}</span>
			{message.text}
			<span className="chat_timestamp">
				{moment(message.timestamp).fromNow()}
			</span>
		</div>
	);
}
