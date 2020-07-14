import React from 'react';
import { connect } from 'react-redux';
import { 
  CurrencyInfoRender
} from './currencyInfo.render';
import {
  CURRENCY_INFO,
  BLACKLISTS,
  WHITELISTS,
  ERROR_SNACK,
} from "../../../util/constants/componentConstants";
import { updateLocalWhitelists, updateLocalBlacklists, newSnackbar } from '../../../actions/actionCreators';

class CurrencyInfo extends React.Component {
  constructor(props) {
    super(props);
    props.setModalHeader(`${props.activeCoin.id} Currency`)
    this.addToBlacklist = this.addToBlacklist.bind(this)
    this.addToWhitelist = this.addToWhitelist.bind(this)
    this.removeFromBlacklist = this.removeFromBlacklist.bind(this)
    this.removeFromWhitelist = this.removeFromWhitelist.bind(this)
  }

  async addToWhitelist(name = null) {
    const {
      whitelists,
      activeCoin,
      dispatch,
      activeCurrency,
      currencyInfo,
    } = this.props;

    if (name === null) {
      name = activeCurrency != null ? activeCurrency.name : currencyInfo.currency.name
    }

    const currentWhitelist = whitelists[activeCoin.id] || []

    try {
      dispatch(await updateLocalWhitelists({ ...whitelists, [activeCoin.id]: [...currentWhitelist, name]}))
    } catch(e) {
      dispatch(newSnackbar(ERROR_SNACK, e.message))
    }
  }

  async addToBlacklist(name = null) {
    const {
      blacklists,
      activeCoin,
      dispatch,
      activeCurrency,
      currencyInfo,
    } = this.props;
    
    if (name === null) {
      name = activeCurrency != null ? activeCurrency.name : currencyInfo.currency.name
    }

    const currentBlacklist = blacklists[activeCoin.id] || []

    try {
      dispatch(await updateLocalBlacklists({ ...blacklists, [activeCoin.id]: [...currentBlacklist, name]}))
    } catch(e) {
      dispatch(newSnackbar(ERROR_SNACK, e.message))
    }
  }

  async removeFromBlacklist(name = null) {
    const {
      blacklists,
      activeCoin,
      dispatch,
      activeCurrency,
      currencyInfo,
    } = this.props;
    
    if (name === null) {
      name = activeCurrency != null ? activeCurrency.name : currencyInfo.currency.name
    }

    let currentBlacklist = blacklists[activeCoin.id] || []

    const index = currentBlacklist.indexOf(name);
    if (index > -1) {
      currentBlacklist.splice(index, 1);
    }

    try {
      dispatch(await updateLocalBlacklists({ ...blacklists, [activeCoin.id]: currentBlacklist}))
    } catch(e) {
      dispatch(newSnackbar(ERROR_SNACK, e.message))
    }
  }

  async removeFromWhitelist(name = null) {
    const {
      whitelists,
      activeCoin,
      dispatch,
      activeCurrency,
      currencyInfo,
    } = this.props;

    if (name === null) {
      name = activeCurrency != null ? activeCurrency.name : currencyInfo.currency.name
    }

    let currentWhitelist = whitelists[activeCoin.id] || []

    const index = currentWhitelist.indexOf(name);
    if (index > -1) {
      currentWhitelist.splice(index, 1);
    }

    try {
      dispatch(await updateLocalWhitelists({ ...whitelists, [activeCoin.id]: currentWhitelist}))
    } catch(e) {
      dispatch(newSnackbar(ERROR_SNACK, e.message))
    }
  }

  render() {
    return CurrencyInfoRender.call(this);
  }
}

const mapStateToProps = (state) => {
  const { chainTicker } = state.modal[CURRENCY_INFO]

  return {
    activeCoin: state.coins.activatedCoins[chainTicker],
    activeCurrency: state.modal[CURRENCY_INFO].activeCurrency,
    currencyInfo: state.modal[CURRENCY_INFO].currencyInfo,
    identities: state.modal[CURRENCY_INFO].identities,
    openCurrency: state.modal[CURRENCY_INFO].openCurrencyCard,
    openIdentity: state.modal[CURRENCY_INFO].openIdentityCard,
    info: state.ledger.info[chainTicker],
    blacklists: state.localCurrencyLists[BLACKLISTS],
    whitelists: state.localCurrencyLists[WHITELISTS],
  };
};

export default connect(mapStateToProps)(CurrencyInfo);