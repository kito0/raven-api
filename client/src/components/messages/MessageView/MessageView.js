import React from 'react';
import { useSelector } from 'react-redux';
import './css/message.view.css';
import Message from '../Message/Message';
import { Avatar, IconButton } from '@material-ui/core';
import {
	AttachFile,
	InsertEmoticon,
	MoreVert,
	SearchOutlined,
	MicOutlined,
} from '@material-ui/icons';
import moment from 'moment';

export default function Chat({ conversation }) {
	const user = useSelector((state) => state.userSlice.user);

	return (
		<div className="chat">
			<div className="chat_header">
				<Avatar />
				<div className="chat_header_info">
					<h3>
						{conversation
							? conversation.handle1 === user.handle
								? conversation.handle2
								: conversation.handle1
							: 'new chat'}
					</h3>
					<p>
						last seen{' '}
						{conversation &&
							moment(conversation.messages.slice(-1)[0].timestamp).fromNow()}
					</p>
				</div>

				<div className="chat_header_r">
					<IconButton>
						<SearchOutlined />
					</IconButton>
					<IconButton>
						<AttachFile />
					</IconButton>
					<IconButton>
						<MoreVert />
					</IconButton>
				</div>
			</div>
			<div className="chat_body">
				{conversation ? (
					conversation.messages
						.slice()
						.map((message) => <Message message={message} key={message._id} />)
				) : (
					<p>no messages available</p>
				)}
			</div>
			<div className="chat_footer">
				<InsertEmoticon />
				<form>
					<input placeholder="Type a message" type="text" />
					<button type="submit">Send</button>
				</form>
				<MicOutlined />
			</div>
		</div>
	);
}
