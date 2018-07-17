import React from 'react';
import PropTypes from 'prop-types';

const SelectListGroup = ({
	name,
	error,
	info,
	onChange,
	value,
  options,
}) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>{option.label}</option>
  ));
	return (
		<div className="form-group">
			<select
				className={"form-control " + (error && "is-invalid")}
				name={name}
				onChange={onChange}
				value={value}
			>
			{selectOptions}
      </select>
			{info && <small className="form-text text-muted">{info}</small>}
			{error && <div className="invalid-feedback">
				{error}
			</div>}
		</div>
	);
};

SelectListGroup.propTypes = {
	name: PropTypes.string.isRequired,
	info: PropTypes.string,
	error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
	options: PropTypes.array.isRequired,
	value: PropTypes.string.isRequired,
	autoComplete: PropTypes.string
};

export default SelectListGroup;