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
});

postSchema.virtual('imagePath').get(function () {
	if (this.image != null && this.imageType != null) {
		return `data:${this.imageType};charset=utf-8;base64,${this.image.toString(
			'base64'
		)}`;
	}
});

module.exports = mongoose.model('Post', postSchema);
