import React, { useState, useEffect, useRef } from 'react';
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
import axios from 'axios';
import moment from 'moment';

export default function Chat({ conversation }) {
	const user = useSelector((state) => state.userSlice.user);
	const [text, setText] = useState('');
	const [user2, setUser2] = useState({});
	const bottomRef = useRef(null);

	//const api = 'http://localhost:5000/api';
	const api = 'https://raven-x.herokuapp.com/api';

	useEffect(() => {
		conversation &&
			axios
				.get(
					`${api}/user/handle/${
						conversation.handle1 === user.handle
							? conversation.handle2
							: conversation.handle1
					}`
				)
				.then((res) => {
					setUser2(res.data);
				});
	}, [conversation, user.handle]);

	const onSubmit = async (e) => {
		e.preventDefault();

		conversation &&
			text !== '' &&
			(await axios.post(
				`${api}/conversations/${conversation.handle1}/${conversation.handle2}`,
				{
					sender: user.handle,
					text: text,
				}
			));

		scrollToBottom();
		setText('');
	};

	const scrollToBottom = () => {
		bottomRef.current.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	};

	useEffect(scrollToBottom, []);

	return (
		<div className="chat">
			<div className="chat_header">
				<Avatar src={user2.avatar} />
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
					<p>No messages available.</p>
				)}
				<div
					ref={bottomRef}
					style={{ float: 'left', clear: 'both', height: '20px' }}
				/>
			</div>
			<div className="chat_footer">
				<InsertEmoticon />
				<form onSubmit={onSubmit}>
					<input
						placeholder="Type a message"
						type="text"
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>
					<button type="submit">Send</button>
				</form>
				<MicOutlined />
			</div>
		</div>
	);
}
