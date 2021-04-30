const Conversation = require('../models/conversation.model');

// GET http://localhost:5000/api/conversations
exports.getAllConversations = async (req, res) => {
	Conversation.find()
		.then((conversations) => {
			res.status(200).json(conversations);
		})
		.catch((err) => res.status(500).send(err));
};

// GET http://localhost:5000/api/conversations/:handle
exports.getConversations = async (req, res) => {
	Conversation.find({
		$or: [{ handle1: req.params.handle }, { handle2: req.params.handle }],
	})
		.then((conversations) => {
			res.status(200).json(conversations);
		})
		.catch((err) => res.status(500).send(err));
};

// POST http://localhost:5000/api/conversation/:handle1/:handle2
exports.sendMessage = async (req, res) => {
	Conversation.findOneAndUpdate(
		{
			$or: [
				{ handle1: req.params.handle1, handle2: req.params.handle2 },
				{ handle1: req.params.handle2, handle2: req.params.handle1 },
			],
		},
		{
			$setOnInsert: {
				title: req.params.handle1 + ', ' + req.params.handle2,
				handle1: req.params.handle1,
				handle2: req.params.handle2,
			},
			$push: {
				messages: { sender: req.params.handle1, text: req.body.text },
			},
		},
		{ upsert: true, new: true }
	)
		.then((conversation) => res.status(200).json(conversation))
		.catch((err) => res.status(500).send(err));
};
