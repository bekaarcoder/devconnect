import React from 'react';
import PropTypes from 'prop-types';

const TextareaFieldGroup = ({
	name,
	placeholder,
	value,
	error,
	info,
	onChange,
	autoComplete
}) => {
	return (
		<div className="form-group">
			<textarea
				className={"form-control " + (error && "is-invalid")}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				autoComplete={autoComplete}
			/>
			{info && <small className="form-text text-muted">{info}</small>}
			{error && <div className="invalid-feedback">
				{error}
			</div>}
		</div>
	);
};

TextareaFieldGroup.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	info: PropTypes.string,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	autoComplete: PropTypes.string
};

export default TextareaFieldGroup;