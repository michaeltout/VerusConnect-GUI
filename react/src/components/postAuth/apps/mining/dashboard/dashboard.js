import React from 'react';
import { connect } from 'react-redux';
import { 
  DashboardRender,
} from './dashboard.render';
import { NumberType } from 'io-ts';
import { setMainNavigationPath, setModalNavigationPath } from '../../../../../actions/actionCreators';
import { POST_AUTH, APPS, SETTINGS, PROFILE_SETTINGS, ADD_COIN, SELECT_COIN } from '../../../../../util/constants/componentConstants';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      overviewData: {
        coinsMining: 0,
        coinsStaking: 0,
        cpuTemp: 0,
        uptime: 0,
        cpuLoad: 0
      }
    }

    this.openAddCoinModal = this.openAddCoinModal.bind(this)
  }

  openAddCoinModal() {
    this.props.dispatch(setModalNavigationPath(`${ADD_COIN}/${SELECT_COIN}`))
  }

  render() {
    return DashboardRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    mainPathArray: state.navigation.mainPathArray,
    activatedCoins: state.coins.activatedCoins,
    fiatPrices: state.ledger.fiatPrices,
    fiatCurrency: state.settings.config.general.main.fiatCurrency,
    balances: state.ledger.balances,
    miningInfo: state.ledger.miningInfo,
    activeUser: state.users.activeUser,
  };
};

export default connect(mapStateToProps)(Dashboard);