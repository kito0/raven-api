import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Pusher from 'pusher-js';
import env from "react-dotenv";
import MessageSidebar from './MessageSidebar';
import MessageView from './MessageView';

export default function Messages() {
	const user = useSelector((state) => state.userSlice.user);
	const [messages, setMessages] = useState([]);
	const [current, setCurrent] = useState(0);

	const api = env.REACT_APP_ENV === 'development' ? 'http://localhost:5000' : 'https://raven-x.herokuapp.com';

	//Pusher.logToConsole = true;

	useEffect(
		() => {
			axios.get(`${api}/api/conversations/${user.handle}`).then((res) => {
				setMessages(res.data);
			});
		},
		// eslint-disable-next-line
		[]
		//[user.handle, messages]
	);

	// const pusher = new Pusher('9a411b2a0ee16e4825af', { cluster: 'us3' });
	// const channel = pusher.subscribe('rvn-messenger');
	// console.log(channel);
	// channel.bind('my-event', (newMessage) => {
	// 	console.log(`NEW MESSAGE: ${newMessage}`);
	// 	setMessages([...messages, newMessage]);
	// });

	useEffect(() => {
		const pusher = new Pusher('9a411b2a0ee16e4825af', {
			cluster: 'us3',
		});

		const channel = pusher.subscribe('messages');
		channel.bind('my-event', (newMessage) => {
			alert(JSON.stringify(newMessage));
			setMessages([...messages, newMessage]);
		});

		return () => {
			channel.unbind_all();
			channel.unsubscribe();
		};
	}, [messages]);

	return (
		<div className="messages">
			<MessageSidebar
				messages={messages}
				current={current}
				setCurrent={setCurrent}
			/>
			<MessageView conversation={messages[current]} />
		</div>
	);
}
