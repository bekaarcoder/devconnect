import React from 'react';
import PropTypes from 'prop-types';

const InputGroup = ({
	name,
	placeholder,
	value,
	error,
  icon,
  type,
	onChange,
}) => {
	return (
		<div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon}></i>
        </span>
      </div>
			<input
				className={"form-control " + (error && "is-invalid")}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
			{error && <div className="invalid-feedback">
				{error}
			</div>}
		</div>
	);
};

InputGroup.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
  error: PropTypes.string,
  icon: PropTypes.string,
  type: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

InputGroup.defaultProps = {
  type: 'text'
};

export default InputGroup;