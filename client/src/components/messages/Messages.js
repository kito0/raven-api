import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import MessageSidebar from './MessageSidebar';
import MessageView from './MessageView';
//import Pusher from 'pusher-js';

export default function Messages() {
	const user = useSelector((state) => state.userSlice.user);
	const [messages, setMessages] = useState([]);
	const [current, setCurrent] = useState(0);

	//const api = 'http://localhost:5000';
	const api = 'https://raven-x.herokuapp.com';

	useEffect(() => {
		axios.get(`${api}/api/conversations/${user.handle}`).then((res) => {
			setMessages(res.data);
		});
	}, [user.handle, messages]);

	// useEffect(() => {
	// 	const pusher = new Pusher('9a411b2a0ee16e4825af', {
	// 		cluster: 'us3',
	// 	});

	// 	const channel = pusher.subscribe('messages');
	// 	channel.bind('inserted', (newMessage) => {
	// 		alert(JSON.stringify(newMessage));
	// 		setMessages([...messages, newMessage]);
	// 	});

	// 	return () => {
	// 		channel.unbind_all();
	// 		channel.unsubscribe();
	// 	};
	// }, [messages]);

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
