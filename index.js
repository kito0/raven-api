const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();

const userRoute = require('./routes/user.route');
const postRoute = require('./routes/post.route');
const conversationRoute = require('./routes/conversation.route');

const app = express();
const PORT = process.env.PORT || 5000;

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

app.use(express.json());
app.use(cors());

app.use('/api/user', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/conversations', conversationRoute);
