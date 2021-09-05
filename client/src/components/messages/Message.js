import React from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';

export default function Message({ message }) {
	const user = useSelector((state) => state.userSlice.user);

	return (
		<div
			className={`message ${
				message.sender === user.handle && 'message__receiver'
			}`}
		>
			<span className="message__name">{message.sender}</span>
			{message.text}
			<span className="message__timestamp">
				{moment(message.timestamp).fromNow()}
			</span>
		</div>
	);
}
