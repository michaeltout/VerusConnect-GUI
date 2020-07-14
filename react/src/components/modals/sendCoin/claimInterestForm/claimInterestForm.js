import React from 'react';
import { connect } from 'react-redux';
import { 
  ClaimInterestFormRender
} from './claimInterestForm.render';
import { checkAddrValidity } from '../../../../util/addrUtils';
import {
  PUBLIC_ADDRS,
  SEND_COIN,
  WARNING_SNACK,
  TXDATA_TO,
  TXDATA_FEE,
  TXDATA_TOTAL_AMOUNT,
  TXDATA_REMAINING_BALANCE,
  TXDATA_STATUS,
  TXDATA_ERROR,
  TXDATA_TXID,
  CONFIRM_DATA,
  CONFIRMED_TRANSPARENT_FUNDS,
  TXDATA_INTEREST,
  ENTER_DATA,
  LONG_ALERT
} from "../../../../util/constants/componentConstants";
import { newSnackbar } from '../../../../actions/actionCreators';

class ClaimInterestForm extends React.Component {
  constructor(props) {
    super(props);
    const { chainTicker } = props
    const addresses = props.addresses[chainTicker]

    const initAddresslist = () => {
      let addressList = addresses[PUBLIC_ADDRS].map(addressObj => {
        return {
          label: `${addressObj.address} (${addressObj.balances.native} ${chainTicker})`,
          address: addressObj.address,
          balance: addressObj.balances.native
        }
      })

      return addressList
    }

    const addressListFormatted = initAddresslist()
    
    this.state = {
      sendTo: addressListFormatted[0],
      addressList: addressListFormatted,
      formErrors: {
        sendTo: []
      },
      txDataDisplay: {}
    };

    this.updateFormData = this.updateFormData.bind(this)
    this.updateSendTo = this.updateSendTo.bind(this)
    this.setAndUpdateState = this.setAndUpdateState.bind(this)
    this.updateFormErrors = this.updateFormErrors.bind(this)
    this.generateTxDataDisplay = this.generateTxDataDisplay.bind(this)
  }

  componentWillMount() {
    if (Object.keys(this.props.txData).length > 0) {
      this.generateTxDataDisplay()
    }
  }

  componentDidMount() {
    if (this.props.formStep === ENTER_DATA) {
      this.updateFormData()
      this.updateFormErrors()
    }
  }

  componentDidUpdate(lastProps) {
    const { formStep } = this.props
    
    if (formStep !== lastProps.formStep && formStep === ENTER_DATA) {
      this.updateFormData()
      this.updateFormErrors()
    }
  }

  updateSendTo(value) {
    this.setAndUpdateState({ sendTo: value })
  }

  generateWarningSnack(warnings) {    
    this.props.dispatch(newSnackbar(WARNING_SNACK, warnings[0].message, LONG_ALERT))
  }

  generateTxDataDisplay() {
    const { txData, formData, formStep } = this.props

    let txDataSchema = {
      ["Status:"]: formStep === CONFIRM_DATA ? null : txData[TXDATA_STATUS],
      ["Error:"]: txData[TXDATA_ERROR],
      ["Transaction ID:"]: txData[TXDATA_TXID],
      ["To:"]: txData[TXDATA_TO],
      ["From:"]: txData[TXDATA_ERROR] ? null : CONFIRMED_TRANSPARENT_FUNDS,
      ["Amount"]: txData[TXDATA_ERROR] ? null : formData.amount,
      ["Fee:"]: txData[TXDATA_FEE],
      [formStep === CONFIRM_DATA
        ? "Interest to Claim:"
        : "Interest Claimed:"]: txData[TXDATA_INTEREST],
      ["Est. Balance After Transaction:"]:
        txData[TXDATA_REMAINING_BALANCE] != null &&
        txData[TXDATA_TOTAL_AMOUNT] != null
          ? (
              Number(txData[TXDATA_REMAINING_BALANCE]) +
              Number(txData[TXDATA_TOTAL_AMOUNT])
            ).toFixed(8)
          : null
    };

    Object.keys(txDataSchema).forEach(txDataKey => {
      if (txDataSchema[txDataKey] == null) delete txDataSchema[txDataKey]
    })

    if (formStep === CONFIRM_DATA && txData.warnings && txData.warnings.length > 0) {
      this.generateWarningSnack(txData.warnings)
    }

    this.setState({ txDataDisplay: txDataSchema })
  }

  updateFormErrors() {
    const { setContinueDisabled } = this.props
    const { sendTo } = this.state
    let formErrors = {
      sendTo: []
    }

    // TODO: Implement more features and add form errors

    this.setState({ formErrors }, () => {
      setContinueDisabled(!Object.keys(this.state.formErrors).every((formInput) => {
        return (this.state.formErrors[formInput].length == 0)
      }) || sendTo == null)
    })
  }

  setAndUpdateState(stateModifiers) {
    this.setState(stateModifiers, () => {
      this.updateFormErrors()
      this.updateFormData()
    })
  }

  updateFormData() {
    const { chainTicker, balance } = this.props
    const { sendTo } = this.state

    this.props.setFormData({
      chainTicker,
      toAddress: sendTo.address,
      amount: balance.native.public.confirmed
    })
  }

  render() {
    return ClaimInterestFormRender.call(this);
  }
}

const mapStateToProps = (state) => {
  const { chainTicker } = state.modal[SEND_COIN]

  return {
    addresses: state.ledger.addresses,
    activeCoin: state.coins.activatedCoins[chainTicker],
    balance: state.ledger.balances[chainTicker]
  };
};

export default connect(mapStateToProps)(ClaimInterestForm);