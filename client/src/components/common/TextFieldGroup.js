import React from 'react';
import PropTypes from 'prop-types';

const TextFieldGroup = ({
	name,
	placeholder,
	value,
	label,
	error,
	info,
	type,
	onChange,
	disabled,
	autoComplete
}) => {
	return (
		<div className="form-group">
			<input
				type={type}
				className={"form-control " + (error && "is-invalid")}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				autoComplete={autoComplete}
				disabled={disabled}
			/>
			{info && <small className="form-text text-muted">{info}</small>}
			{error && <div className="invalid-feedback">
				{error}
			</div>}
		</div>
	);
};

TextFieldGroup.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	info: PropTypes.string,
	error: PropTypes.string,
	type: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	disabled: PropTypes.string,
	autoComplete: PropTypes.string
};

TextFieldGroup.defaultProps = {
	type: 'text'
};

export default TextFieldGroup;