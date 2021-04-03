const router = require('express').Router();
const {
	register,
	login,
	getUser,
	getUserByHandle,
	updateUser,
} = require('../controllers/user.controller');

router.get('/:id', getUser);
router.get('/handle/:handle', getUserByHandle);
router.put('/:id', updateUser);
router.post('/register', register);
router.post('/login', login);

module.exports = router;
