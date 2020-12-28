import { Backdrop, CircularProgress } from '@material-ui/core';
import React from 'react';
import { CONVERSION_OVERVIEW } from '../../../util/constants/componentConstants';
import ConvertCurrencyForm from './convertCurrencyForm/convertCurrencyForm'
import * as animationData from '../../../assets/animations/radar.json'
import { Lottie } from '@crello/react-lottie';
import ConversionOverview from './conversionOverview/conversionOverview';

export const ConvertCurrencyRender = function() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      {this.state.loading ? (
        <div
          className=".animated .fadeIn .fadeOut"
          style={{
            backgroundColor: "rgb(28, 28, 28, 0.6)",
            width: 708,
            height: "100%",
            position: "absolute",
            zIndex: 2,
            marginLeft: -16,
            marginTop: -50,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          <Lottie
            config={{ animationData: animationData.default, loop: true }}
            height="40%"
            style={{
              marginBottom: -56,
              marginTop: -56,
            }}
          />
          {this.state.loadingText}
        </div>
      ) : null}
      {this.state.selectedMode === CONVERSION_OVERVIEW ? (
        <ConversionOverview />
      ) : (
        <ConvertCurrencyForm
          mode={this.state.selectedMode}
          setLoading={this.setLoading}
          initCurrency={this.state.initCleared ? null : this.props.modalProps.selectedCurrency}
          setSelectedMode={this.setSelectedMode}
          clearInitCurrency={this.clearInitCurrency}
        />
      )}
    </div>
  );
};