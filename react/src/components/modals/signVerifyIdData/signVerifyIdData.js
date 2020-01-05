import React from 'react';
import { connect } from 'react-redux';
import { 
  SignVerifyIdDataRender
} from './signVerifyIdData.render';
import {
  ENTER_DATA,
  API_SUCCESS,
  ERROR_SNACK,
  API_ERROR,
  SUCCESS_SNACK,
  VERIFY_ID_DATA,
  SIGN_ID_DATA,
  SIGN_VERIFY_ID_DATA,
  INFO_SNACK,
  MID_LENGTH_ALERT
} from "../../../util/constants/componentConstants";
import { signData, verifyData } from '../../../util/api/wallet/walletCalls';
import { newSnackbar } from '../../../actions/actionCreators';

class SignVerifyIdData extends React.Component {
  constructor(props) {
    super(props);

    switch (props.modalProps.modalType) {
      case VERIFY_ID_DATA:
        props.setModalHeader('Verify ID Signature')
        break;
      case SIGN_ID_DATA:
        props.setModalHeader(`Sign Data`)
        break;
      default:
        break;
    }

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
    const { modalProps, setModalLock } = this.props
    const { formStep, formData } = this.state
    let _txData

    setModalLock(true)
    this.setState({loading: true, loadingProgress: 99}, async () => {      
      try {
        const { 
          isFile,
          fileName,
          message,
          signature,
          address
        } = formData;
        const { chainTicker } = modalProps

        if (modalProps.modalType === VERIFY_ID_DATA) {
          _txData = await verifyData(
            chainTicker,
            address,
            isFile ? fileName : message,
            signature,
            isFile
          )
        } else if (modalProps.modalType === SIGN_ID_DATA) {
          _txData = await signData(
            chainTicker,
            address,
            isFile ? fileName : message,
            isFile
          )
        }
        
        this.props.setModalLock(false)
        if (_txData.msg === API_SUCCESS) {
          this.setState({ loadingProgress: 100 }, () => {
            if (modalProps.modalType === VERIFY_ID_DATA) {
              this.props.dispatch(
                newSnackbar(
                  INFO_SNACK,
                  `Signature check completed.`,
                  MID_LENGTH_ALERT
                )
              );
            } else if (modalProps.modalType === SIGN_ID_DATA) {
              this.props.dispatch(
                newSnackbar(
                  SUCCESS_SNACK,
                  `Data signed with ID!`,
                  MID_LENGTH_ALERT
                )
              );
            }

            this.setState({ loading: false, txData: {status: API_SUCCESS, result: _txData.result}, formStep: formStep + 1 })
          })
        } else {
          if (modalProps.modalType === VERIFY_ID_DATA) {
            this.props.dispatch(newSnackbar(ERROR_SNACK, "Error verifying ID signature."))
          } else if (modalProps.modalType === SIGN_ID_DATA) {
            this.props.dispatch(newSnackbar(ERROR_SNACK, "Error signing data."))
          } 

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
    return SignVerifyIdDataRender.call(this);
  }
}

const mapStateToProps = (state) => {
  const { chainTicker } = state.modal[SIGN_VERIFY_ID_DATA]

  return {
    activeCoin: state.coins.activatedCoins[chainTicker],
    balances: state.ledger.balances[chainTicker],
    addresses: state.ledger.addresses[chainTicker],
    modalProps: state.modal[SIGN_VERIFY_ID_DATA]
  };
};

export default connect(mapStateToProps)(SignVerifyIdData);