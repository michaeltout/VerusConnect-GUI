import React from "react";
import { CONFIRM_DATA, API_SUCCESS, SEND_RESULT } from '../../../util/constants/componentConstants';
import Button from '@material-ui/core/Button';
import SimpleLoader from '../../../containers/SimpleLoader/SimpleLoader'

export const BridgekeeperRender = function() {
  const { startBridgekeeper, stopBridgekeeper, state, back, props } = this
  const { loading, continueDisabled, formStep, txData } = state
  const { closeModal } = props

  return (
    <div style={{ width: "100%", paddingLeft: 35, paddingRight: 35 }}>
      
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
            variant="outlined"
            onClick={startBridgekeeper}
            disabled={false}
            size="large"
            color="primary"
          >
            {"Start"}
          </Button>
          <Button
            variant="outlined"
            onClick={stopBridgekeeper}
            disabled={false}
            size="large"
            color="primary"
          >
            {"Stop"}
          </Button>

        </div>
      )}
    </div>
  );
}

export const BridgekeeperFormRender = function() {
  const { state, props, getFormData, getContinueDisabled } = this
  const { modalProps } = props

  return (
    null
  );
}

export const BridgekeeperRenderLoading = function() {
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


