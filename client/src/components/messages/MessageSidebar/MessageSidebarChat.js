import React from 'react';
import './css/message.sidebar.chat.css';
import { Avatar } from '@material-ui/core';

export default function MessageSidebarChat() {
	return (
		<div className="message__sidebar__chat">
			<Avatar className="avatar" />
			<div className="message__sidebar__chat__info">
				<h2>roomname</h2>
				<p>last msg</p>
			</div>
		</div>
	);
}
