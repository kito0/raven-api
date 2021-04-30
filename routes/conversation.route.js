const router = require('express').Router();
const {
	getAllConversations,
	getConversations,
	sendMessage,
} = require('../controllers/conversation.controller');
const verify = require('../util/verify.token');

router.get('/', getAllConversations);
router.get('/:handle', getConversations);

router.post('/:handle1/:handle2', sendMessage);

module.exports = router;
