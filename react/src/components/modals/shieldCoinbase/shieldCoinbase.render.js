import React from "react";
import ShieldCoinbaseForm from "./shieldCoinbaseForm/shieldCoinbaseForm";
import { CONFIRM_DATA, API_SUCCESS, SEND_RESULT } from '../../../util/constants/componentConstants';
import Button from '@material-ui/core/Button';
import SimpleLoader from '../../../containers/SimpleLoader/SimpleLoader'

export const ShieldCoinbaseRender = function() {
  const { advanceFormStep, state, back, props } = this
  const { loading, continueDisabled, formStep, txData } = state
  const { closeModal } = props

  return (
    <div style={{ width: "100%", paddingLeft: 35, paddingRight: 35 }}>
      {loading
        ? ShieldCoinbaseRenderLoading.call(this)
        : ShieldCoinbaseFormRender.call(this)}
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
                formStep === CONFIRM_DATA ||
                (formStep === SEND_RESULT && txData.status !== API_SUCCESS)
                  ? "unset"
                  : "hidden"
            }}
          >
            {"Back"}
          </Button>
          <Button
            variant="contained"
            onClick={ formStep === SEND_RESULT ? closeModal : advanceFormStep }
            disabled={continueDisabled}
            size="large"
            color="primary"
          >
            {formStep === SEND_RESULT ? "Done" : "Continue"}
          </Button>
        </div>
      )}
    </div>
  );
}

export const ShieldCoinbaseFormRender = function() {
  const { state, props, getFormData, getContinueDisabled } = this
  const { modalProps } = props

  return (
    <ShieldCoinbaseForm
      {...modalProps}
      {...state}
      setFormData={getFormData}
      setContinueDisabled={getContinueDisabled}
    />
  );
}

export const ShieldCoinbaseRenderLoading = function() {
  return (
    <div 
      className="d-sm-flex flex-column justify-content-sm-center"
      style={{ paddingBottom: 40, height: "100%" }}>
      <div
        className="d-flex d-sm-flex justify-content-center justify-content-sm-center"
        style={{ paddingBottom: 40 }}
      >
        <SimpleLoader size={75} text={"Building Transaction..."}/>
      </div>
    </div>
  )
}


