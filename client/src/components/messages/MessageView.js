import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SetOpen } from '../../redux/conversation';
import { io } from 'socket.io-client';
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
const socket_api =
	env.REACT_APP_ENV === 'development'
		? 'ws://localhost:8900'
		: 'https://raven-socket.herokuapp.com';

export default function Chat({ conversation }) {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userSlice.user);
	const current = useSelector((state) => state.conversationSlice.current);
	const bottomRef = useRef(null);
	const socket = useRef();
	const [messages, setMessages] = useState([]);
	const [friendDetails, setFriendDetails] = useState({});
	const [text, setText] = useState('');
	const [lastSeen, setLastSeen] = useState('');
	const [arrivalMessage, setArrivalMessage] = useState(null);

	const scrollToBottom = () => {
		bottomRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		if (!conversation || text === '') return;

		socket.current?.emit('sendMessage', {
			senderId: user._id,
			receiverId: conversation?.members.find((member) => member !== user?._id),
			text: text,
		});

		try {
			const res = await axios.post(`${api}/messages`, {
				conversationId: conversation._id,
				senderId: user?._id,
				text: text,
			});
			setMessages([...messages, res.data]);
		} catch (err) {
			console.log(err);
		}

		scrollToBottom();
		setText('');
	};

	useEffect(() => {
		if (!conversation) return;

		const friendId = conversation?.members.find(
			(member) => member !== user?._id
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
		const fetchLastSeen = async () => {
			await axios
				.get(`${api}/messages/last/${conversation?._id}`)
				.then((res) => {
					setLastSeen(moment(res.data.createdAt).fromNow());
				});
		};

		fetchMessages();
		fetchFriendDetails();
		fetchLastSeen();
	}, [current, conversation, user]);

	useEffect(() => {
		socket.current = io(socket_api);
		socket.current?.on('getMessage', (data) => {
			setArrivalMessage({
				sender: data.senderId,
				text: data.text,
				createdAt: Date.now(),
			});
		});
	}, []);

	useEffect(() => {
		socket.current.emit('addUser', user?._id);
		socket.current.on('getUsers', (users) => {
			console.log(users);
		});
	}, [user]);

	useEffect(() => {
		arrivalMessage &&
			conversation?.members.includes(arrivalMessage.sender) &&
			setMessages((prev) => [...prev, arrivalMessage]);
	}, [arrivalMessage, conversation]);

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

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
