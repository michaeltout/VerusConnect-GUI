import React from 'react';
import { connect } from 'react-redux';
import { 
  SendCoinRender
} from './sendCoin.render';
import { SEND_COIN, ENTER_DATA, NATIVE, ETH, ELECTRUM, API_SUCCESS, ERROR_SNACK, API_ERROR, SUCCESS_SNACK, CONFIRM_DATA, API_GET_TRANSACTIONS, API_GET_BALANCES, API_GET_ZOPERATIONSTATUSES, Z_SEND, INFO_SNACK } from '../../../util/constants/componentConstants';
import { sendNative, sendEth, sendElectrum } from '../../../util/api/wallet/walletCalls';
import { newSnackbar, expireData } from '../../../actions/actionCreators';

class SendCoin extends React.Component {
  constructor(props) {
    super(props);

    props.setModalHeader("Send Coin")
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
    const { mode } = this.props.activeCoin
    const { formStep, formData, loadingProgress } = this.state
    let _txData

    this.props.setModalLock(true)
    this.setState({loading: true, loadingProgress: 75}, async () => {      
      // Fake loading
      const loadingTickInterval = setInterval(() => {
        this.setState({ loadingProgress: loadingProgress + ((99 - loadingProgress) / (Math.random() * (9 - 8) + 9)) })
      }, 500)

      try {
        const {
          chainTicker,
          toAddress,
          amount,
          balance,
          fromAddress,
          customFee,
          memo,
          toChain,
          toNative,
          toReserve,
          preConvert,
          lastPriceInRoot,
          btcFee
        } = formData;
  
        switch (mode) {
          case NATIVE:
            _txData = await sendNative(
              !formStep,
              chainTicker,
              toAddress,
              Number(amount),
              Number(balance),
              fromAddress,
              Number(customFee),
              memo,
              toChain,
              toNative,
              toReserve,
              preConvert,
              lastPriceInRoot
            );
            break;
          case ETH:  
            _txData = await sendEth(!formStep, chainTicker, toAddress, Number(amount));
            break;
          case ELECTRUM:  
            _txData = await sendElectrum(
              !formStep,
              chainTicker,
              toAddress,
              Number(amount),
              Number(customFee),
              Number(btcFee)
            );
            break;
        }
  
        clearInterval(loadingTickInterval)
        this.props.setModalLock(false)
        if (_txData.msg === API_SUCCESS) {
          this.setState({ loadingProgress: 100 }, () => {
            if (formStep === CONFIRM_DATA) {
              if (_txData.result.cliCmd === Z_SEND) {
                this.props.dispatch(newSnackbar(INFO_SNACK, "Transaction posted! Track its status in the pending transaction log of your wallet."))
              } else {
                this.props.dispatch(newSnackbar(SUCCESS_SNACK, "Transaction sent successfully!"))
              }
              

              // Expire transactions and balances
              this.props.dispatch(expireData(chainTicker, API_GET_TRANSACTIONS))
              this.props.dispatch(expireData(chainTicker, API_GET_BALANCES))
              this.props.dispatch(expireData(chainTicker, API_GET_ZOPERATIONSTATUSES))
            }

            this.setState({ loading: false, txData: {status: API_SUCCESS, ..._txData.result}, formStep: formStep + 1 })
          })
        } else {
          throw new Error(_txData.result)
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
    return SendCoinRender.call(this);
  }
}

const mapStateToProps = (state) => {
  const { chainTicker } = state.modal[SEND_COIN]

  return {
    activeCoin: state.coins.activatedCoins[chainTicker],
    balances: state.ledger.balances[chainTicker],
    addresses: state.ledger.addresses[chainTicker],
    modalProps: state.modal[SEND_COIN]
  };
};

export default connect(mapStateToProps)(SendCoin);