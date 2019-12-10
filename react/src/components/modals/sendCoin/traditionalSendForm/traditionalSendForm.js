import React from 'react';
import { connect } from 'react-redux';
import { 
  TraditionalSendFormRender
} from './traditionalSendForm.render';
import { checkAddrValidity } from '../../../../util/addrUtils';
import {
  PRIVATE_BALANCE,
  PRIVATE_ADDRS,
  PUBLIC_ADDRS,
  TRANSPARENT_FUNDS,
  ERROR_INVALID_AMOUNT,
  ERROR_AMOUNT_MORE_THAN_BALANCE,
  ERROR_INVALID_ADDR,
  ERROR_Z_AND_NO_FROM,
  SEND_COIN,
  WARNING_SNACK,
  NATIVE,
  TXDATA_TO,
  TXDATA_FROM,
  TXDATA_VALUE,
  TXDATA_FEE,
  TXDATA_TOTAL_AMOUNT,
  TXDATA_BALANCE,
  TXDATA_REMAINING_BALANCE,
  TXDATA_STATUS,
  TXDATA_ERROR,
  TXDATA_TXID,
  CONFIRM_DATA,
  Z_SEND,
  API_SUCCESS
} from "../../../../util/constants/componentConstants";
import { newSnackbar } from '../../../../actions/actionCreators';

class TraditionalSendForm extends React.Component {
  constructor(props) {
    super(props);

    const { addresses, balanceTag, chainTicker, balance, activeCoin } = props
    const { mode } = activeCoin
    const transparentFundsObj = {
      label: `${TRANSPARENT_FUNDS} (${balance} ${chainTicker})`,
      address: null,
      balance
    }

    const initAddresslist = () => {
      let addressList = addresses[chainTicker][balanceTag === PRIVATE_BALANCE ? PRIVATE_ADDRS : PUBLIC_ADDRS].map(addressObj => {
        return {
          label: `${addressObj.address} (${addressObj.balances.native} ${chainTicker})`,
          address: addressObj.address,
          balance: addressObj.balances.native
        }
      })

      if (mode === NATIVE && balanceTag !== PRIVATE_BALANCE) {
        addressList.unshift(transparentFundsObj)
      }

      return addressList
    }

    const addressListFormatted = initAddresslist()
    
    this.state = {
      sendFrom: mode === NATIVE && balanceTag !== PRIVATE_BALANCE ? transparentFundsObj : addressListFormatted[0],
      sendTo: '',
      amount: '',
      memo: '',
      addressList: addressListFormatted,
      formErrors: {
        amount: [],
        sendFrom: [],
        sendTo: []
      },
      txDataDisplay: {}
    }

    this.updateFormData = this.updateFormData.bind(this)
    this.updateSendFrom = this.updateSendFrom.bind(this)
    this.setAndUpdateState = this.setAndUpdateState.bind(this)
    this.updateInput = this.updateInput.bind(this)
    this.updateFormErrors = this.updateFormErrors.bind(this)
    this.generateTxDataDisplay = this.generateTxDataDisplay.bind(this)
    this.setSendAmountAll = this.setSendAmountAll.bind(this)
  }

  componentWillMount() {
    if (Object.keys(this.props.txData).length > 0) {
      this.generateTxDataDisplay()
    }
  }

  updateSendFrom(value) {
    this.setAndUpdateState({ sendFrom: value })
  }

  generateWarningSnack(warnings) {    
    this.props.dispatch(newSnackbar(WARNING_SNACK, warnings[0].message))
  }

  setSendAmountAll() {
    this.setAndUpdateState({ amount: this.state.sendFrom.balance })
  }

  generateTxDataDisplay() {
    const { txData, formData, formStep } = this.props

    //DELET
    console.log("TX DATA")
    console.log(txData)

    let txDataSchema = {
      ["Status:"]:
        formStep === CONFIRM_DATA
          ? null
          : txData.cliCmd === Z_SEND && txData[TXDATA_STATUS] === API_SUCCESS
          ? "pending"
          : txData[TXDATA_STATUS],
      ["Error:"]: txData[TXDATA_ERROR],
      [txData.cliCmd === Z_SEND ? "Operation ID:" : "Transaction ID:"]: txData[
        TXDATA_TXID
      ],
      ["To:"]: txData[TXDATA_TO],
      ["From:"]: txData[TXDATA_FROM],
      ["Amount Entered"]: txData[TXDATA_ERROR] ? null : formData.amount,
      ["Transaction Amount:"]: txData[TXDATA_VALUE],
      ["Fee:"]: txData[TXDATA_FEE],
      ["Total to be Deducted:"]: txData[TXDATA_TOTAL_AMOUNT],
      ["Current Balance:"]: txData[TXDATA_BALANCE],
      ["Est. Balance After Transaction:"]: txData[TXDATA_REMAINING_BALANCE]
    };

    Object.keys(txDataSchema).forEach(txDataKey => {
      if (txDataSchema[txDataKey] == null) delete txDataSchema[txDataKey]
    })

    if (formStep === CONFIRM_DATA && txData.warnings && txData.warnings.length > 0) {
      this.generateWarningSnack(txData.warnings)
    }

    //DELET
    console.log(txDataSchema)

    //TODO: TEST ETH AND NATIVE

    this.setState({ txDataDisplay: txDataSchema })
  }

  updateFormErrors() {
    const { chainTicker, activeCoin, setContinueDisabled } = this.props
    const { amount, sendFrom, sendTo } = this.state
    const { mode } = activeCoin
    let formErrors = {
      amount: [],
      sendFrom: [],
      sendTo: []
    }

    if (amount == null || (amount.length !== 0 && (isNaN(amount) || Number(amount) < 0 || amount.length === 0))) {
      formErrors.amount.push(ERROR_INVALID_AMOUNT)
    } else if (sendFrom.balance < amount) {
      formErrors.amount.push(ERROR_AMOUNT_MORE_THAN_BALANCE)
    }

    if (sendTo == null || (sendTo.length !== 0 && !checkAddrValidity(sendTo, mode, chainTicker))) {
      formErrors.sendTo.push(ERROR_INVALID_ADDR)
    }  
    
    if ((sendTo[0] === 'z' && (sendTo.length === 95 || sendTo.length === 78)) && !sendFrom.address) {
      formErrors.sendFrom.push(ERROR_Z_AND_NO_FROM)
    }

    this.setState({ formErrors }, () => {
      setContinueDisabled(!Object.keys(this.state.formErrors).every((formInput) => {
        return (this.state.formErrors[formInput].length == 0)
      }) || amount.length === 0 || sendTo.length === 0)
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
    const { sendTo, sendFrom, amount, memo } = this.state

    this.props.setFormData({
      chainTicker,
      toAddress: sendTo,
      amount,
      balance: sendFrom ? sendFrom.balance : 0,
      fromAddress: sendFrom ? sendFrom.address : null,
      memo,
    })
  }

  render() {
    return TraditionalSendFormRender.call(this);
  }
}

const mapStateToProps = (state) => {
  const { chainTicker } = state.modal[SEND_COIN]

  return {
    addresses: state.ledger.addresses,
    activeCoin: state.coins.activatedCoins[chainTicker],
  };
};

export default connect(mapStateToProps)(TraditionalSendForm);