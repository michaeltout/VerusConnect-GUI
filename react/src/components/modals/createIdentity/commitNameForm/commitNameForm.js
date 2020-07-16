import React from 'react';
import { connect } from 'react-redux';
import { 
  CommitNameFormRender
} from './commitNameForm.render';
import {
  PUBLIC_ADDRS,
  WARNING_SNACK,
  TXDATA_STATUS,
  TXDATA_ERROR,
  TXDATA_TXID,
  CONFIRM_DATA,
  CREATE_IDENTITY,
  ERROR_NAME_REQUIRED,
  ERROR_INVALID_ID,
  ENTER_DATA,
  LONG_ALERT
} from "../../../../util/constants/componentConstants";
import { newSnackbar } from '../../../../actions/actionCreators';

class CommitNameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      referralId: '',
      formErrors: {
        referralId: [],
        name: []
      },
      txDataDisplay: {}
    }

    this.updateFormData = this.updateFormData.bind(this)
    this.setAndUpdateState = this.setAndUpdateState.bind(this)
    this.updateInput = this.updateInput.bind(this)
    this.updateFormErrors = this.updateFormErrors.bind(this)
    this.generateTxDataDisplay = this.generateTxDataDisplay.bind(this)
  }

  componentDidMount() {
    if (Object.keys(this.props.txData).length > 0) {
      this.generateTxDataDisplay()
    }

    if (this.props.commitmentData != null) {
      const { name, referralId } = this.props.commitmentData

      this.setAndUpdateState({ name, referralId: referralId == null ? '' : referralId })
    }
  }

  componentDidUpdate(lastProps) {
    const { formStep, setContinueDisabled } = this.props
    
    if (lastProps.formStep !== formStep && formStep === ENTER_DATA) {
      setContinueDisabled(true)
      this.updateFormData()
    }
  }

  generateWarningSnack(warnings) {    
    this.props.dispatch(newSnackbar(WARNING_SNACK, warnings[0].message, LONG_ALERT))
  }

  generateTxDataDisplay() {
    const { txData, formStep } = this.props

    const { namereservation, controlAddress } = txData

    let txDataSchema = {
      ["Status:"]: formStep === CONFIRM_DATA ? null : txData[TXDATA_STATUS],
      ["Error:"]: txData[TXDATA_ERROR],
      ["Chain:"]: txData.coin,
      ["Transaction ID:"]: txData[TXDATA_TXID],
      ["Control Address:"]: controlAddress,
      ["Name:"]: namereservation ? namereservation.name : null,
      ["Referral ID:"]: namereservation && namereservation.referral && namereservation.referral.length > 0 ? namereservation.referral : null,
      ["Name Address:"]: namereservation ? namereservation.nameid : null
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
    //TODO: Add more errors in here by checking referralId
    const { setContinueDisabled } = this.props
    const { referralId, name } = this.state
    let formErrors = {
      referralId: [],
      name: []
    }

    if (name != null && name.length == 0) {
      formErrors.name.push(ERROR_NAME_REQUIRED)
    }  

    if (referralId != null && referralId.length > 0 && referralId[referralId.length - 1] !== '@' && referralId[0] !== 'i') {
      formErrors.referralId.push(ERROR_INVALID_ID)
    }

    this.setState({ formErrors }, () => {
      setContinueDisabled(!Object.keys(this.state.formErrors).every((formInput) => {
        return (this.state.formErrors[formInput].length == 0)
      }) || name.length === 0)
    })
  }

  setAndUpdateState(stateModifiers) {
    this.setState(stateModifiers, () => {
      this.updateFormErrors()
      this.updateFormData()
    })
  }

  updateInput(e, value = false) {
    this.setAndUpdateState({ [e.target.name]: value === false ? e.target.value : (value == null ? '' : value)})
  }

  updateFormData() {
    const { chainTicker } = this.props
    const { name, referralId } = this.state

    this.props.setFormData({
      chainTicker,
      name,
      referralId
    })
  }

  render() {
    return CommitNameFormRender.call(this);
  }
}

const mapStateToProps = (state) => {
  const { chainTicker } = state.modal[CREATE_IDENTITY]

  return {
    addresses: state.ledger.addresses,
    activeCoin: state.coins.activatedCoins[chainTicker],
    identities: state.ledger.identities[chainTicker]
  };
};

export default connect(mapStateToProps)(CommitNameForm);