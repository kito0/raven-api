const Post = require('../models/post.model');
const { updateValidation } = require('../util/validation');

// GET http://localhost:5000/api/posts
exports.getPosts = async (req, res) => {
	Post.find()
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((err) => res.status(500).send(err));
};

// GET http://localhost:5000/api/posts/:handle
exports.getPostsByUser = async (req, res) => {
	Post.find({ handle: req.params.handle })
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((err) => res.status(500).send(err));
};

// POST http://localhost:5000/api/posts
exports.createPost = async (req, res) => {
	Post.create(req.body)
		.then((post) => {
			res.status(201).json(post);
		})
		.catch((err) => res.status(500).send(err));
};

// PUT http://localhost:5000/api/posts/:id
exports.editPost = async (req, res) => {
	Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then((post) => {
			res.status(200).json(post);
		})
		.catch((err) => res.status(404).send(err));
};

// DELETE http://localhost:5000/api/posts/:id
exports.deletePost = async (req, res) => {
	Post.findByIdAndDelete(req.params.id)
		.then((post) => {
			post
				? res.status(200).json(post)
				: res.status(404).send('post does not exist');
		})
		.catch((err) => res.status(404).send(err));
};

// PUT http://localhost:5000/api/posts/update/:handle
exports.updatePosts = async (req, res) => {
	const { error } = updateValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	Post.updateMany(
		{ handle: req.params.handle },
		{ $set: { name: req.body.name, avatar: req.body.avatar } }
	)
		.then(() => {
			res.status(200).json({ name: req.body.name, avatar: req.body.avatar });
		})
		.catch((err) => res.status(400).send(err));
};

// PUT http://localhost:5000/api/posts/comment/:id
exports.createComment = async (req, res) => {
	Post.findByIdAndUpdate(
		req.params.id,
		{ $push: { comments: req.body } },
		{ new: true }
	)
		.then((post) => {
			res.status(201).json(post);
		})
		.catch((err) => res.status(400).send(err));
};
