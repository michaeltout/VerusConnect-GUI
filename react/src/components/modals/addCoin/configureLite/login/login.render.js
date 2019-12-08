import React from 'react';
import ProtectedInputForm from '../../../../../containers/ProtectedInputForm/ProtectedInputForm'

export const LoginRender = function() {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column" style={{ paddingBottom: 60 }}>
      <ProtectedInputForm 
        heading={`Enter profile password for ${this.props.activeUser.name}`}
        submitBtnText="Add Coin"
        onSubmit={this.submitPassword}
        inlineSubmit={true}
        helperText={this.state.formError ? this.state.formError : ''}
        inputDisabled={this.props.loading || this.state.formLock}
        submitDisabled={this.props.loading || this.state.formLock}
        error={this.state.formError ? true : false}
      />
    </div>
  );
}


