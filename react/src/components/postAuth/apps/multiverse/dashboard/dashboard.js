import React from 'react';
import { connect } from 'react-redux';
import { 
  DashboardRender,
} from './dashboard.render';
import { setModalNavigationPath } from '../../../../../actions/actionCreators';
import {
  ADD_COIN,
  SELECT_COIN,
  IS_VERUS,
  NATIVE
} from "../../../../../util/constants/componentConstants";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.getVerusProtocolCoins = this.getVerusProtocolCoins.bind(this)
    this.getLoadedCurrencyCoins = this.getLoadedCurrencyCoins.bind(this)

    this.state = {
      verusProtoCoins: this.getVerusProtocolCoins(props.activatedCoins),
      loadedCurrencyCoins: this.getLoadedCurrencyCoins(props.allCurrencies)
    }

    this.updateState = this.updateState.bind(this)
  }

  getVerusProtocolCoins(activatedCoins) {
    return Object.values(activatedCoins).filter((coinObj) => {
      return coinObj.options.tags.includes(IS_VERUS) && coinObj.mode === NATIVE
    })
  }

  componentDidUpdate(lastProps) {
    if (
      lastProps != this.props &&
      (lastProps.allCurrencies != this.props.allCurrencies ||
        lastProps.activatedCoins != this.props.activatedCoins)
    ) {
      this.updateState();
    }
  }

  getLoadedCurrencyCoins(allCurrencies) {
    return Object.keys(allCurrencies).length
  }

  updateState() {
    this.setState({
      verusProtoCoins: this.getVerusProtocolCoins(this.props.activatedCoins),
      loadedCurrencyCoins: this.getLoadedCurrencyCoins(this.props.allCurrencies)
    })
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false)
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
    allCurrencies: state.ledger.allCurrencies,
    info: state.ledger.info,
    localCurrencyLists: state.localCurrencyLists,
    identities: state.ledger.identities
  };
};

export default connect(mapStateToProps)(Dashboard);