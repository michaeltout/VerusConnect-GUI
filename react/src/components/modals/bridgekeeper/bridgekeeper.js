import React from 'react';
import { connect } from 'react-redux';
import { 
  BridgekeeperRender
} from './bridgekeeper.render';
import {
  ENTER_DATA,
  STARTBRIDGEKEEPER
} from "../../../util/constants/componentConstants";
import { startBridgekeeperprocess, stopBridgekeeperprocess } from '../../../util/api/verusbridge/verusbridge';


class Bridgekeeper extends React.Component {
  constructor(props) {
    super(props);

    props.setModalHeader("Start Verus BridgeKeeper")
    this.state = {
      formStep: ENTER_DATA,
      txData: {},
      loading: false,
      loadingProgress: 0,
      formData: {},
      continueDisabled: true
    }

    this.getFormData = this.getFormData.bind(this)
    this.back = this.back.bind(this)
    this.getContinueDisabled = this.getContinueDisabled.bind(this)
    this.startBridgekeeper = this.startBridgekeeper.bind(this)
    this.stopBridgekeeper = this.stopBridgekeeper.bind(this)
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

  async startBridgekeeper() {
    await startBridgekeeperprocess();
    
  }

  async stopBridgekeeper() {
    await stopBridgekeeperprocess();
    
  }

  render() {
    return BridgekeeperRender.call(this);
  }
}

const mapStateToProps = (state) => {
  const { chainTicker } = state.modal[STARTBRIDGEKEEPER]

  return {
    activeCoin: state.coins.activatedCoins[chainTicker],
    balances: state.ledger.balances[chainTicker],
    addresses: state.ledger.addresses[chainTicker],
    modalProps: state.modal[STARTBRIDGEKEEPER]
  };
};

export default connect(mapStateToProps)(Bridgekeeper);