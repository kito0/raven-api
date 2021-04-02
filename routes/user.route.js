const router = require('express').Router();
const {
	register,
	login,
	getUser,
	updateUser,
} = require('../controllers/user.controller');

router.get('/:id', getUser);
router.put('/:id', updateUser);
router.post('/register', register);
router.post('/login', login);

module.exports = router;
