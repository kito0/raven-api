const router = require('express').Router();
const { getPosts, post } = require('../controllers/post.controller');
const verify = require('../util/verify.token');

router.get('/', getPosts);

router.post('/', verify, post);

module.exports = router;
