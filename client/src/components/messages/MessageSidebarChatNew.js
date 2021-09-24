import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NewConversation } from '../../redux/conversation';
import { Avatar } from '@material-ui/core';

export default function MessageSidebarChatNew({ details, setSearch }) {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userSlice.user);

	const createNewConversation = async () => {
		if (user._id && details._id)
			NewConversation(dispatch, user._id, details._id);
		setSearch('');
	};

	return (
		<div
			className={`message-sidebar-chat`}
			onClick={() => createNewConversation()}
			key={details?._id}
		>
			<Avatar className="avatar" src={details?.avatar} />
			<div className="message-sidebar-chat__info">
				<h2>{details?.name}</h2>
			</div>
		</div>
	);
}
