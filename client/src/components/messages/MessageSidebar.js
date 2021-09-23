import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import env from 'react-dotenv';
import axios from 'axios';
import moment from 'moment';
import { SearchOutlined } from '@material-ui/icons';
import MessageSidebarChat from './MessageSidebarChat';
import MessageSidebarChatNew from './MessageSidebarChatNew';

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

	const fetchLastSeen = async (conversationId) => {
		await axios.get(`${api}/messages/last/${conversationId}`).then((res) => {
			return moment(res.data.createdAt).milliseconds();
		});
	};

	const filterConversations = async () => {
		var searchOkay = search !== '' && search !== null && search !== undefined;

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

		if (filtered.length === 0 && searchOkay) {
			const res = await axios.get(`${api}/user/search/${search}`);
			setNewConversations(res.data);
			console.log(newConversations);
		}

		setFilteredConversations(searchOkay ? filtered : conversations);
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
				<input
					placeholder="Search or start new chat"
					type="text"
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>
			<div className="message-sidebar__chats">
				{filteredConversations.length > 0
					? filteredConversations.map((conversation) => (
							<MessageSidebarChat
								conversation={conversation}
								key={conversation._id}
							/>
					  ))
					: newConversations.map((details) => (
							<MessageSidebarChatNew details={details} key={details._id} />
					  ))}
			</div>
		</div>
	);
}
