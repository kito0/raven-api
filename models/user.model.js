const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	handle: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	avatar: {
		type: String,
		default:
			'https://oes.semel.ucla.edu/wp-content/themes/collective/images/default-profile.jpg',
	},
	password: {
		type: String,
		required: true,
	},
	followers: [
		{
			handle: {
				type: String,
			},
		},
	],
	following: [
		{
			handle: {
				type: String,
			},
		},
	],
});

module.exports = mongoose.model('User', userSchema);
