const router = require('express').Router();
const {
	getMessages,
	sendMessage,
} = require('../controllers/message.controller');
const verify = require('../util/verify.token');

router.get('/:conversationId', getMessages);

router.post('/', sendMessage);

module.exports = router;
