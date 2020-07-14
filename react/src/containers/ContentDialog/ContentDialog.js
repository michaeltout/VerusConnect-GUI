// https://material-ui.com/components/dialogs/

import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { DialogTitle } from '@material-ui/core';

export default function ContentDialog(props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.onCancel}
      aria-labelledby="form-dialog-title"
    >
      {props.title && <DialogTitle>{props.title}</DialogTitle>}
      <DialogContent>
        {props.children}
      </DialogContent>
      <DialogActions>
        {props.actions.map((action, index) => {
          return (
            <Button key={index} onClick={action.onClick} color="primary">
              {action.title}
            </Button>
          );
        })}
      </DialogActions>
    </Dialog>
  );
}