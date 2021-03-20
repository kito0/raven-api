const router = require('express').Router();
const {
	getPosts,
	createPost,
	editPost,
	deletePost,
} = require('../controllers/post.controller');
const verify = require('../util/verify.token');

router.get('/', getPosts);

router.post('/', verify, createPost);

router.put('/:id', verify, editPost);

router.delete('/:id', verify, deletePost);

module.exports = router;
