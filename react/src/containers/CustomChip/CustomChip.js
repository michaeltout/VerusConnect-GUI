import React from 'react';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

class CustomChip extends React.Component {
  render() {
    const { color, chipProps, handleDelete, rootProps } = this.props
    const CustomChip = withStyles({
      root: {
        backgroundColor: color ? color : undefined,
        fontFamily: "inherit",
        ...(rootProps ? rootProps : {})
      },
    })(props => <Chip color="default" {...props} />);

    return <CustomChip onDelete={ handleDelete } {...chipProps}/>
  }
}

CustomChip.propTypes = {
  color: PropTypes.string,
  chipProps: PropTypes.object
};

export default CustomChip