import React from 'react';
import {
  LOGIN,
  SETUP,
  SIGN_UP
} from '../../../../util/constants/componentConstants'
import SignUp from './signUp/signUp'
import Setup from './setup/setup'
import Login from './login/login'

export const ConfigureLiteRender = function() {
  const COMPONENT_PROPS = {
    setModalHeader: this.props.setModalHeader,
    modalPathArray: this.props.modalPathArray,
    setModalLock: this.props.setModalLock,
    closeModal: this.props.closeModal,
    setAddCoinParams: this.props.getAddCoinParams,
    addCoinParams: this.props.addCoinParams,
    seed: this.state.seed,
    password: this.state.password,
    setSeed: this.getSeed,
    setPassword: this.getPassword,
    loading: this.state.loading,
    error: this.state.error,
    activateCoin: this.activateCoin
  }

  const COMPONENT_MAP = {
    [LOGIN]: (
      <Login
        {...COMPONENT_PROPS}
      />
    ),
    [SETUP]: (
      <Setup
        {...COMPONENT_PROPS}
      />
    ),
    [SIGN_UP]: (
      <SignUp
        {...COMPONENT_PROPS}
      />
    )
  };

  return (
    this.props.modalPathArray[3] ? COMPONENT_MAP[this.props.modalPathArray[3]] : null
  );
}


