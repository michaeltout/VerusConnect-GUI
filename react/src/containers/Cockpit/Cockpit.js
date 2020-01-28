import React, { useState, useEffect } from 'react';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import WalletPaper from '../WalletPaper/WalletPaper';
import Tachometer from '../Tachometer/Tachometer';
import { Slider } from '@material-ui/core';

function Cockpit(props) {
  const {
    containerStyle,
    children,
    leftTachProps,
    rightTachProps,
    slider,
    sliderProps,
    childContainerStyle,
    sliderLabel,
    leftTachLabel,
    rightTachLabel,
    dualTach,
    rightComponent,
    leftComponent
  } = props;

  return (
    <WalletPaper
      style={{ display: "flex", flexDirection: "column", ...containerStyle }}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        {leftComponent}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 10,
            flex: 1
          }}
        >
          <Tachometer style={{ paddingTop: 24 }} {...leftTachProps} />
          <div style={{ marginTop: -24 }}>{leftTachLabel}</div>
        </div>
        <WalletPaper
          style={{
            padding: 0,
            marginLeft: 16,
            marginRight: 16,
            minWidth: "50%",
            ...childContainerStyle
          }}
        >
          {children}
        </WalletPaper>
        {dualTach && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: 10,
              flex: 1
            }}
          >
            <Tachometer style={{ paddingTop: 24 }} {...rightTachProps} />
            <div style={{ marginTop: -24 }}>{rightTachLabel}</div>
          </div>
        )}
        {rightComponent}
      </div>
      {slider && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "95%",
            alignSelf: "center"
          }}
        >
          <Slider {...sliderProps} />
          {sliderLabel != null && (
            <div style={{ width: "100%" }}>{sliderLabel}</div>
          )}
        </div>
      )}
    </WalletPaper>
  );
}

Cockpit.propTypes = {
  style: PropTypes.object,
  label: PropTypes.string,
  labelStyle: PropTypes.object,
  containerStyle: PropTypes.object,
  childContainerStyle: PropTypes.object,
  leftTachProps: PropTypes.object,
  rightTachProps: PropTypes.object,
  slider: PropTypes.bool,
  sliderProps: PropTypes.object,
  sliderLabel: PropTypes.string,
  leftTachLabel: PropTypes.string,
  rightTachLabel: PropTypes.string,
  dualTach: PropTypes.bool,
  rightComponent: PropTypes.object,
  leftComponent: PropTypes.object
};

export default Cockpit