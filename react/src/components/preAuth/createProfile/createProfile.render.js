import React from 'react';
import TextField from "@material-ui/core/TextField";

export const CreateProfileRender = function() {
  const hasUsers = Object.keys(this.props.loadedUsers).length

  return (
    <form className="pre-auth-body-container">
      <h2 className="text-center">Create your profile:</h2>
      <div className="form-group">
        <TextField
          helperText={
            "This profile will store your basic wallet data and settings locally, and can be used to encrypt your lite wallet keys."
          }
          FormHelperTextProps={{
            style: {
              textAlign: "center"
            }
          }}
          label={"Enter new profile name"}
          variant="outlined"
          onChange={this.updateInput}
          name="profileName"
          value={this.state.profileName}
        />
      </div>
      <div className="form-group d-flex justify-content-between pre-auth-button-container">
        {hasUsers ? (
          <button
            className="btn btn-primary pre-auth-button"
            disabled={this.state.loading}
            onClick={this.cancel}
          >
            Cancel
          </button>
        ) : null}
        <button
          className={`btn btn-primary ${
            hasUsers ? "pre-auth-button" : "pre-auth-button-single"
          }`}
          onClick={this.validateFormData}
          disabled={this.state.loading}
        >
          Create
        </button>
      </div>
    </form>
  );
}


