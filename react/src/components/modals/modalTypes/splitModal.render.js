import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
const { shell } = window.require('electron');

export const SplitModalRender = function(content) {
  return (
    <Dialog
      open={this.props.modalPathArray.length > 0}
      onClose={this.closeModal}
      fullWidth={true}
      disableBackdropClick={this.state.modalLock}
      disableEscapeKeyDown={this.state.modalLock}
      maxWidth="md"
      aria-labelledby="form-dialog-title"
    >
      <DialogContent
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          minHeight: 600,
          padding: 0,
        }}
      >
        <div
          style={{
            backgroundColor: "rgb(78,115,223)",
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "stretch",
            padding: 16,
            paddingTop: 32,
            display: "flex",
          }}
        >
          <h4 style={{ color: "white", fontWeight: "bold" }}>
            {this.state.modalHeader}
          </h4>
          {this.state.links != null &&
            Array.isArray(this.state.links) &&
            this.state.links.length > 0 && (
              <div style={{ display: "flex", flex: 1, alignItems: "flex-end" }}>
                {this.state.links.map((x) => {
                  <a
                    href="#"
                    onClick={() =>
                      shell.openExternal(x.link)
                    }
                    style={{
                      color: "white",
                      fontWeight: 400,
                      textDecoration: "underline",
                    }}
                  >
                    {x.label}
                  </a>;
                })}
              </div>
            )}
        </div>
        <div
          style={{
            backgroundColor: "white",
            flex: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              aria-label="Close Modal"
              onClick={this.closeModal}
              style={{
                visibility: this.state.modalLock ? "hidden" : "unset",
                color: "black",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ fontSize: 16, paddingBottom: 2, marginRight: 2 }}>
                {"Close"}
              </div>
              <CloseIcon />
            </IconButton>
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "stretch",
              padding: 16,
              overflow: 'scroll'
            }}
          >
            {content}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


