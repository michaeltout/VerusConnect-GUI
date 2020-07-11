import React from 'react';
import FundForm from "./fundForm/fundForm";
import MessageSendForm from "./messageSendForm/messageSendForm";
import ReserveSendForm from "./reserveSendForm/reserveSendForm";
import TraditionalSendForm from "./traditionalSendForm/traditionalSendForm";
import ClaimInterestForm from "./claimInterestForm/claimInterestForm";
import { TRANSPARENT_BALANCE, PRIVATE_BALANCE, RESERVE_BALANCE, CONFIRM_DATA, API_SUCCESS, SEND_RESULT, INTEREST_BALANCE, ENTER_DATA } from '../../../util/constants/componentConstants';
import Button from '@material-ui/core/Button';
import PieChart from 'react-minimal-pie-chart';
import SimpleLoader from '../../../containers/SimpleLoader/SimpleLoader'

export const SendCoinRender = function() {
  const { advanceFormStep, state, back, props } = this
  const { loading, continueDisabled, formStep, txData, formData } = state
  const { closeModal, modalProps } = props

  return (
    <div style={{ width: "100%", paddingLeft: 35, paddingRight: 35 }}>
      {loading
        ? SendCoinRenderLoading.call(this)
        : SendCoinFormRender.call(this)}
      {!loading && (
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
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
                  : "hidden",
            }}
          >
            {"Back"}
          </Button>
          <Button
            variant="contained"
            onClick={formStep === SEND_RESULT ? closeModal : advanceFormStep}
            disabled={continueDisabled}
            size="large"
            color="primary"
          >
            {formStep === SEND_RESULT
              ? "Done"
              : formStep === ENTER_DATA
              ? "Continue"
              : formData && formData.toCurrencyInfo
              ? formData.toCurrencyInfo.preConvert
                ? "Preconvert"
                : modalProps.isConversion
                ? "Convert"
                : "Send"
              : "Send"}
          </Button>
        </div>
      )}
    </div>
  );
}

export const SendCoinFormRender = function() {
  const { state, props, getFormData, getContinueDisabled } = this
  const { modalProps, closeModal } = props

  if (modalProps.fund)
    return (
      <FundForm
        {...modalProps}
        {...state}
        closeModal={closeModal}
        setFormData={getFormData}
        setContinueDisabled={getContinueDisabled}
      />
    );
  else {
    switch (modalProps.balanceTag) {
      case TRANSPARENT_BALANCE:
        return (
          <TraditionalSendForm
            {...modalProps}
            {...state}
            closeModal={closeModal}
            setFormData={getFormData}
            setContinueDisabled={getContinueDisabled}
          />
        );
      case INTEREST_BALANCE:
        return (
          <ClaimInterestForm
            {...modalProps}
            {...state}
            closeModal={closeModal}
            setFormData={getFormData}
            setContinueDisabled={getContinueDisabled}
          />
        );
      case PRIVATE_BALANCE:
        if (modalProps.isMessage)
          return (
            <MessageSendForm
              {...modalProps}
              {...state}
              closeModal={closeModal}
              setFormData={getFormData}
              setContinueDisabled={getContinueDisabled}
            />
          );
        else
          return (
            <TraditionalSendForm
              {...modalProps}
              {...state}
              closeModal={closeModal}
              setFormData={getFormData}
              setContinueDisabled={getContinueDisabled}
            />
          );
      case RESERVE_BALANCE:
        return (
          <ReserveSendForm
            {...modalProps}
            {...state}
            closeModal={closeModal}
            setFormData={getFormData}
            setContinueDisabled={getContinueDisabled}
          />
        );
    }

    return null;
  }
}

export const SendCoinRenderLoading = function() {
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


