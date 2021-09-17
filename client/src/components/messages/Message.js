import React from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';

export default function Message({ message, details }) {
	const user = useSelector((state) => state.userSlice.user);

	return (
		<div
			className={`message ${
				message.senderId === user._id && 'message__receiver'
			}`}
		>
			<span className="message__name">{details.name}</span>
			{message.text}
			<span className="message__timestamp">
				{moment(message.createdAt).fromNow()}
			</span>
		</div>
	);
}
