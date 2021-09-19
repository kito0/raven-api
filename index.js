const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const sanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
// const rateLimit = require('express-rate-limit');
const hpp = require('hpp');

const userRoute = require('./routes/user.route');
const postRoute = require('./routes/post.route');
const conversationRoute = require('./routes/conversation.route');
const messageRoute = require('./routes/message.route');

const app = express();
const PORT = process.env.PORT || 5000;
// const limiter = rateLimit({
// 	windowMs: 1000 * 1000,
// 	max: 60,
// });

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
	.catch((err) => console.log(err.message));

// const db = mongoose.connection;
// const pusher = new Pusher({
// 	app_id: process.env.PUSHER_ID,
// 	key: process.env.PUSHER_KEY,
// 	secret: process.env.PUSHER_SECRET,
// 	cluster: process.env.PUSHER_CLUSTER
// });

// db.once('open', () => {
// 	const msgCollection = db.collection('conversations');
// 	const changeStream = msgCollection.watch();

// 	changeStream.on('change', async (change) => {
// 		if (change.operationType === 'update') {
// 			const k = change.updateDescription;
// 			var v = '';
// 			for (x in k)
// 				v = k[x];

// 			pusher
// 				.trigger('rvn-messenger', 'updated', {
// 					id: k._id,
// 					k: k
// 				})
// 				.catch((err) => console.log(err));
// 		}
// 	});
// });

var corsOptions = {
	origin:
		process.env.NODE_ENV === 'development'
			? 'http://localhost:3000'
			: 'https://ravenx.vercel.app',
	optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(sanitize());
app.use(helmet());
app.use(xss());
app.use(hpp());
// app.use(limiter);

app.use('/api/user', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/conversations', conversationRoute);
app.use('/api/messages', messageRoute);

module.exports = app;
