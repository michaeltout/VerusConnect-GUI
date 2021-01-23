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

export const SignUpRender = function() {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column" style={{ paddingBottom: 60 }}>
      { this.state.attachSeed ? SignUpRenderForm.call(this) : SignUpRenderChoices.call(this) }
    </div>
  );
}

export const SignUpRenderChoices = function() {
  const { formLock } = this.state

  return (
    <React.Fragment>
      <div
        className="d-lg-flex flex-column justify-content-lg-center align-items-lg-center"
        style={{ maxWidth: 650, paddingBottom: 15 }}
      >
        <h1
          className="text-break text-center d-md-flex justify-content-md-center align-items-md-center"
          style={{
            marginBottom: 0,
            color: "rgb(0,0,0)",
            fontSize: 16,
            width: "max-content",
            maxWidth: "100%"
          }}
        >
          Would you like to make this seed the main seed for&nbsp;<strong>{" " + this.props.activeUser.name}</strong>?
        </h1>
      </div>
      <div
        className="d-lg-flex flex-column justify-content-lg-center align-items-lg-center"
        style={{ maxWidth: 650, paddingBottom: 40 }}
      >
        <h1
          className="text-break text-center d-md-flex justify-content-md-center align-items-md-center"
          style={{
            marginBottom: 0,
            color: "rgb(0,0,0)",
            fontSize: 16,
            width: "max-content",
            maxWidth: "100%"
          }}
        >
          {
            "If you do, your seed will be encrypted, and you'll be able to access it through a password."
          }
        </h1>
      </div>
      <button
        className="btn btn-primary"
        type="button"
        disabled={formLock}
        style={{
          fontSize: 14,
          backgroundColor: "rgb(49, 101, 212)",
          borderWidth: 1,
          borderColor: "rgb(49, 101, 212)"
        }}
        onClick={this.toggleAttachSeed}
      >
        {"Yes, attach my seed to this profile"}
      </button>
      <a
        className="text-right"
        disabled={formLock}
        onClick={formLock ? () => {} : () => {
          this.setState({
            formLock: true
          }, () => this.props.activateCoin())
        }}
        href="#"
        style={{
          paddingTop: 20,
          color: "#3f51b5"
        }}
      >
        {`No, just add ${this.props.addCoinParams.coinObj.id}`}
      </a>
    </React.Fragment>
  );
}

export const SignUpRenderForm = function() {
  return (
    <ProtectedInputForm 
      heading="Enter a password"
      submitBtnText="Continue"
      onSubmit={this.linkUserWithSeed}
      confirmHeading="Enter your password again"
      confirm={true}
      confirmBtnText="Confirm & Add Coin"
      inputDisabled={this.props.loading || this.state.formLock}
      submitDisabled={this.props.loading || this.state.formLock}
    />
  )
}


