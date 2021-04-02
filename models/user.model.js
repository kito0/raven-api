const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: String,
	handle: String,
	email: String,
	avatar: String,
	password: String,
});

module.exports = mongoose.model('User', userSchema);
