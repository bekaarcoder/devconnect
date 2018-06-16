const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
	let errors = {};

	data.name = !isEmpty(data.name) ? data.name : '';
	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	data.password2 = !isEmpty(data.password2) ? data.password2 : '';

	if(Validator.isEmpty(data.name)) {
		errors.name = "Name must not be empty";
	} else if(!Validator.isLength(data.name, {min: 3, max: 30})) {
		errors.name = "Name must be between 3 and 30 characters";
	} else if(Validator.isEmpty(data.email)) {
		errors.email = "Email must not be empty";
	} else if(!Validator.isEmail(data.email)) {
		errors.email = "Email is not a valid one";
	} else if(Validator.isEmpty(data.password)) {
		errors.password = "Password is required";
	} else if(!Validator.isLength(data.password, {min:6, max: 30})) {
		errors.password = "Password must be atleast 6 characters";
	} else if(Validator.isEmpty(data.password2)) {
		errors.password2 = "Confirm password is required";
	} else if(!Validator.equals(data.password, data.password2)) {
		errors.password2 = "Passwords does not match";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
}