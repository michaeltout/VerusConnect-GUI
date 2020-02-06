import React from 'react';
import { connect } from 'react-redux';
import { 
  ShieldCoinbaseFormRender
} from './shieldCoinbaseForm.render';
import { checkAddrValidity } from '../../../../util/addrUtils';
import {
  PRIVATE_ADDRS,
  PUBLIC_ADDRS,
  ERROR_INVALID_ADDR,
  TXDATA_TO,
  TXDATA_FROM,
  TXDATA_FEE,
  TXDATA_ERROR,
  CONFIRM_DATA,
  ALL_UNSHIELDED_FUNDS,
  TXDATA_OPID,
  TXDATA_SHIELDVAL,
  TXDATA_REMAININGVAL,
  SHIELDCOINBASE,
  TXDATA_TOADDR,
  TXDATA_FROMADDR,
  ENTER_DATA
} from "../../../../util/constants/componentConstants";

class ShieldCoinbaseForm extends React.Component {
  constructor(props) {
    super(props);    
    const { chainTicker } = props
    const addresses = this.isIdentity ? props.identity.addresses : props.addresses[chainTicker]
    const unshieldAll = {
      label: ALL_UNSHIELDED_FUNDS,
      address: null
    }
    let fromAddrOptions = []
    let toAddrOptions = []
    const addrTypes = [PRIVATE_ADDRS, PUBLIC_ADDRS]

    addrTypes.map(addrType => {
      addresses[addrType].forEach(addressObj => {
        if (addrType === PRIVATE_ADDRS) toAddrOptions.push(addressObj.address);
        else if (addressObj.balances.native > 0) {
          fromAddrOptions.push({
            label: `${addressObj.address} (${addressObj.balances.native} ${chainTicker})`,
            address: addressObj.address,
            balance: addressObj.balances.native
          });
        }
      });
    });
    
    fromAddrOptions.unshift(unshieldAll)
    
    this.state = {
      sendFrom: unshieldAll,
      sendTo: null,
      fromAddrOptions,
      toAddrOptions,
      formErrors: {
        sendFrom: [],
        sendTo: []
      },
      txDataDisplay: {}
    };

    this.updateFormData = this.updateFormData.bind(this)
    this.updateSendFrom = this.updateSendFrom.bind(this)
    this.updateSendTo = this.updateSendTo.bind(this)
    this.setAndUpdateState = this.setAndUpdateState.bind(this)
    this.updateInput = this.updateInput.bind(this)
    this.updateFormErrors = this.updateFormErrors.bind(this)
    this.generateTxDataDisplay = this.generateTxDataDisplay.bind(this)
  }

  componentWillMount() {
    if (Object.keys(this.props.txData).length > 0) {
      this.generateTxDataDisplay()
    }
  }

  updateSendFrom(value) {
    this.setAndUpdateState({ sendFrom: value })
  }

  updateSendTo(value) {
    this.setAndUpdateState({ sendTo: value })
  }

  componentDidUpdate(lastProps) {
    const { formStep } = this.props
    
    if (lastProps.formStep !== formStep && formStep === ENTER_DATA) {
      this.updateFormErrors()
      this.updateFormData()
    }
  }

  generateTxDataDisplay() {
    const { txData, formStep } = this.props

    let txDataSchema = {
      ["Status:"]:
        formStep === CONFIRM_DATA
          ? null
          : "pending",
      ["Error:"]: txData[TXDATA_ERROR],
      ["Operation ID:"]: txData[TXDATA_OPID],
      ["From:"]: txData[TXDATA_FROMADDR] == null ? "All unshielded funds" : txData[TXDATA_FROMADDR],
      ["To:"]: txData[TXDATA_TOADDR],
      ["Amount Shielded:"]: txData[TXDATA_SHIELDVAL],
      ["Amount Left Unshielded:"]: txData[TXDATA_REMAININGVAL],
      ["Fee:"]: txData[TXDATA_FEE],
    };

    Object.keys(txDataSchema).forEach(txDataKey => {
      if (txDataSchema[txDataKey] == null) delete txDataSchema[txDataKey]
    })

    this.setState({ txDataDisplay: txDataSchema })
  }

  updateFormErrors() {
    const { chainTicker, activeCoin, setContinueDisabled } = this.props
    const { sendTo } = this.state
    const { mode } = activeCoin
    let formErrors = {
      sendFrom: [],
      sendTo: []
    }

    if (sendTo != null && (sendTo.length !== 0 && !checkAddrValidity(sendTo, mode, chainTicker))) {
      formErrors.sendTo.push(ERROR_INVALID_ADDR)
    }

    this.setState({ formErrors }, () => {
      setContinueDisabled(!Object.keys(this.state.formErrors).every((formInput) => {
        return (this.state.formErrors[formInput].length == 0)
      }) || sendTo == null || sendTo.length === 0)
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

  updateFormData() {
    const { chainTicker } = this.props
    const { sendTo, sendFrom } = this.state

    this.props.setFormData({
      chainTicker,
      toAddress: sendTo,
      fromAddress: sendFrom ? sendFrom.address : null,
    })
  }

  render() {
    return ShieldCoinbaseFormRender.call(this);
  }
}

const mapStateToProps = (state) => {
  const { chainTicker } = state.modal[SHIELDCOINBASE]

  return {
    addresses: state.ledger.addresses,
    activeCoin: state.coins.activatedCoins[chainTicker],
  };
};

export default connect(mapStateToProps)(ShieldCoinbaseForm);