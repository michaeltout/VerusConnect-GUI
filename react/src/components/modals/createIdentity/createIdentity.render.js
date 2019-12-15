import React from 'react';
import CommitNameForm from "./commitNameForm/commitNameForm";
import RegisterIdentityForm from "./registerIdentityForm/registerIdentityForm";
import RecoverIdentityForm from "./recoverIdentityForm/recoverIdentityForm";
import { CONFIRM_DATA, API_SUCCESS, SEND_RESULT, API_REGISTER_ID_NAME, API_RECOVER_ID, API_REGISTER_ID } from '../../../util/constants/componentConstants';
import Button from '@material-ui/core/Button';
import PieChart from 'react-minimal-pie-chart';

export const CreateIdentityRender = function() {
  const { advanceFormStep, state, back, props } = this
  const { loading, continueDisabled, formStep, txData } = state
  const { closeModal } = props

  return (
    <div style={{ width: "100%", paddingLeft: 35, paddingRight: 35 }}>
      {loading
        ? CreateIdentityRenderLoading.call(this)
        : CreateIdentityFormRender.call(this)}
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

export const CreateIdentityFormRender = function() {
  const { state, props, getFormData, getContinueDisabled } = this;
  const { modalProps } = props;

  if (modalProps.modalType === API_REGISTER_ID_NAME) {
    return (
      <CommitNameForm
        {...modalProps}
        {...state}
        setFormData={getFormData}
        setContinueDisabled={getContinueDisabled}
      />
    );
  } else if (modalProps.modalType === API_REGISTER_ID) {
    return (
      <RegisterIdentityForm
        {...modalProps}
        {...state}
        setFormData={getFormData}
        setContinueDisabled={getContinueDisabled}
      />
    );
  } else if (modalProps.modalType === API_RECOVER_ID) {
    return (
      <RecoverIdentityForm
        {...modalProps}
        {...state}
        setFormData={getFormData}
        setContinueDisabled={getContinueDisabled}
      />
    );
  }
};

export const CreateIdentityRenderLoading = function() {
  return (
    <div 
      className="d-sm-flex flex-column justify-content-sm-center"
      style={{ paddingBottom: 40, height: "100%" }}>
      <div
        className="d-flex d-sm-flex justify-content-center justify-content-sm-center"
        style={{ paddingBottom: 40 }}
      >
        <PieChart
          data={[{ value: 1, key: 1, color: "rgb(78,115,223)" }]}
          reveal={ this.state.loadingProgress }
          lineWidth={20}
          animate
          labelPosition={0}
          label={() => Math.round(this.state.loadingProgress) + "%"}
          labelStyle={{
            fontSize: "25px"
          }}
          style={{
            maxHeight: "60px",
            maxWidth: "60px"
          }}
        />
      </div>
    </div>
  )
}


