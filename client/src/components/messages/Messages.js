import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FetchConversations } from '../../redux/conversation';
import MessageSidebar from './MessageSidebar';
import MessageView from './MessageView';

export default function Messages() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userSlice.user);
	const open = useSelector((state) => state.conversationSlice.open);

	useEffect(() => {
		FetchConversations(dispatch, user._id);
	}, [dispatch, user._id]);

	return (
		<div className={`messages ${open ? 'open' : 'closed'}`}>
			<MessageSidebar />
			<MessageView />
		</div>
	);
}
