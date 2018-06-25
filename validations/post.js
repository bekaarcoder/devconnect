const Validator = require('validator');
const isEmpty = require('./is-empty.js');

module.exports = function validatePostInput(data) {
	const errors = {};

	data.text = isEmpty(data.text) ? '' : data.text;

	if(!Validator.isLength(data.text, {min:10, max: 400})) {
		errors.text = "Text should be between 10 and 400 characters";
	}
	if(Validator.isEmpty(data.text)) {
		errors.text = "Text field is required";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};