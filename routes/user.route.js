const router = require('express').Router();
const { register, login, getUser } = require('../controllers/user.controller');

router.get('/:handle', getUser);
router.post('/register', register);
router.post('/login', login);

module.exports = router;
