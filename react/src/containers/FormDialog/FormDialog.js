// https://material-ui.com/components/dialogs/

import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import SearchBar from '../SearchBar/SearchBar'
import ContentDialog from '../ContentDialog/ContentDialog';

export default function FormDialog(props) {
  return (
    <ContentDialog open={props.open} onCancel={props.onCancel} actions={[{
      title: 'Cancel',
      onClick: props.onCancel
    }]}>
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
    </ContentDialog>
  );
}