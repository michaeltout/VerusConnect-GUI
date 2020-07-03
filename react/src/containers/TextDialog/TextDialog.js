// https://material-ui.com/components/dialogs/

import React from "react";
import DialogContentText from "@material-ui/core/DialogContentText";
import ContentDialog from "../ContentDialog/ContentDialog";

export default function TextDialog(props) {
  return (
    <ContentDialog
      open={props.open}
      onCancel={props.onCancel}
      actions={props.actions}
      title={props.title}
    >
      {props.description && (
        <DialogContentText>{props.description}</DialogContentText>
      )}
    </ContentDialog>
  );
}
