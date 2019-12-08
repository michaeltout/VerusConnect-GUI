import React from 'react';
import ProtectedInputForm from '../../../../../containers/ProtectedInputForm/ProtectedInputForm'

/*
<ProtectedInputForm 
  heading="Protected input form test"
  submitBtnText="Continue"
  multiline={true}
  onSubmit={(password) => {console.log(password + " submitted after one step")}}
  confirmHeading="Confirm password heading"
  confirm={true}
  confirmBtnText="Confirm"
  seedGenerator={true}
/>
<ProtectedInputForm 
  heading="Protected input form test"
  submitBtnText="Continue"
  multiline={true}
  onSubmit={(password) => {console.log(password + " submitted after one step")}}
  confirmHeading="Confirm password heading"
  confirm={true}
  confirmBtnText="Confirm"
/>
<ProtectedInputForm 
  heading="Protected input form test"
  submitBtnText="Continue"
  multiline={true}
  onSubmit={(password) => {console.log(password + " submitted after one step")}}
  inlineSubmit={true}
/>
*/

export const SetupRender = function() {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column" style={{ paddingBottom: 65 }}>
      { this.state.seedGenerator ? SetupRenderSeedGenerator.call(this) : SetupRenderChoices.call(this) }
    </div>
  );
}

export const SetupRenderChoices = function() {
  return (
    <React.Fragment>
      <ProtectedInputForm 
        heading="Enter an existing seed"
        multiline={true}
        onSubmit={this.submitSeed}
        inlineSubmit={true}
      />
      <div
        className="d-lg-flex flex-column justify-content-lg-center align-items-lg-center"
      >
        <h1
          className="text-break text-center d-md-flex justify-content-md-center align-items-md-center"
          style={{
            marginBottom: 0,
            color: "rgb(0,0,0)",
            fontSize: 16,
            width: "max-content",
            paddingTop: 20,
            paddingBottom: 40,
            maxWidth: "100%"
          }}
        >
          {"or"}
        </h1>
      </div>
      <button
        className="btn btn-primary"
        type="button"
        style={{
          fontSize: 14,
          backgroundColor: "rgb(78,115,223)",
          borderWidth: 1,
          borderColor: "rgb(78,115,223)"
        }}
        onClick={ this.toggleSeedGenerator }
      >
        {"Generate a New Seed"}
      </button>
    </React.Fragment>
  )
}

export const SetupRenderSeedGenerator = function() {
  return (
    <ProtectedInputForm 
      heading="Generate a New Seed"
      submitBtnText="Continue"
      multiline={true}
      onSubmit={this.submitSeed}
      confirmHeading="Confirm Seed"
      confirm={true}
      confirmBtnText="Confirm"
      seedGenerator={true}
    />
  )
}


