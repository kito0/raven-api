const router = require('express').Router();
const {
	register,
	login,
	getUser,
	getUserByHandle,
	updateUser,
	addFollower,
	addFollowing,
} = require('../controllers/user.controller');
const verify = require('../util/verify.token');

router.get('/:id', getUser);
router.get('/handle/:handle', getUserByHandle);

router.post('/register', register);
router.post('/login', login);

router.put('/:id', updateUser);
router.put('/follow/:handle', verify, addFollower);
router.put('/following/:handle', verify, addFollowing);

module.exports = router;
