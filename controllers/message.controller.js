const Message = require('../models/message.model');
const Conversation = require('../models/conversation.model');

// GET http://localhost:5000/api/messages/:conversationId
exports.getMessages = async (req, res) => {
	Message.find({ conversationId: req.params.conversationId })
		.then((data) => {
			res.status(200).json(data);
		})
		.catch((err) => res.status(500).json(err));
};

// GET http://localhost:5000/api/messages/last/:conversationId
exports.getLastMessage = async (req, res) => {
	Message.find({ conversationId: req.params.conversationId })
		.then((data) => {
			res.status(200).json(data[data.length - 1]);
		})
		.catch((err) => res.status(500).json(err));
};

// POST http://localhost:5000/api/messages/
exports.sendMessage = async (req, res) => {
	Message.create(req.body)
		.then((data) => res.status(201).json(data))
		.catch((err) => res.status(500).json(err));
};
