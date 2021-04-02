const router = require('express').Router();
const {
	getPosts,
	createPost,
	editPost,
	deletePost,
	getPostsByUser,
} = require('../controllers/post.controller');
const verify = require('../util/verify.token');

router.get('/', getPosts);

router.get('/:handle', getPostsByUser);

router.post('/', verify, createPost);

router.put('/:id', verify, editPost);

router.delete('/:id', verify, deletePost);

module.exports = router;
