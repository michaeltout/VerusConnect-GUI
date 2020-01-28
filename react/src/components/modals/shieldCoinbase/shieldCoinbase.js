import React from 'react';
import { connect } from 'react-redux';
import { 
  ShieldCoinbaseRender
} from './shieldCoinbase.render';
import {
  ENTER_DATA,
  API_SUCCESS,
  ERROR_SNACK,
  API_ERROR,
  CONFIRM_DATA,
  API_GET_TRANSACTIONS,
  API_GET_BALANCES,
  API_GET_ZOPERATIONSTATUSES,
  INFO_SNACK,
  SHIELDCOINBASE
} from "../../../util/constants/componentConstants";
import { shieldCoinbase } from '../../../util/api/wallet/walletCalls';
import { newSnackbar, expireData } from '../../../actions/actionCreators';

class ShieldCoinbase extends React.Component {
  constructor(props) {
    super(props);

    props.setModalHeader("Shield Coinbase Funds")
    this.state = {
      formStep: ENTER_DATA,
      txData: {},
      loading: false,
      loadingProgress: 0,
      formData: {},
      continueDisabled: true
    }

    this.advanceFormStep = this.advanceFormStep.bind(this)
    this.getFormData = this.getFormData.bind(this)
    this.back = this.back.bind(this)
    this.getContinueDisabled = this.getContinueDisabled.bind(this)
  }

  getFormData(formData) {    
    this.setState({ formData })
  }

  getContinueDisabled(continueDisabled) {
    this.setState({ continueDisabled })
  }

  back() {
    this.setState({
      formStep: ENTER_DATA,
      txData: {},
      formData: {}
    })
  }

  advanceFormStep() {
    const { formStep, formData } = this.state
    let _txData

    this.props.setModalLock(true)
    this.setState({ loading: true }, async () => {      
      try {
        const {
          chainTicker,
          toAddress,
          fromAddress
        } = formData;
  
        _txData = await shieldCoinbase(!formStep, chainTicker, toAddress, fromAddress);

        this.props.setModalLock(false);
        if (_txData.msg === API_SUCCESS) {
          if (formStep === CONFIRM_DATA) {
            this.props.dispatch(
              newSnackbar(
                INFO_SNACK,
                "Transaction posted! Track its status in the pending transaction log of your wallet."
              )
            );

            // Expire transactions and balances
            this.props.dispatch(expireData(chainTicker, API_GET_TRANSACTIONS));
            this.props.dispatch(expireData(chainTicker, API_GET_BALANCES));
            this.props.dispatch(expireData(chainTicker, API_GET_ZOPERATIONSTATUSES));
          }

          this.setState({
            loading: false,
            txData: { status: API_SUCCESS, ..._txData.result },
            formStep: formStep + 1
          });
        } else {
          throw new Error(_txData.result);
        }
      } catch (e) {
        this.props.setModalLock(false)
        if (formStep === ENTER_DATA) {
          this.props.dispatch(newSnackbar(ERROR_SNACK, e.message))
          this.setState({ loading: false })
        } else {
          this.setState({ loading: false, txData: {status: API_ERROR, error: e.message}, formStep: formStep + 1 })
        }
      }
    })
  }

  render() {
    return ShieldCoinbaseRender.call(this);
  }
}

const mapStateToProps = (state) => {
  const { chainTicker } = state.modal[SHIELDCOINBASE]

  return {
    activeCoin: state.coins.activatedCoins[chainTicker],
    balances: state.ledger.balances[chainTicker],
    addresses: state.ledger.addresses[chainTicker],
    modalProps: state.modal[SHIELDCOINBASE]
  };
};

export default connect(mapStateToProps)(ShieldCoinbase);