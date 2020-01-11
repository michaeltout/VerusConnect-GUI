import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';

// This container is a simple input with suggestions that 
// takes in an on change function as onChange(event), and 
// it mocks the event.target.name and event.target.value properties
// to be compatible functionally with a standard text input
class SuggestionInput extends React.Component {
  render() {
    const {
      items,
      label,
      name,
      onChange,
      containerStyle,
      error,
      helperText,
      inputProps,
      renderOption,
      getOptionLabel
    } = this.props;

    return (
      <Autocomplete
        freeSolo
        style={containerStyle}
        options={items}
        groupBy={() => "Suggestions:"}
        onChange={(event, value) => onChange({target: {name, value: value == null ? '' : value}})}
        renderOption={renderOption}
        getOptionLabel={getOptionLabel}
        renderInput={params => (
          <TextField
            {...params}
            error={error}
            helperText={helperText}
            label={label}
            variant="outlined"
            onChange={(event) => onChange({target: {name, value: event.target.value}})}
            value={ this.props.value }
            style={{ width: "100%" }}
            InputProps={inputProps}
          />
        )}
      />
    );
  }
}

SuggestionInput.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  containerStyle: PropTypes.object,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  inputProps: PropTypes.object,
  renderOption: PropTypes.func,
  getOptionLabel: PropTypes.func
};

export default SuggestionInput