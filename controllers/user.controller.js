const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const escape = require('escape-html');
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
	if (!user) return res.status(404).send('Email not found');

	const validPass = await bcrypt.compare(req.body.password, user.password);
	if (!validPass) return res.status(400).send('Invalid password');

	const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
	return res.status(200).json({ user, token });
};

// GET http://localhost:5000/api/user/:id
exports.getUser = async (req, res) => {
	User.findById(req.params.id)
		.then((user) => {
			if (!user) throw 'Error: User ID does not exist';
			res.status(200).json(user);
		})
		.catch((err) => res.status(404).send(err));
};

// GET http://localhost:5000/api/user/:handle
exports.getUserByHandle = async (req, res) => {
	User.findOne({ handle: req.params.handle })
		.then((user) => {
			if (!user) throw 'Error: User handle does not exist';
			res.status(200).send(user);
		})
		.catch((err) => res.status(404).send(err));
};

// PUT http://localhost:5000/api/user/:handle
exports.updateUser = async (req, res) => {
	const { error } = registerValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	User.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then((user) => {
			if (!user) throw 'Error: User ID does not exist';
			res.status(200).json(user);
		})
		.catch((err) => res.status(400).send(err));
};

// PUT http://localhost:5000/api/user/follow/:handle
exports.addRemoveFollower = async (req, res) => {
	const user = await User.findOne({ handle: req.params.handle });
	if (user.followers.find(({ handle }) => handle === req.body.handle)) {
		User.findOne({ handle: req.body.handle }).then((user) => {
			if (!user)
				return res
					.status(404)
					.send(`Error: No such user found: ${escape(req.body.handle)}`);
		});
		User.findOneAndUpdate(
			{ handle: req.params.handle },
			{ $pull: { followers: req.body } }
		)
			.then((user) => {
				return res
					.status(200)
					.send(`Removed follower: ${escape(req.body.handle)}`);
			})
			.catch((err) => res.status(400).send(err));
	} else {
		User.findOneAndUpdate(
			{ handle: req.params.handle },
			{ $push: { followers: req.body } },
			{ new: true }
		)
			.then((user) => {
				res.status(200).json(user);
			})
			.catch((err) => res.status(400).send(err));
	}
};

// PUT http://localhost:5000/api/user/following/:handle
exports.toggleFollow = async (req, res) => {
	const user = await User.findOne({ handle: req.params.handle });
	if (user.following.find(({ handle }) => handle === req.body.handle)) {
		User.findOne({ handle: req.body.handle }).then((user) => {
			if (!user)
				return res
					.status(404)
					.send(`Error: No such user found: ${escape(req.body.handle)}`);
		});
		User.findOneAndUpdate(
			{ handle: req.params.handle },
			{ $pull: { following: req.body } }
		)
			.then((user) => {
				res.status(200).send(`Unfollowed: ${escape(req.body.handle)}`);
			})
			.catch((err) => res.status(400).send(err));
	} else {
		User.findOneAndUpdate(
			{ handle: req.params.handle },
			{ $push: { following: req.body } },
			{ new: true }
		)
			.then((user) => {
				res.status(201).json(user);
			})
			.catch((err) => res.status(400).send(err));
	}
};
