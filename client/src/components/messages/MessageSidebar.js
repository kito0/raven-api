import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import env from 'react-dotenv';
import axios from 'axios';
import moment from 'moment';
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
	const [newConversations, setNewConversations] = useState([]);
	const [search, setSearch] = useState('');

	const createNewConversation = async (e) => {
		e.preventDefault();
		await axios.post(`${api}/conversations/create/${user?._id}/${search}`);
	};

	const fetchLastSeen = async (conversationId) => {
		await axios.get(`${api}/messages/last/${conversationId}`).then((res) => {
			return moment(res.data.createdAt).milliseconds();
		});
	};

	const filterConversations = async () => {
		var filtered = await conversations?.reduce(async (acc, conversation) => {
			const friendId = conversation?.members.find(
				(member) => member !== user._id
			);
			const res = await axios.get(`${api}/user/${friendId}`);
			const result = res.data.name.toLowerCase().includes(search.toLowerCase());

			if (!result) return acc;
			return (await acc).concat(conversation);
		}, []);

		filtered = filtered
			.slice(0)
			.sort((x, y) => fetchLastSeen(x._id) - fetchLastSeen(y._id));

		setFilteredConversations(
			search !== '' && search !== null && search !== undefined
				? filtered
				: conversations
		);
	};

	useEffect(() => {
		filterConversations();
		// eslint-disable-next-line
	}, [search, conversations]);

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
				{filteredConversations &&
					filteredConversations.map((conversation) => (
						<MessageSidebarChat
							conversation={conversation}
							key={conversation._id}
						/>
					))}
			</div>
		</div>
	);
}
