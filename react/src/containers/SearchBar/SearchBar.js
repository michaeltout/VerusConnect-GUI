/**
 * This container is a simple form for either logging in with, or creating
 * passwords. If the 'confirm' prop is specified, this will be a two step
 * form, where the user must confirm their password before the onSubmit prop
 * function is called, which takes in the resulting password as its parameter.
 */

import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Clear from '@material-ui/icons/Clear';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.props.onSubmit()
    }
  }

  render() {
    const { 
      label, 
      disabled,
      style,
      placeholder,
      value,
      onSubmit,
      onChange,
      name,
      clearable,
      onClear,
      autoFocus,
      variant,
      containerStyle
    } = this.props;

    return (
      <FormControl style={containerStyle}>
        <TextField
          label={label}
          autoFocus={autoFocus == null ? false : autoFocus}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  style={{
                    visibility:
                      clearable && value && value.length > 0
                        ? "unset"
                        : "hidden",
                  }}
                  color="primary"
                  onClick={onClear}
                >
                  <Clear />
                </IconButton>
                <IconButton color="primary" onClick={onSubmit}>
                  <ArrowForward />
                </IconButton>
              </InputAdornment>
            ),
          }}
          id="searchBarInput"
          onKeyDown={this.handleKeyDown}
          style={{
            fontFamily: "inherit",
            ...style,
          }}
          variant={variant || "standard"}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
        />
      </FormControl>
    );
  }
}

SearchBar.propTypes = {
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  name: PropTypes.string,
  clearable: PropTypes.bool,
  onClear: PropTypes.func,
  autoFocus: PropTypes.bool,
  variant: PropTypes.string,
  containerStyle: PropTypes.object
};

export default SearchBar