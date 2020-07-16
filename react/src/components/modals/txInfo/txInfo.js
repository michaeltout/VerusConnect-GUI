import React from 'react';
import { connect } from 'react-redux';
import { 
  TxInfoRender,
  ExplorerButtonRender,
} from './txInfo.render';
import {
  TX_INFO,
  TX_MESSAGE,
  GENERAL_INFO,
  RAW_TX,
  TX_HEX,
  TX_EXPLORER
} from "../../../util/constants/componentConstants";
import { decodeMemo } from '../../../util/txUtils/zTxUtils';
const { shell } = window.require('electron');

class TxInfo extends React.Component {
  constructor(props) {
    super(props);
    props.setModalHeader("Transaction Info")
    this.modalObj = this.generateTxInfo(props)

    this.state = {
      activeTab: GENERAL_INFO
    }

    this.setActiveTab = this.setActiveTab.bind(this)
    this.openExplorerWindow = this.openExplorerWindow.bind(this)
  }

  setActiveTab(activeTab) {
    if (activeTab === TX_EXPLORER) this.openExplorerWindow()
    else this.setState({ activeTab })
  }

  openExplorerWindow = () => {
    const { explorerUrl, txObj } = this.props
    const { txid } = txObj
    let url;

    if (explorerUrl.includes('/tx/') || explorerUrl.split('/').length - 1 > 2) {
      url = `${explorerUrl}${txid}`;
    } else {
      url = `${explorerUrl}/tx/${txid}`;
    }

    shell.openExternal(url);
  }

  // To be called from constructor
  generateTxInfo(props) {
    const { txObj, info, displayTx } = props
    const {
      txid,
      address,
      amount,
      blocktime,
      confirmations,
      height,
      timestamp,
      type,
      memo,
      hex,
      time,
      category
    } = txObj;
    const { displayAddress } = displayTx

    const genInfo = {
      txid,
      type: type ? type : category,
      address: displayAddress,
      amount,
      confirmations,
      blocktime,
      timestamp: timestamp ? timestamp : time,
      height: height ? height : (info.longestchain ? info.longestchain - confirmations : null),
    }

    //TODO: Integrate this securely, objectToTable turns everything to string for security reasons
    //if (explorerUrl) genInfo.explorer = ExplorerButtonRender.call(this)

    return {
      [GENERAL_INFO]: genInfo, 
      [TX_HEX]: hex,
      [TX_MESSAGE]: memo ? decodeMemo(memo.toString()) : memo,
      [RAW_TX]: JSON.stringify(txObj)
    }
  }

  render() {
    return TxInfoRender.call(this);
  }
}

const mapStateToProps = (state) => {
  const { chainTicker } = state.modal[TX_INFO]

  return {
    txObj: state.modal[TX_INFO].txObj ? state.modal[TX_INFO].txObj : {},
    info: state.ledger.info[chainTicker] ? state.ledger.info[chainTicker] : {},
    explorerUrl: state.coins.activatedCoins[chainTicker].options.explorer,
    displayTx: state.modal[TX_INFO].displayTx ? state.modal[TX_INFO].displayTx : {},
  };
};

export default connect(mapStateToProps)(TxInfo);