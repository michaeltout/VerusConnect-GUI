import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';

class ColoredCircle extends React.Component {
  render() {
    const { color, avatarProps } = this.props
    const AvatarWithColor = withStyles({
      root: {
        backgroundColor: color,
        width: 24,
        height: 24,
      },
    })(props => <Avatar  {...props}>{""}</Avatar>);

    return <AvatarWithColor {...avatarProps}/>
  }
}

ColoredCircle.propTypes = {
  color: PropTypes.string,
  avatarProps: PropTypes.object
};

export default ColoredCircle