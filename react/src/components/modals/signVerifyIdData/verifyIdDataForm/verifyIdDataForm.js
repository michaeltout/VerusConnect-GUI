import React from 'react';
import { connect } from 'react-redux';
import { 
  VerifyIdDataFormRender
} from './verifyIdDataForm.render';
import {
  TXDATA_STATUS,
  TXDATA_ERROR,
  NATIVE,
  ERROR_INVALID_ADDR,
  SIGN_VERIFY_ID_DATA
} from "../../../../util/constants/componentConstants";
import { checkAddrValidity } from '../../../../util/addrUtils';

class VerifyIdDataForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      signature: '',
      message: '',
      fileName: '',
      isFile: false,
      formErrors: {
        address: [],
        signature: [],
        message: [],
        fileName: [],
      },
      verified: false
    }

    this.updateFormData = this.updateFormData.bind(this)
    //this.updateControlAddr = this.updateControlAddr.bind(this)
    this.setAndUpdateState = this.setAndUpdateState.bind(this)
    this.updateInput = this.updateInput.bind(this)
    this.updateFormErrors = this.updateFormErrors.bind(this)
    this.generateTxDataDisplay = this.generateTxDataDisplay.bind(this)
    this.setDataType = this.setDataType.bind(this)
    this.setFiles = this.setFiles.bind(this)
  }

  componentWillMount() {
    if (Object.keys(this.props.txData).length > 0) {
      this.generateTxDataDisplay()
    }
  }

  generateTxDataDisplay() {
    const { txData } = this.props
    
    this.setState({ verified: txData.result === true ? true : false })
  }

  updateFormErrors() {
    //TODO: Add more errors in here by checking controlAddr and referralId
    const { setContinueDisabled, activeCoin } = this.props
    const { address, signature, message, fileName, isFile } = this.state
    let formErrors = {
      address: [],
      signature: [],
      message: [],
      fileName: [],
    }

    if (address && address.length !== 0 && !checkAddrValidity(address, NATIVE, activeCoin.id)) {
      formErrors.address.push(ERROR_INVALID_ADDR)
    }  

    //TODO: filename, message and signature validation

    this.setState({ formErrors }, () => {
      setContinueDisabled(
        !Object.keys(this.state.formErrors).every(formInput => {
          return this.state.formErrors[formInput].length == 0;
        }) ||
          address.length === 0 ||
          signature.length === 0 ||
          (!isFile && message.length === 0) ||
          (isFile && fileName.length === 0)
      );
    })
  }

  setAndUpdateState(stateModifiers) {
    this.setState(stateModifiers, () => {
      this.updateFormErrors()
      this.updateFormData()
    })
  }

  updateInput(e) {
    this.setAndUpdateState({ [e.target.name]: e.target.value })
  }

  setFiles(files) {
    this.setAndUpdateState({ fileName: files.length > 0 ? files[0].path : '' })
  }

  setDataType(e) {
    if (e.target.value === 0) {
      this.setAndUpdateState({ isFile: false })
    } else {
      this.setAndUpdateState({ isFile: true })
    }
  }

  updateFormData() {
    const {
      address,
      signature,
      message,
      fileName,
      isFile
    } = this.state;

    this.props.setFormData({
      ...this.props.formData,
      address,
      signature,
      message,
      fileName,
      isFile
    });
  }

  render() {
    return VerifyIdDataFormRender.call(this);
  }
}

const mapStateToProps = (state) => {
  const { chainTicker } = state.modal[SIGN_VERIFY_ID_DATA]

  return {
    addresses: state.ledger.addresses,
    activeCoin: state.coins.activatedCoins[chainTicker],
  };
};

export default connect(mapStateToProps)(VerifyIdDataForm);