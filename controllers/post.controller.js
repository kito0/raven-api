const Post = require('../models/post.model');

// GET http://localhost:5000/api/post
exports.getPosts = async (req, res) => {
	Post.find()
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((err) => res.status(500).send(err));
};

// GET http://localhost:5000/api/post/:handle
exports.getPostsByUser = async (req, res) => {
	Post.find({ handle: req.params.handle })
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((err) => res.status(500).send(err));
};

// POST http://localhost:5000/api/post
exports.createPost = async (req, res) => {
	Post.create(req.body)
		.then((post) => {
			res.status(201).json(post);
		})
		.catch((err) => res.status(500).send(err));
};

// PUT http://localhost:5000/api/post/:id
exports.editPost = async (req, res) => {
	Post.findByIdAndUpdate(req.params.id, req.body)
		.then(() => {
			res.status(200).send('post edited');
		})
		.catch((err) => res.status(400).send(err));
};

// DELETE http://localhost:5000/api/post/:id
exports.deletePost = async (req, res) => {
	Post.findByIdAndDelete(req.params.id)
		.then(() => {
			res.status(200).send('post deleted');
		})
		.catch((err) => res.status(400).send(err));
};
