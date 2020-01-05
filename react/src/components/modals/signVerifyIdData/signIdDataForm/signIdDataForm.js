import React from 'react';
import { connect } from 'react-redux';
import { 
  SignIdDataFormRender
} from './signIdDataForm.render';
import {
  TXDATA_STATUS,
  TXDATA_ERROR,
  NATIVE,
  ERROR_INVALID_ADDR,
  SIGN_VERIFY_ID_DATA
} from "../../../../util/constants/componentConstants";
import { checkAddrValidity } from '../../../../util/addrUtils';

// TODO: Add support for cursig

class SignIdDataForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      message: '',
      fileName: '',
      isFile: false,
      formErrors: {
        address: [],
        message: [],
        fileName: [],
      },
      txDataDisplay: false
    }

    this.updateFormData = this.updateFormData.bind(this)
    //this.updateControlAddr = this.updateControlAddr.bind(this)
    this.setAndUpdateState = this.setAndUpdateState.bind(this)
    this.updateInput = this.updateInput.bind(this)
    this.updateFormErrors = this.updateFormErrors.bind(this)
    this.generateTxDataDisplay = this.generateTxDataDisplay.bind(this)
    this.setDataType = this.setDataType.bind(this)
    this.setFiles = this.setFiles.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
  }

  componentWillMount() {
    if (Object.keys(this.props.txData).length > 0) {
      this.generateTxDataDisplay()
    }
  }

  generateTxDataDisplay() {
    const { txData, formData } = this.props

    let txDataSchema = {
      ["Status:"]: txData[TXDATA_STATUS],
      ["Error:"]: txData[TXDATA_ERROR],
      ["Data Signed:"]: formData.isFile ? formData.fileName : formData.message,
      ["Signature:"]: txData.result
    };

    Object.keys(txDataSchema).forEach(txDataKey => {
      if (txDataSchema[txDataKey] == null) delete txDataSchema[txDataKey]
    })

    this.setState({ txDataDisplay: txDataSchema })
  }

  updateFormErrors() {
    //TODO: Add more errors in here by checking controlAddr and referralId
    const { setContinueDisabled, activeCoin } = this.props
    const { address, message, fileName, isFile } = this.state
    let formErrors = {
      address: [],
      message: [],
      fileName: [],
    }

    if (address && address.length !== 0 && !checkAddrValidity(address, NATIVE, activeCoin.id)) {
      formErrors.address.push(ERROR_INVALID_ADDR)
    }  

    //TODO: filename, message validation

    this.setState({ formErrors }, () => {
      setContinueDisabled(
        !Object.keys(this.state.formErrors).every(formInput => {
          return this.state.formErrors[formInput].length == 0;
        }) ||
          address.length === 0 ||
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

  updateAddress(address) {
    console.log(address)

    this.setAndUpdateState({ address })
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
      message,
      fileName,
      isFile
    } = this.state;

    this.props.setFormData({
      ...this.props.formData,
      address,
      message,
      fileName,
      isFile
    });
  }

  render() {
    return SignIdDataFormRender.call(this);
  }
}

const mapStateToProps = (state) => {
  const { chainTicker } = state.modal[SIGN_VERIFY_ID_DATA]

  return {
    addresses: state.ledger.addresses,
    activeCoin: state.coins.activatedCoins[chainTicker],
    identities: state.ledger.identities[chainTicker]
  };
};

export default connect(mapStateToProps)(SignIdDataForm);