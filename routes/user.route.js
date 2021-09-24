const router = require('express').Router();
const {
	register,
	login,
	getUser,
	searchUsers,
	// getUserByHandle,
	getUserHandle,
	updateUser,
	addRemoveFollower,
	toggleFollow,
} = require('../controllers/user.controller');
const verify = require('../util/verify.token');

router.get('/:id', getUser);
router.get('/search/:search', searchUsers);
// router.get('/handle/:handle', getUserByHandle);
router.get('/handle/:id', getUserHandle);

router.post('/register', register);
router.post('/login', login);

router.put('/:id', verify, updateUser);
router.put('/follow/:handle', verify, addRemoveFollower);
router.put('/following/:handle', verify, toggleFollow);

module.exports = router;
