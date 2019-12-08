import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';


class CustomCheckbox extends React.Component {
  render() {
    const { colorUnchecked, colorChecked } = this.props
    const GreenCheckbox = withStyles({
      root: {
        color: colorUnchecked,
        '&$checked': {
          color: colorChecked,
        },
      },
      checked: {},
    })(props => <Checkbox color="default" {...props} />);

    return <GreenCheckbox color="default" {...this.props.checkboxProps}/>
  }
}

CustomCheckbox.propTypes = {
  colorChecked: PropTypes.string.isRequired,
  colorUnchecked: PropTypes.string.isRequired,
  checkboxProps: PropTypes.object
};

export default CustomCheckbox