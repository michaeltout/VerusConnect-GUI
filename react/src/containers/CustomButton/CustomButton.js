import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';

class CustomButton extends React.Component {
  render() {
    const {
      backgroundColor,
      textColor,
      tooltip,
      title,
      style,
      onClick,
      buttonProps,
      disabled
    } = this.props;

    const ColorButton = withStyles((theme) => ({
      root: {
        color: textColor || "white",
        fontFamily: "inherit",
        textTransform: 'none',
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: backgroundColor || "rgb(78,115,223)",
        '&:hover': {
          backgroundColor: backgroundColor || "rgb(78,115,223)",
        },
        ...style
      },
    }))(Button);

    return tooltip ? (
      <Tooltip title={tooltip}>
        <span>
          <ColorButton
            variant="contained"
            color="primary"
            onClick={onClick != null ? onClick : () => {}}
            disabled={disabled}
            { ...buttonProps }
          >
            {title}
          </ColorButton>
        </span>
      </Tooltip>
    ) : (
      <ColorButton
        variant="contained"
        color="primary"
        onClick={onClick != null ? onClick : () => {}}
        disabled={disabled}
        { ...buttonProps }
      >
        {title}
      </ColorButton>
    );
  }
}

CustomButton.propTypes = {
  style: PropTypes.object,
  onClick: PropTypes.func,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  tooltip: PropTypes.string,
  title: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  buttonProps: PropTypes.object
};

export default CustomButton