import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import env from "react-dotenv";
import { Avatar, IconButton } from '@material-ui/core';
import {
	InsertEmoticon,
	MoreVert,
	SearchOutlined,
	MicOutlined,
	ChevronLeft
} from '@material-ui/icons';
import Message from './Message';

const api = env.REACT_APP_ENV === 'development' ? 'http://localhost:5000/api' : 'https://raven-x.herokuapp.com/api';

export default function Chat({ conversation }) {
	const user = useSelector((state) => state.userSlice.user);
	const [text, setText] = useState('');
	const [user2, setUser2] = useState({});
	const bottomRef = useRef(null);

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
			<div className="chat-header">
				{window.screen.width <= 768 && <IconButton className='chat-header__back-btn'>
					<ChevronLeft />
				</IconButton>}
				<Avatar src={user2.avatar} />
				<div className="chat-header__info">
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

				<div className="chat-header__r">
					<IconButton>
						<SearchOutlined />
					</IconButton>
					<IconButton>
						<MoreVert />
					</IconButton>
				</div>
			</div>
			<div className="chat-body">
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
			<div className="chat-footer">
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
