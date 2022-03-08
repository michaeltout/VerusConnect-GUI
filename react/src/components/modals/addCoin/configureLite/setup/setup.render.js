import React from 'react';
import ProtectedInputForm from '../../../../../containers/ProtectedInputForm/ProtectedInputForm'

export const SetupRender = function() {
  return (
    <div
      className="d-flex align-items-center flex-column"
      style={{
        justifyContent: this.state.importSeed ? "center" : "space-between",
        paddingBottom: this.state.importSeed ? 65 : 0,
      }}
    >
      {this.state.importSeed ? SetupRenderSeedImport.call(this) : SetupRenderChoices.call(this)}
    </div>
  );
}

export const SetupRenderChoices = function() {
  return (
    <React.Fragment>
      <div style={{height: '100%', display: "flex", justifyContent: "center"}}>
      <ProtectedInputForm 
        heading="Generate a new seed"
        submitBtnText="Continue"
        multiline={true}
        onSubmit={this.submitSeed}
        confirmHeading="Confirm Seed"
        confirm={true}
        confirmBtnText="Confirm"
        seedGenerator={true}
      />
      </div>
      <a
        href="#"
        style={{ color: "rgb(49, 101, 212)" }}
        onClick={ this.toggleSeedGenerator }
      >
        {"Import an existing secure seed phrase or WIF key"}
      </a>
    </React.Fragment>
  )
}

export const SetupRenderSeedImport = function() {
  return (
    <ProtectedInputForm 
      heading="Enter an existing secure seed phrase or WIF key"
      multiline={true}
      onSubmit={this.submitSeed}
      inlineSubmit={true}
    />
  )
}


