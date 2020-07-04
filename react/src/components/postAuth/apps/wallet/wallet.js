import React from 'react';
import { connect } from 'react-redux';
import {
  DASHBOARD,
  CHAIN_POSTFIX,
  ADD_COIN,
  SELECT_COIN,
  SUCCESS_SNACK,
  MID_LENGTH_ALERT,
} from "../../../../util/constants/componentConstants";
import Dashboard from './dashboard/dashboard'
import CoinWallet from './coinWallet/coinWallet'
import {
  WalletCardRender,
  WalletTabsRender
} from './wallet.render'
import { setMainNavigationPath, setModalNavigationPath, newSnackbar } from '../../../../actions/actionCreators'
import { deactivateCoin } from '../../../../actions/actionDispatchers'
import { getPathParent, getLastLocation } from '../../../../util/navigationUtils'
import { useStringAsKey } from '../../../../util/objectUtil';

const COMPONENT_MAP = {
  [DASHBOARD]: <Dashboard />,
}

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    
    this.setCards = this.setCards.bind(this)
    this.setTabs = this.setTabs.bind(this)
    this.openCoin = this.openCoin.bind(this)
    this.openDashboard = this.openDashboard.bind(this)
    this.deactivate = this.deactivate.bind(this)
    this.setTabs()
  }

  componentDidMount() {
    if (!this.props.mainPathArray[3]) {
      const chainTickers = Object.keys(this.props.activatedCoins)
      const lastLocation = getLastLocation(
        useStringAsKey(
          this.props.mainTraversalHistory,
          this.props.mainPathArray.join(".")
        )
      );

      const lastCoin =
        lastLocation != null && lastLocation.length > 0 && lastLocation[0].includes("_chain")
          ? lastLocation[0].split("_")[0]
          : null;

      this.props.dispatch(setMainNavigationPath(`${this.props.mainPathArray.join('/')}/${
        lastCoin != null && chainTickers.includes(lastCoin) ? lastLocation[0] : DASHBOARD
      }`)) 
    } 
  }

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.activatedCoins).length < Object.keys(this.props.activatedCoins).length) {
      this.setCards(nextProps.activatedCoins)
    }
  }
  
  componentDidUpdate(lastProps) {
    if (lastProps != this.props) {
      this.setCards(this.props.activatedCoins)
    }
  }

  /**
   * Sets the wallet coin cards by mapping over the provided activated coins
   * @param {Object} activatedCoins 
   */
  setCards(activatedCoins) {
    this.props.setCards(Object.values(activatedCoins).map((coinObj) => {
      return WalletCardRender.call(this, coinObj)
    }))
  }

  openAddCoinModal() {
    this.props.dispatch(setModalNavigationPath(`${ADD_COIN}/${SELECT_COIN}`))
  }

  openCoin(wallet) {
    this.props.dispatch(setMainNavigationPath(`${getPathParent(this.props.mainPathArray)}/${wallet}_${CHAIN_POSTFIX}`))
  }

  async deactivate(chainTicker, mode) {
    const { openDashboard, props } = this
    const { dispatch, mainPathArray } = props

    await deactivateCoin(chainTicker, mode, dispatch, true)
    if (mainPathArray.includes(`${chainTicker}_${CHAIN_POSTFIX}`)) openDashboard()

    this.props.dispatch(newSnackbar(SUCCESS_SNACK, `${chainTicker} deactivated!`, MID_LENGTH_ALERT))
  }

  openDashboard() {
    this.props.dispatch(setMainNavigationPath(`${getPathParent(this.props.mainPathArray)}/${DASHBOARD}`))
  }

  setTabs() {
    this.props.setTabs(WalletTabsRender.call(this))
  }

  render() {
    const walletApp = this.props.mainPathArray[3] ? this.props.mainPathArray[3] : null

    if (walletApp) {
      if (COMPONENT_MAP[walletApp]) return COMPONENT_MAP[walletApp]
      else {
        const pathDestination = walletApp.split('_')

        if (pathDestination.length > 1 && pathDestination[1] === CHAIN_POSTFIX) return <CoinWallet coin={pathDestination[0]}/>
      }
    }

    return null
  }
}

const mapStateToProps = (state) => {
  return {
    mainPathArray: state.navigation.mainPathArray,
    activatedCoins: state.coins.activatedCoins,
    fiatPrices: state.ledger.fiatPrices,
    fiatCurrency: state.settings.config.general.main.fiatCurrency,
    balances: state.ledger.balances,
    loggingOut: state.users.loggingOut,
    mainTraversalHistory: state.navigation.mainTraversalHistory
  };
};

export default connect(mapStateToProps)(Wallet);