const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../util/validation');

exports.register = async (req, res) => {
	const { error } = registerValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	if (await User.findOne({ email: req.body.email }))
		return res.status(400).send('Email already exists');
	if (await User.findOne({ handle: req.body.handle }))
		return res.status(400).send('Handle already exists');

	const salt = await bcrypt.genSalt(10);
	const hashedPass = await bcrypt.hash(req.body.password, salt);

	const user = new User({
		name: req.body.name,
		handle: req.body.handle,
		email: req.body.email,
		avatar: req.body.avatar,
		password: hashedPass,
	});

	try {
		await user.save();
		const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
		return res.status(201).json({ user, token });
	} catch (err) {
		return res.status(400).json({ error: err.message });
	}
};

exports.login = async (req, res) => {
	const { error } = loginValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send('Email not found');

	const validPass = await bcrypt.compare(req.body.password, user.password);
	if (!validPass) return res.status(400).send('Invalid password');

	const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
	return res.status(200).json({ user, token });
};

// GET http://localhost:5000/api/user/:id
exports.getUser = async (req, res) => {
	User.findById(req.params.id)
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((err) => res.status(404).send(err.code));
};

// GET http://localhost:5000/api/user/:handle
exports.getUserByHandle = async (req, res) => {
	User.findOne({ handle: req.params.handle })
		.then((user) => {
			res.status(200).send(user);
		})
		.catch((err) => res.status(404).send(err.code));
};

// PUT http://localhost:5000/api/user/:handle
exports.updateUser = async (req, res) => {
	const { error } = registerValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	User.findByIdAndUpdate(req.params.id, req.body)
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((err) => res.status(400).send(err));
};
