import React from 'react';
import './css/message.sidebar.css';
import MessageSidebarChat from './MessageSidebarChat';
import { IconButton } from '@material-ui/core';
import { DonutLarge, Chat, MoreVert, SearchOutlined } from '@material-ui/icons';

export default function MessageSidebar() {
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
				<MessageSidebarChat />
				<MessageSidebarChat />
				<MessageSidebarChat />
				<MessageSidebarChat />
				<MessageSidebarChat />
				<MessageSidebarChat />
				<MessageSidebarChat />
				<MessageSidebarChat />
				<MessageSidebarChat />
				<MessageSidebarChat />
				<MessageSidebarChat />
			</div>
		</div>
	);
}
