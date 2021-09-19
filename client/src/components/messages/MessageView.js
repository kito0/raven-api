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
	const current = useSelector((state) => state.conversationSlice.current);
	const [messages, setMessages] = useState([]);
	const [friendDetails, setFriendDetails] = useState({});
	const [text, setText] = useState('');
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
		bottomRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	};

	// eslint-disable-next-line
	useEffect(() => {
		if (!conversation) return;

		const friendId = conversation?.members.find(
			(member) => member !== user._id
		);

		const fetchMessages = async () => {
			await axios.get(`${api}/messages/${conversation?._id}`).then((res) => {
				setMessages(res.data);
			});
		};
		const fetchFriendDetails = async () => {
			await axios.get(`${api}/user/${friendId}`).then((res) => {
				setFriendDetails({
					name: res.data.name,
					avatar: res.data.avatar,
				});
			});
		};
		const fecthLastSeen = async () => {
			await axios
				.get(`${api}/messages/last/${conversation?._id}`)
				.then((res) => {
					setLastSeen(moment(res.data.createdAt).fromNow());
				});
		};

		fetchMessages();
		fetchFriendDetails();
		fecthLastSeen();
		scrollToBottom();
		// eslint-disable-next-line
	}, [current, conversation]);

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
				<Avatar src={friendDetails?.avatar} />
				<div className="chat-header__info">
					<h3>{messages ? friendDetails?.name : 'new chat'}</h3>
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
					messages.map((message) => (
						<Message
							message={message}
							details={friendDetails}
							key={message?._id}
						/>
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
