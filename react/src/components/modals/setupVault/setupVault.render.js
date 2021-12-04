import React from 'react';
import {
  CONFIGURE_TIMELOCK
} from '../../../util/constants/componentConstants'
import SetupTimelock from './setupTimelock/setupTimelock';

export const SetupVaultRender = function() {
  const COMPONENT_PROPS = {
    setModalHeader: this.props.setModalHeader,
    modalPathArray: this.props.modalPathArray,
    setModalLock: this.props.setModalLock,
    closeModal: this.props.closeModal,
    setSetupVaultParams: this.getSetupVaultParams,
    setupVaultParams: this.state.setupVaultParams,
    selectedLockType: this.state.selectedLockType,
    submit: this.submit
  }

  const COMPONENT_MAP = {
    [CONFIGURE_TIMELOCK]: (
      <SetupTimelock
        {...COMPONENT_PROPS}
      />
    ),
  };

  return (
    this.props.modalPathArray[2] ? COMPONENT_MAP[this.props.modalPathArray[2]] : null
  );
}


