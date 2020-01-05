import React from 'react';
import VerifyIdDataForm from "./VerifyIdDataForm/VerifyIdDataForm";
import SignIdDataForm from "./SignIdDataForm/SignIdDataForm";
import { CONFIRM_DATA, API_SUCCESS, SEND_RESULT, API_REGISTER_ID_NAME, API_RECOVER_ID, API_REGISTER_ID, VERIFY_ID_DATA, SIGN_ID_DATA } from '../../../util/constants/componentConstants';
import Button from '@material-ui/core/Button';
import SimpleLoader from '../../../containers/SimpleLoader/SimpleLoader'

export const SignVerifyIdDataRender = function() {
  const { advanceFormStep, state, back, props } = this
  const { loading, continueDisabled, formStep, txData } = state
  const { closeModal } = props

  return (
    <div style={{ width: "100%", paddingLeft: 35, paddingRight: 35 }}>
      {loading
        ? SignVerifyIdDataRenderLoading.call(this)
        : SignVerifyIdDataFormRender.call(this)}
      {!loading && (
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between"
          }}
        >
          <Button
            variant="contained"
            onClick={back}
            size="large"
            color="default"
            style={{
              visibility:
                (formStep === CONFIRM_DATA)
                  ? "unset"
                  : "hidden"
            }}
          >
            {"Back"}
          </Button>
          <Button
            variant="contained"
            onClick={ formStep === CONFIRM_DATA ? closeModal : advanceFormStep }
            disabled={continueDisabled}
            size="large"
            color="primary"
            style={{ marginBottom: 5 }}
          >
            {formStep === CONFIRM_DATA ? "Done" : "Continue"}
          </Button>
        </div>
      )}
    </div>
  );
}

export const SignVerifyIdDataFormRender = function() {
  const { state, props, getFormData, getContinueDisabled } = this;
  const { modalProps } = props;

  if (modalProps.modalType === VERIFY_ID_DATA) {
    return (
      <VerifyIdDataForm
        {...modalProps}
        {...state}
        setFormData={getFormData}
        setContinueDisabled={getContinueDisabled}
      />
    );
  } else if (modalProps.modalType === SIGN_ID_DATA) {
    return (
      <SignIdDataForm
        {...modalProps}
        {...state}
        setFormData={getFormData}
        setContinueDisabled={getContinueDisabled}
      />
    );
  }
};

export const SignVerifyIdDataRenderLoading = function() {
  return (
    <div 
      className="d-sm-flex flex-column justify-content-sm-center"
      style={{ paddingBottom: 40, height: "100%" }}>
      <div
        className="d-flex d-sm-flex justify-content-center justify-content-sm-center"
        style={{ paddingBottom: 40 }}
      >
        <SimpleLoader size={75} text={"Checking signature..."}/>
      </div>
    </div>
  )
}


