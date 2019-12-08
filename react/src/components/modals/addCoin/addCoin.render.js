import React from 'react';
import {
  SELECT_COIN,
  CONFIGURE_LITE,
  CONFIGURE_NATIVE
} from '../../../util/constants/componentConstants'
import ConfigureLite from './configureLite/configureLite'
import ConfigureNative from './configureNative/configureNative'
import SelectCoin from './selectCoin/selectCoin'

export const AddCoinRender = function() {
  const COMPONENT_PROPS = {
    setModalHeader: this.props.setModalHeader,
    modalPathArray: this.props.modalPathArray,
    setModalLock: this.props.setModalLock,
    closeModal: this.props.closeModal,
    setAddCoinParams: this.getAddCoinParams,
    addCoinParams: this.state.addCoinParams
  }

  const COMPONENT_MAP = {
    [CONFIGURE_LITE]: (
      <ConfigureLite
        {...COMPONENT_PROPS}
      />
    ),
    [CONFIGURE_NATIVE]: (
      <ConfigureNative
        {...COMPONENT_PROPS}
      />
    ),
    [SELECT_COIN]: (
      <SelectCoin
        {...COMPONENT_PROPS}
      />
    )
  };

  return (
    this.props.modalPathArray[1] ? COMPONENT_MAP[this.props.modalPathArray[1]] : null
  );
}


