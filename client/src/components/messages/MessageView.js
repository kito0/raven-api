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

export default function Chat() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userSlice.user);
	const conversations = useSelector(
		(state) => state.conversationSlice.conversations
	);
	const current = useSelector((state) => state.conversationSlice.current);
	const [currentConversation, setCurrentConversation] = useState(
		conversations[current]
	);
	const [messages, setMessages] = useState([]);
	const [friendDetails, setFriendDetails] = useState({});
	const [text, setText] = useState('');
	const [lastSeen, setLastSeen] = useState('');
	const bottomRef = useRef(null);

	const onSubmit = async (e) => {
		e.preventDefault();

		currentConversation &&
			text !== '' &&
			(await axios.post(`${api}/messages`, {
				conversationId: currentConversation._id,
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

	function waitForElement(props) {
		if (typeof props !== 'undefined') {
		} else {
			setTimeout(waitForElement, 100);
		}
	}

	// eslint-disable-next-line
	useEffect(async () => {
		waitForElement(conversations);
		setCurrentConversation(conversations[current]);
		const friendId = conversations[current].members.find(
			(member) => member !== user._id
		);

		axios.get(`${api}/messages/${conversations[current]._id}`).then((res) => {
			setMessages(res.data);
		});
		axios.get(`${api}/user/${friendId}`).then((res) => {
			setFriendDetails({
				name: res.data.name,
				avatar: res.data.avatar,
			});
		});
		axios
			.get(`${api}/messages/last/${conversations[current]._id}`)
			.then((res) => {
				setLastSeen(moment(res.data.createdAt).fromNow());
			});

		scrollToBottom();
		// eslint-disable-next-line
	}, [current]);

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
				<Avatar src={friendDetails.avatar} />
				<div className="chat-header__info">
					<h3>{messages ? friendDetails.name : 'new chat'}</h3>
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
							<Message
								message={message}
								details={friendDetails}
								key={message._id}
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
