import React from 'react';
import PropTypes from 'prop-types';

const InputColor = props => {
    const { label, name, value, onChange, error } = props;

    const errorMessage = error ? <div className="error">{error}</div> : "";

    return (
        <React.Fragment>
            <label className="label">{label}</label>
            <input
                type="text"
                className="form-control"
                placeholder={label}
                name={name}
                value={value}
                onChange={onChange}
            />
            {errorMessage}
        </React.Fragment>
    )
}

InputColor.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired
}

export default InputColor;
