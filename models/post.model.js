const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	handle: {
		type: String,
		required: true,
	},
	avatar: {
		type: String,
		required: true,
	},
	text: {
		type: String,
		required: true,
		max: 256,
	},
	image: {
		type: String,
	},
	timestamp: {
		type: Date,
		default: Date.now,
		required: true,
	},
	comments: [
		{
			name: {
				type: String,
				required: true,
			},
			handle: {
				type: String,
				required: true,
			},
			avatar: {
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

module.exports = mongoose.model('Post', postSchema);
