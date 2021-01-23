import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

export const BasicModalRender = function(content) {
  return (
    <Dialog
      open={this.props.modalPathArray.length == null ? false : (this.props.modalPathArray.length > 0)}
      onClose={this.closeModal}
      fullWidth={true}
      disableBackdropClick={this.state.modalLock}
      disableEscapeKeyDown={this.state.modalLock}
      maxWidth="md"
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle
        id="form-dialog-title"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
        disableTypography={true}
      >
        <h4>{this.state.modalHeader}</h4>
        <IconButton
          aria-label="Close Modal"
          onClick={this.closeModal}
          style={{ visibility: this.state.modalLock ? "hidden" : "unset" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          minHeight: 600
        }}
      >
        {content}
      </DialogContent>
    </Dialog>
  );
}


