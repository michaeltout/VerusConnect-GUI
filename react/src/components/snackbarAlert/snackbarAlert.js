// TODO: Implement way to make alert dismissal 
// timers stack, currently a second alert can
// be cut short by a short timer on one right 
// before it.

import React from 'react';
import { SnackbarAlertRender } from './snackbarAlert.render'
import { closeSnackbar } from '../../actions/actionCreators'
import { connect } from 'react-redux';

class SnackbarAlert extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.props.dispatch(closeSnackbar());
  }

  render() {
    return SnackbarAlertRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    snackbar: state.snackbar,
  };
};

export default connect(mapStateToProps)(SnackbarAlert);
