import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import PropTypes from 'prop-types';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

class CheckboxDropdown extends React.Component {
  render() {
    const { items, label, placeholder, getOptionLabel } = this.props

    return (
      <Autocomplete
        multiple
        options={items}
        disableCloseOnSelect
        getOptionLabel={getOptionLabel}
        renderOption={(option, { selected }) => (
          <React.Fragment>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.title}
          </React.Fragment>
        )}
        style={{ width: 500 }}
        renderInput={params => (
          <TextField
            {...params}
            variant="outlined"
            label={label}
            placeholder={placeholder}
            fullWidth
          />
        )}
        {...this.props.autocompleteProps}
      />
    );
  }
}

CheckboxDropdown.propTypes = {
  items: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  getOptionLabel: PropTypes.func.isRequired,
  autocompleteProps: PropTypes.object
};

export default CheckboxDropdown