import React, { useState, useEffect } from 'react';
import env from 'react-dotenv';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { SearchOutlined } from '@material-ui/icons';
import MessageSidebarChat from './MessageSidebarChat';

const api =
	env.REACT_APP_ENV === 'development'
		? 'http://localhost:5000/api'
		: 'https://raven-x.herokuapp.com/api';

export default function MessageSidebar() {
	const user = useSelector((state) => state.userSlice.user);
	const conversations = useSelector(
		(state) => state.conversationSlice.conversations
	);
	const [filteredConversations, setFilteredConversations] = useState([]);
	const [search, setSearch] = useState('');

	const createNewConversation = async (e) => {
		e.preventDefault();
		await axios.post(`${api}/conversations/create/${user._id}/${search}`);
	};

	const filterConversations = () => {
		setFilteredConversations(
			// search !== '' && search !== null && search !== undefined
			// 	? conversations.filter((conversation) => {
			// 			const userId = conversation.members.find(
			// 				(member) => member !== user._id
			// 			);
			// 			const target = axios.get(`${api}/user/${userId}`).data.name;
			// 			console.log(target);
			// 			return target.includes(search.toLowerCase());
			// 	  })
			// 	: conversations
			conversations
		);
	};

	useEffect(() => {
		filterConversations();
		// eslint-disable-next-line
	}, [search]);

	return (
		<div className="message-sidebar">
			<div className="message-sidebar__header">
				<h3>Messages</h3>
			</div>
			<div className="message-sidebar__search">
				<SearchOutlined />
				<form onSubmit={createNewConversation}>
					<input
						placeholder="Search or start new chat"
						type="text"
						onChange={(e) => setSearch(e.target.value)}
					/>
				</form>
			</div>
			<div className="message-sidebar__chats">
				{
					//conversations &&
					filteredConversations
						// .slice(0)
						// .sort(
						// 	(a, b) =>
						// 		moment(fetchLastMessage(b._id).createdAt).milliseconds() -
						// 		moment(fetchLastMessage(a._id).createdAt).milliseconds()
						// )
						.map((conversation) => (
							<MessageSidebarChat
								conversation={conversation}
								key={conversation._id}
							/>
						))
				}
			</div>
		</div>
	);
}
