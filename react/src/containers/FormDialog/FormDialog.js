// https://material-ui.com/components/dialogs/

import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import SearchBar from '../SearchBar/SearchBar'

export default function FormDialog(props) {
  return (
    <Dialog
      open={props.open}
      aria-labelledby="form-dialog-title"
    >
      <DialogContent>
        {props.description && (
          <DialogContentText>{props.description}</DialogContentText>
        )}
        <SearchBar 
          disabled={props.disabled}
          label={props.title}
          placeholder={props.placeholder || "Type and press enter"}
          clearable={true}
          onChange={e => props.onChange(e.target.value)}
          onClear={() => {
            props.onChange('')
          }}
          onSubmit={props.onSubmit}
          value={props.value}
          autoFocus={true}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onCancel} color="primary">
          {"Cancel"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}