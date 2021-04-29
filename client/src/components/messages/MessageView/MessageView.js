import React from 'react';
import './css/message.view.css';
import { Avatar, IconButton } from '@material-ui/core';
import {
	AttachFile,
	InsertEmoticon,
	MoreVert,
	SearchOutlined,
	MicOutlined,
} from '@material-ui/icons';
import moment from 'moment';

export default function Chat() {
	return (
		<div className="chat">
			<div className="chat_header">
				<Avatar />
				<div className="chat_header_info">
					<h3>room name</h3>
					<p>last seen at...</p>
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
				<div className="chat_message">
					<span className="chat_name">person</span>henlo
					<span className="chat_timestamp">
						{moment(new Date().toUTCString()).fromNow()}
					</span>
				</div>
				<p className="chat_message chat_receiver">
					<span className="chat_name">person</span>
					henlo
					<span className="chat_timestamp">
						{moment(new Date().toUTCString()).fromNow()}
					</span>
				</p>
				<p className="chat_message">
					<span className="chat_name">person</span>
					henlo
					<span className="chat_timestamp">
						{moment(new Date().toUTCString()).fromNow()}
					</span>
				</p>
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
