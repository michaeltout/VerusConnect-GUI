/**
 * This container is a simple form for either logging in with, or creating
 * passwords. If the 'confirm' prop is specified, this will be a two step
 * form, where the user must confirm their password before the onSubmit prop
 * function is called, which takes in the resulting password as its parameter.
 */

import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

class SimpleLoader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { 
      size,
      text
    } = this.props;

    return (
      <div
        style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress size={ size == null ? 75 : size } />
        {text != null && <div style={{paddingTop: 10}}>{text}</div>}
      </div>
    );
  }
}

SimpleLoader.propTypes = {
  text: PropTypes.string,
  size: PropTypes.number
};

export default SimpleLoader