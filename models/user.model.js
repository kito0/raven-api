const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: String,
	handle: String,
	email: String,
	avatar: {
		type: String,
		default:
			'https://oes.semel.ucla.edu/wp-content/themes/collective/images/default-profile.jpg',
	},
	password: String,
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
