import React from 'react'
import PropTypes from 'prop-types';

const SelectListGroup = ({
    name,
    label,
    value,
    error,
    info,
    onChange,
    options
}) => {
    const selectOptions = options.map((option) => {
        return (
            <option key={option.label} value={option.value}>{option.label}</option>
        )
    })
    return (
        <div className="form-group">
            <select
                className={`form-control form-control-lg ${error
                ? "is-invalid"
                : ""}`}
                name={name}
                value={value}
                onChange={onChange}>
                {selectOptions}
            </select>
            {info && <small className="form-text tet-muted">{info}</small>}
            {error && (
                <div className="invalid-feedback">{error}</div>
            )}
        </div>
    )
}

SelectListGroup.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired
}

export default SelectListGroup;
