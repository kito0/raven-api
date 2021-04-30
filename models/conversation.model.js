const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	handle1: {
		type: String,
		required: true,
	},
	handle2: {
		type: String,
		required: true,
	},
	messages: [
		{
			sender: {
				type: String,
				required: true,
			},
			text: {
				type: String,
				required: true,
			},
			timestamp: {
				type: Date,
				default: Date.now,
				required: true,
			},
		},
	],
});

module.exports = mongoose.model('Conversation', conversationSchema);
