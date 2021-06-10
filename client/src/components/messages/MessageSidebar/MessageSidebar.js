import React from 'react';
import './css/message.sidebar.css';
import MessageSidebarChat from './MessageSidebarChat';
import { IconButton } from '@material-ui/core';
import { DonutLarge, Chat, MoreVert, SearchOutlined } from '@material-ui/icons';
import moment from 'moment';

export default function MessageSidebar({ messages, current, setCurrent }) {
	return (
		<div className="message_sidebar">
			<div className="message_sidebar_header">
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
			<div className="message_sidebar_search">
				<SearchOutlined />
				<input placeholder="Search or start new chat" type="text" />
			</div>
			<div className="message_sidebar_chats">
				{messages &&
					messages
						.slice()
						.sort(
							(a, b) =>
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
