import React from 'react';
import './css/messages.css';
import MessageSidebar from './MessageSidebar/MessageSidebar';
import MessageView from './MessageView/MessageView';
//import Pusher from 'pusher-js';

export default function Messages() {
	// const [messages, setMessages] = useState([]);

	// useEffect(() => {
	// 	axios.get('/messages/sync').then((res) => {
	// 		setMessages(res.data);
	// 	});
	// }, []);

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
			<MessageSidebar />
			<MessageView />
		</div>
	);
}
