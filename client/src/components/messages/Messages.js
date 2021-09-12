import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Pusher from 'pusher-js';
import env from "react-dotenv";
import MessageSidebar from './MessageSidebar';
import MessageView from './MessageView';

const api = env.REACT_APP_ENV === 'development' ? 'http://localhost:5000/api' : 'https://raven-x.herokuapp.com/api';

export default function Messages() {
	const user = useSelector((state) => state.userSlice.user);
	const [messages, setMessages] = useState([]);
	const [current, setCurrent] = useState(0);
	const [open, setOpen] = useState(true);

	//Pusher.logToConsole = true;

	useEffect(() => {
		axios.get(`${api}/conversations/${user.handle}`).then((res) => {
			setMessages(res.data);
		});

		const pusher = new Pusher('9a411b2a0ee16e4825af', { cluster: 'us3' });
		const channel = pusher.subscribe('rvn-messenger');
		channel.bind('updated', (newMessage) => {
			console.log(`NEW MESSAGE: ${newMessage}`);
			setMessages([...messages, newMessage]);
		});
	// eslint-disable-next-line
	}, []);

	return (
		<div className={`messages ${open ? 'open' : 'closed'}`}>
			<MessageSidebar
				messages={messages}
				current={current}
				setCurrent={setCurrent}
				setOpen={setOpen}
			/>
			<MessageView conversation={messages[current]} setOpen={setOpen} />
		</div>
	);
}
