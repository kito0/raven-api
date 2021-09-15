const router = require('express').Router();
const {
	getMessages,
	getLastMessage,
	sendMessage,
} = require('../controllers/message.controller');
const verify = require('../util/verify.token');

router.get('/:conversationId', getMessages);
router.get('/last/:conversationId', getLastMessage);

router.post('/', sendMessage);

module.exports = router;
