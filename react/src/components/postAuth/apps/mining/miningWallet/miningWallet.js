import React from 'react';
import { connect } from 'react-redux';
import { 
  MiningWalletRender,
} from './miningWallet.render';
import { setModalNavigationPath, setModalParams } from '../../../../../actions/actionCreators';
import { ADD_COIN, SELECT_COIN, API_GET_CURRENTSUPPLY, SHIELDCOINBASE } from '../../../../../util/constants/componentConstants';

class MiningWallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coinsMining: 0,
      coinsStaking: 0,
    }

    this.openShieldCoinbaseModal = this.openShieldCoinbaseModal.bind(this)
  }

  openAddCoinModal() {
    this.props.dispatch(setModalNavigationPath(`${ADD_COIN}/${SELECT_COIN}`))
  }

  openShieldCoinbaseModal() {
    this.props.dispatch(setModalParams(SHIELDCOINBASE, { chainTicker: this.props.coin }))
    this.props.dispatch(setModalNavigationPath(SHIELDCOINBASE))
  }

  render() {
    return MiningWalletRender.call(this);
  }
}

function mapStateToProps(state, ownProps) {
  const { coin } = ownProps

  return {
    coinObj: state.coins.activatedCoins[coin],
    balances: state.ledger.balances[coin],
    info: state.ledger.info[coin],
    addresses: state.ledger.addresses[coin],
    currentSupply: state.ledger.currentSupply[coin],
    cpuData: state.system.static ? state.system.static.cpu : {},
    currentSupplyError: state.errors[API_GET_CURRENTSUPPLY],
    blockReward: state.ledger.blockReward[coin],
    transactions: state.ledger.transactions[coin],
    fiatPrice: state.ledger.fiatPrices[coin],
    fiatCurrency: state.settings.config.general.main.fiatCurrency,
  };
};

export default connect(mapStateToProps)(MiningWallet);