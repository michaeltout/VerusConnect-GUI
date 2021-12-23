import React from 'react';
import { 
  ImportWalletRender,
} from './importWallet.render';
import { connect } from 'react-redux';
import { importWallet } from '../../../util/api/wallet/walletCalls';
import { newSnackbar } from '../../../actions/actionCreators';
import { ERROR_SNACK, MID_LENGTH_ALERT, SUCCESS_SNACK, WALLET_IMPORT } from '../../../util/constants/componentConstants';

class ImportWallet extends React.Component {
  constructor(props) {
    super(props);
    props.setModalHeader("Import Wallet Backup")

    this.state = {
      filename: null,
      loading: false
    }

    this.importWallet = this.importWallet.bind(this)
    this.setFilename = this.setFilename.bind(this)
  }

  setFilename(event) {    
    this.setState({ filename: event.target.files.length > 0 ? event.target.files[0].path : "" });
  }

  importWallet() {
    this.props.setModalLock(true)

    this.setState({ loading: true }, async () => {
      try {
        const res = await importWallet(this.props.mode, this.props.chainTicker, this.state.filename)

        if (res.msg === 'success') {
          this.props.dispatch(newSnackbar(SUCCESS_SNACK, `Import successful!`, MID_LENGTH_ALERT))
        } else {
          this.props.dispatch(newSnackbar(ERROR_SNACK, res.result))
        }

        this.props.setModalLock(false)
        this.props.closeModal()
        this.setState({ loading: false })
      } catch(e) {
        this.props.setModalLock(false)
        this.setState({ loading: false })
        this.props.dispatch(newSnackbar(ERROR_SNACK, e.message))
        console.error(e)
      }
    })
    
  }

  render() {
    return ImportWalletRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    chainTicker: state.modal[WALLET_IMPORT].chainTicker ? state.modal[WALLET_IMPORT].chainTicker : null,
    mode: state.modal[WALLET_IMPORT].mode ? state.modal[WALLET_IMPORT].mode : null,
  };
};

export default connect(mapStateToProps)(ImportWallet);