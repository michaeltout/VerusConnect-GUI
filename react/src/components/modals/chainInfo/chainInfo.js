import React from 'react';
import { connect } from 'react-redux';
import { 
  ChainInfoRender
} from './chainInfo.render';
import { conditionallyUpdateWallet } from '../../../actions/actionDispatchers'
import Store from '../../../store'
import { API_GET_INFO, CHAIN_INFO } from "../../../util/constants/componentConstants";

class ChainInfo extends React.Component {
  constructor(props) {
    super(props);

    props.setModalHeader("Chain Info")
  }

  componentDidMount() {
    const stateSnapshot = Store.getState()
    const { dispatch, activeCoin } = this.props
    const { mode, id } = activeCoin

    conditionallyUpdateWallet(stateSnapshot, dispatch, mode, id, API_GET_INFO)
  }

  render() {
    return ChainInfoRender.call(this);
  }
}

const mapStateToProps = (state) => {
  const { chainTicker } = state.modal[CHAIN_INFO]

  return {
    activeCoin: state.coins.activatedCoins[chainTicker],
    info: state.ledger.info[chainTicker] ? state.ledger.info[chainTicker] : {}
  };
};

export default connect(mapStateToProps)(ChainInfo);