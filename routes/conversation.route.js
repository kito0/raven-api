const router = require('express').Router();
const {
	getAllConversations,
	getConversations,
	getConversation,
	createConversation,
	// sendMessage,
} = require('../controllers/conversation.controller');
const verify = require('../util/verify.token');

router.get('/', getAllConversations);
router.get('/:userId', getConversations);
router.get('/:userId1/:userId2', getConversation);

router.post('/create/:userId1/:userId2', createConversation);
// router.post('/:handle1/:handle2', sendMessage);

module.exports = router;
