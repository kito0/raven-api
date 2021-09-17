import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SetOpen } from '../../redux/conversation';
import axios from 'axios';
import moment from 'moment';
import env from 'react-dotenv';
import { Avatar, IconButton } from '@material-ui/core';
import {
	InsertEmoticon,
	MoreVert,
	SearchOutlined,
	MicOutlined,
	ChevronLeft,
} from '@material-ui/icons';
import Message from './Message';

const api =
	env.REACT_APP_ENV === 'development'
		? 'http://localhost:5000/api'
		: 'https://raven-x.herokuapp.com/api';

export default function Chat({ conversation }) {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userSlice.user);
	const [messages, setMessages] = useState([]);
	const [details, setDetails] = useState({});
	const [text, setText] = useState('');
	const [name, setName] = useState('');
	const [avatar, setAvatar] = useState('');
	const [lastSeen, setLastSeen] = useState('');
	const bottomRef = useRef(null);

	const onSubmit = async (e) => {
		e.preventDefault();

		conversation &&
			text !== '' &&
			(await axios.post(`${api}/messages`, {
				conversationId: conversation._id,
				senderId: user._id,
				text: text,
			}));

		scrollToBottom();
		setText('');
	};

	const scrollToBottom = () => {
		bottomRef.current.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	};

	// eslint-disable-next-line
	useEffect(async () => {
		if (!conversation) return;
		const userId = conversation.members.find((member) => member !== user._id);

		axios.get(`${api}/messages/${conversation._id}`).then((res) => {
			setMessages(res.data);
		});
		axios.get(`${api}/user/${userId}`).then((res) => {
			setName(res.data.name);
			setAvatar(res.data.avatar);
		});
		axios.get(`${api}/messages/last/${conversation._id}`).then((res) => {
			setLastSeen(moment(res.data.createdAt).fromNow());
		});
		setDetails({
			name: name,
			avatar: avatar,
		});

		// eslint-disable-next-line
	}, []);
	useEffect(scrollToBottom, []);

	return (
		<div className="chat">
			<div className="chat-header">
				{window.screen.width <= 768 && (
					<IconButton
						className="chat-header__back-btn"
						onClick={() => SetOpen(dispatch, false)}
					>
						<ChevronLeft />
					</IconButton>
				)}
				<Avatar src={avatar} />
				<div className="chat-header__info">
					<h3>{messages ? name : 'new chat'}</h3>
					<p>last seen {lastSeen}</p>
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
				{messages ? (
					messages
						.slice()
						.map((message) => (
							<Message message={message} details={details} key={message._id} />
						))
				) : (
					<p>No messages available.</p>
				)}
				<div
					ref={bottomRef}
					style={{ float: 'left', clear: 'both', height: '10vh' }}
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
