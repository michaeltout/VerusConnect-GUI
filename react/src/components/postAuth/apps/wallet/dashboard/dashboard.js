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
      portfolioBreakdown: [],
      totalPortfolioValue: 0
    }

    this.calculatePortolio = this.calculatePortolio.bind(this)
    this.openProfileSettings = this.openProfileSettings.bind(this)
  }

  componentDidMount() {
    this.calculatePortolio()
  }

  openProfileSettings() {
    this.props.dispatch(setMainNavigationPath(`${POST_AUTH}/${APPS}/${SETTINGS}/${PROFILE_SETTINGS}`))
  }

  componentDidUpdate(lastProps) {
    if (this.props != lastProps) {
      this.calculatePortolio()
    }
  }

  openAddCoinModal() {
    this.props.dispatch(setModalNavigationPath(`${ADD_COIN}/${SELECT_COIN}`))
  }

  calculatePortolio() {
    let totalPortfolioValue = 0
    let portfolioBreakdown = []
    const balances = this.props.balances
    const fiatPrices = this.props.fiatPrices
    const fiatCurrency = this.props.fiatCurrency

    for (let chainTicker in balances) {
      if (this.props.activatedCoins[chainTicker]) {
        const coinData = this.props.activatedCoins[chainTicker]
        let coinPortfolio = {
          //These three values are named like this to be put into pie chart
          color: coinData.themeColor,
          value: 0,
          name: coinData.name,

          //These values are for tables and coin cards
          id: chainTicker,
          spotPrice: null,
          priceChange7d: null,
          balance: balances[chainTicker].native.public.confirmed +
            (balances[chainTicker].native.private.confirmed
              ? balances[chainTicker].native.private.confirmed
              : 0),
          balanceFiat: null,
          mode: coinData.mode,
        }

        if (fiatPrices[chainTicker] && fiatPrices[chainTicker][fiatCurrency]) {
          coinPortfolio = {
            ...coinPortfolio,
            spotPrice: Number(fiatPrices[chainTicker][fiatCurrency]).toFixed(2),
            priceChange7d: fiatPrices[chainTicker].priceChange.data.percent_change_7d,
            balanceFiat: coinPortfolio.balance * fiatPrices[chainTicker][fiatCurrency]
          }

          totalPortfolioValue += coinPortfolio.balanceFiat
        }

        portfolioBreakdown.push(coinPortfolio)
      }
    }

    //Calculate percentages of total portfolio value
    portfolioBreakdown = portfolioBreakdown.map((portfolioItem) => {
      return {
        ...portfolioItem,
        value: totalPortfolioValue ? Number(((portfolioItem.balanceFiat / totalPortfolioValue) * 100).toFixed(0)) : 0
      }
    })

    this.setState({portfolioBreakdown, totalPortfolioValue})
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
    activeUser: state.users.activeUser,
  };
};

export default connect(mapStateToProps)(Dashboard);