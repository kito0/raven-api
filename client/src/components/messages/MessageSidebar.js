import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MessageSidebarChat from './MessageSidebarChat';
import { IconButton } from '@material-ui/core';
import { DonutLarge, Chat, MoreVert, SearchOutlined } from '@material-ui/icons';
import moment from 'moment';
import axios from 'axios';

export default function MessageSidebar({ messages, current, setCurrent }) {
	const user = useSelector((state) => state.userSlice.user);
	const [search, setSearch] = useState('');
	const [filteredMessages, setFilteredMessages] = useState([]);

	//const api = 'http://localhost:5000/api';
	const api = 'https://raven-x.herokuapp.com/api';

	useEffect(() => {
		setFilteredMessages(
			search !== ''
				? messages.filter((message) => {
						return message.handle1 === user.handle
							? message.handle2.toLowerCase().includes(search.toLowerCase())
							: message.handle1.toLowerCase().includes(search.toLowerCase());
				  })
				: messages
		);
	}, [search, user.handle, messages]);

	const handleSearch = (e) => {
		e.preventDefault();

		axios.post(`${api}/conversations/create/${user.handle}/${search}`);
	};

	return (
		<div className="message-sidebar">
			<div className="message-sidebar__header">
				<IconButton>
					<DonutLarge />
				</IconButton>
				<IconButton>
					<Chat />
				</IconButton>
				<IconButton>
					<MoreVert />
				</IconButton>
			</div>
			<div className="message-sidebar__search">
				<SearchOutlined />
				<form onSubmit={handleSearch}>
					<input
						placeholder="Search or start new chat"
						type="text"
						onChange={(e) => setSearch(e.target.value)}
					/>
				</form>
			</div>
			<div className="message-sidebar__chats">
				{messages &&
					filteredMessages
						.slice()
						.sort(
							(a, b) =>
								b.messages.slice(-1)[0].timestamp &&
								a.messages.slice(-1)[0].timestamp &&
								moment(b.messages.slice(-1)[0].timestamp).get('millisecond') -
									moment(a.messages.slice(-1)[0].timestamp).get('millisecond')
						)
						.map((conversation) => (
							<MessageSidebarChat
								messages={messages}
								conversation={conversation}
								current={current}
								setCurrent={setCurrent}
								key={conversation._id}
							/>
						))}
			</div>
		</div>
	);
}
