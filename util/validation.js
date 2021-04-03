const Joi = require('joi');

const registerValidation = (data) => {
	const schema = Joi.object({
		name: Joi.string().max(32).required(),
		handle: Joi.string().max(16).required(),
		email: Joi.string().max(64).required().email(),
		avatar: Joi.string().max(1024).required().uri(),
		password: Joi.string().min(6).required(),
	});
	return schema.validate(data);
};

const loginValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string().min(6).required().email(),
		password: Joi.string().min(6).required(),
	});
	return schema.validate(data);
};

const updateValidation = (data) => {
	const schema = Joi.object({
		name: Joi.string().max(32).required(),
		avatar: Joi.string().max(1024).required().uri(),
	});
	return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.updateValidation = updateValidation;
