const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const sanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const Pusher = require('pusher');

const userRoute = require('./routes/user.route');
const postRoute = require('./routes/post.route');
const conversationRoute = require('./routes/conversation.route');

const pusher = new Pusher(process.env.PUSHER_CONFIG);

const app = express();
const PORT = process.env.PORT || 5000;
const limiter = rateLimit({
	windowMs: 1000 * 1000,
	max: 60,
});

mongoose
	.connect(process.env.CONNECTION_URL, {
		useNewUrlParser: true,
		useFindAndModify: false,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then(() =>
		app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
	)
	.catch((error) => console.log(error.message));

const db = mongoose.connection;

db.once('open', () => {
	const msgCollection = db.collection('Conversation');
	console.log(msgCollection);
	const changeStream = msgCollection.watch();
	changeStream.on('change', (change) => {
		console.log('change');
		if (change.operationType === 'update') {
			const messageDetails = change.fullDocument;

			pusher.trigger('rvn-messenger', 'my-event', {
				title: messageDetails.title,
				handle1: messageDetails.handle1,
				handle2: messageDetails.handle2,
				messages: messageDetails.messages,
				_id: messageDetails._id,
			});
		}
	});
});

app.use(express.json());
app.use(cors());
app.use(sanitize());
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(limiter);

app.use('/api/user', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/conversations', conversationRoute);

module.exports = app;
