const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data) {
	let errors = {};

	data.title = isEmpty(data.title) ? '' : data.title;
	data.degree = isEmpty(data.degree) ? '' : data.degree;
	data.field = isEmpty(data.field) ? '' : data.field;
	data.from = isEmpty(data.from) ? '' : data.from;

	if(Validator.isEmpty(data.title)) {
		errors.title = "Title is required";
	}
	if(Validator.isEmpty(data.degree)) {
		errors.degree = "Degree is required";
	}
	if(Validator.isEmpty(data.field)) {
		errors.field = "Field is required";
	}
	if(Validator.isEmpty(data.from)) {
		errors.from = "From data is required";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
}