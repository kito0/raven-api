const router = require('express').Router();
const {
	getPosts,
	createPost,
	editPost,
	deletePost,
	getPostsByUser,
	updatePosts,
} = require('../controllers/post.controller');
const verify = require('../util/verify.token');

router.get('/', getPosts);
router.get('/:handle', getPostsByUser);

router.post('/', verify, createPost);

router.put('/:id', verify, editPost);
router.put('/update/:handle', verify, updatePosts);

router.delete('/:id', verify, deletePost);

module.exports = router;
