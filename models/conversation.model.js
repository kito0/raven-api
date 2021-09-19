const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema(
	{
		title: {
			type: String,
		},
		members: {
			type: Array,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Conversation', ConversationSchema);
