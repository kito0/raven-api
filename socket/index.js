const io = require('socket.io')(8900, {
	cors: {
		origin: 'http://localhost:3000',
	},
});

let users = [];

const addUser = (userId, socketId) => {
	!users.some((user) => user.userId === userId) &&
		users.push({ userId, socketId });
};

const removeUser = (socketId) => {
	users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
	return users.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
	console.log('user connected');

	socket.on('addUser', (userId) => {
		if (userId) addUser(userId, socket.id);
		io.emit('getUsers', users);
	});

	socket.on('disconnect', () => {
		console.log('user disconnected');
		removeUser(socket.id);
		io.emit('getUsers', users);
	});

	socket.on('sendMessage', ({ senderId, receiverId, text }) => {
		const receiver = getUser(receiverId);
		if (receiver && senderId) {
			io.to(receiver.socketId).emit('getMessage', {
				senderId,
				text,
			});
		}
	});
});
