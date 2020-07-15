import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContentWrapper from '../../containers/SnackbarContentWrapper/SnackbarContentWrapper'

export const SnackbarAlertRender = function() {
  const { props, handleClose } = this
  const { variant, open, message, autoCloseMs } = props.snackbar

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      ClickAwayListenerProps={{
        mouseEvent: false
      }}
      open={ open }
      autoHideDuration={ autoCloseMs ? autoCloseMs : null }
      onClose={ handleClose }
    >
      <SnackbarContentWrapper
        onClose={ handleClose }
        variant={ variant }
        message={ message }
      />
    </Snackbar>
  );
}


