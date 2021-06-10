const router = require('express').Router();
const {
	getAllConversations,
	getConversations,
	getConversation,
	createConversation,
	sendMessage,
} = require('../controllers/conversation.controller');
const verify = require('../util/verify.token');

router.get('/', getAllConversations);
router.get('/:handle', getConversations);
router.get('/:handle1/:handle2', getConversation);

router.post('/create/:handle1/:handle2', createConversation);
router.post('/:handle1/:handle2', sendMessage);

module.exports = router;
