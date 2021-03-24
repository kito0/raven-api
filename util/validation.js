const Joi = require('joi');

const registerValidation = (data) => {
	const schema = Joi.object({
		name: Joi.string().min(4).required(),
		handle: Joi.string().min(4).required(),
		email: Joi.string().min(6).required().email(),
		avatar: Joi.string().min(6).required().uri(),
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

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
