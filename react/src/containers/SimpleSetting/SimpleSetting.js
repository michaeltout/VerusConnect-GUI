import React from 'react';
import PropTypes from 'prop-types';
import { CHECKBOX, NUMBER_INPUT, TEXT_INPUT, DROPDOWN } from '../../util/constants/componentConstants';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox'

class SimpleSetting extends React.Component {
  render() {
    const { label, handleChange, value, values, disabled, placeholder, inputType, name, hidden } = this.props

    const getInput = () => {
      switch (inputType) {
        case CHECKBOX:
          return (
            <CustomCheckbox
              checkboxProps={{
                checked: value,
                onChange: (e) => handleChange(name, e.target.checked),
                disabled
              }}
              colorChecked="rgb(78,115,223)"
              colorUnchecked="rgb(78,115,223)"
            />
          );
        case NUMBER_INPUT:
          return (
            <input
             type="number"
              style={{ fontSize: 14 }}
              value={ value }
              step={1}
              onChange={(e) => handleChange(name, Number(e.target.value))}
              placeholder={ placeholder ? placeholder : '' }
            />
          );
        case TEXT_INPUT:
          return (
            <input
              type="text"
              style={{ fontSize: 14 }}
              value={ value }
              onChange={(e) => handleChange(name, e.target.value)}
              placeholder={ placeholder ? placeholder : '' }
            />
          );
        case DROPDOWN:
          return (
            <select
              value={value}
              className="custom-select custom-select-lg"
              disabled={ disabled }
              style={{
                fontSize: 14
              }}
              onChange={e =>
                handleChange(name, e.target.options[e.target.selectedIndex].value)
              }
            >
              {values.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          );
      }
    }

    return (hidden ? null : (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: 16,
          paddingRight: 16
        }}
      >
        <h6
          className="card-title"
          style={{ fontSize: 14, margin: 0, width: "max-content" }}
        >
          { label }
        </h6>
        <div className="d-flex d-sm-flex d-md-flex d-lg-flex flex-column align-items-center align-items-sm-center align-items-md-center justify-content-lg-center align-items-lg-center">
          <div className="d-flex d-sm-flex d-md-flex d-lg-flex align-items-center align-items-sm-center align-items-md-center align-items-lg-center">
            { getInput() }
          </div>
        </div>
      </div>
    ))
  }
}

SimpleSetting.propTypes = {
  label: PropTypes.string.isRequired,
  inputType: PropTypes.oneOf([CHECKBOX, NUMBER_INPUT, TEXT_INPUT, DROPDOWN]).isRequired,
  disabled: PropTypes.bool,
  handleChange: PropTypes.func,
  value: PropTypes.any,
  values: PropTypes.array,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  hidden: PropTypes.bool
};

export default SimpleSetting