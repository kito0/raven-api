const Post = require('../models/post.model');

exports.getPosts = async (req, res) => {
	res.send(req.user);
};

exports.post = async (req, res) => {
	const post = new Post({
		title: req.body.title,
		body: req.body.body,
	});
	saveImage(image, req.body.cover);

	try {
		const newPost = post.save();
	} catch {}
};
