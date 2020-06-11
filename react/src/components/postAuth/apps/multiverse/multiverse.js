import React from 'react';
import { connect } from 'react-redux';
import {
  DASHBOARD,
  CURRENCY_INFO,
  ADD_COIN,
  SELECT_COIN,
  IS_VERUS,
  ID_POSTFIX,
  NATIVE,
  ERROR_SNACK,
  SUCCESS_SNACK,
  ID_INFO,
  MID_LENGTH_ALERT,
} from "../../../../util/constants/componentConstants";
import Dashboard from './dashboard/dashboard'
import IdWallet from './idWallet/idWallet'
import {
  MultiverseCardRender,
  MultiverseTabsRender
} from './multiverse.render'
import { setMainNavigationPath, setModalNavigationPath, newSnackbar, setModalParams } from '../../../../actions/actionCreators'
import { getPathParent } from '../../../../util/navigationUtils'
import FormDialog from '../../../../containers/FormDialog/FormDialog'
import { getCurrency } from '../../../../util/api/wallet/walletCalls'
import { openCurrencyCard } from '../../../../actions/actionDispatchers';

const COMPONENT_MAP = {
  [DASHBOARD]: <Dashboard />,
}

class Multiverse extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeId: {
        chainTicker: null,
        idIndex: null,
        currencySearchOpen: false,
        currencySearchTerm: '',
        loading: false,
        searchChain: null
      }
    }
    
    this.setCards = this.setCards.bind(this)
    this.setTabs = this.setTabs.bind(this)
    this.openCurrency = this.openCurrency.bind(this)
    this.openDashboard = this.openDashboard.bind(this)
    this.openAddCoinModal = this.openAddCoinModal.bind(this)
    this.updateSearchTerm = this.updateSearchTerm.bind(this)
    this.closeSearchModal = this.closeSearchModal.bind(this)
    this.openSearchModal = this.openSearchModal.bind(this)
    this.onCurrencySearchSubmit = this.onCurrencySearchSubmit.bind(this)
    this.setTabs()
  }

  componentDidMount() {
    //Set default navigation path to dashboard if wallet is opened without a sub-navigation location
    if (!this.props.mainPathArray[3]) this.props.dispatch(setMainNavigationPath(`${this.props.mainPathArray.join('/')}/${DASHBOARD}`)) 
  }

  updateSearchTerm(term) {
    this.setState({ currencySearchTerm: term })
  }

  closeSearchModal() {
    this.setState({ currencySearchOpen: false })
  }

  openSearchModal(chain) {
    this.setState({ currencySearchOpen: true, searchChain: chain })
  }

  onCurrencySearchSubmit() {
    this.setState({loading: true}, () => {
      getCurrency(NATIVE, this.state.searchChain, this.state.currencySearchTerm)
      .then(res => {
        if (res.msg === 'success') {
          this.props.dispatch(newSnackbar(SUCCESS_SNACK, `${this.state.currencySearchTerm} ID found!`, MID_LENGTH_ALERT))
          openCurrencyCard(res.result, this.state.searchChain)
          this.setState({ loading: false, currencySearchOpen: false, currencySearchTerm: '' })
        } else {
          this.props.dispatch(newSnackbar(ERROR_SNACK, res.result))
          this.setState({ loading: false })
        }
      })
      .catch(err => {
        this.props.dispatch(newSnackbar(ERROR_SNACK, err.message))
        this.setState({ loading: false })
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    if (
      Object.keys(nextProps.activatedCoins).length <
        Object.keys(this.props.activatedCoins).length ||
      nextProps.mainPathArray != this.props.mainPathArray
    ) {
      this.setCards(nextProps.activatedCoins);
    }
  }
  
  componentDidUpdate(lastProps) {
    if (lastProps != this.props) {
      this.setCards(this.props.activatedCoins)
    }
  }

  /**
   * Sets the wallet coin cards by mapping over the provided identity compatible coins
   * @param {Object} activatedCoins 
   */
  setCards(activatedCoins) {
    const { setCards, mainPathArray, identities } = this.props
    const walletApp = mainPathArray[3] ? mainPathArray[3] : null
    
    const updateCards = () => {
      const verusProtocolCoins = Object.values(activatedCoins).filter((coinObj) => {
        return coinObj.options.tags.includes(IS_VERUS)
      })
  
      setCards(verusProtocolCoins.map((coinObj) => {
        return MultiverseCardRender.call(this, coinObj)
      }))
    }

    if (walletApp) {
      const pathDestination = walletApp.split('_') 
      let activeId = {chainTicker: null, idIndex: null}

      if (pathDestination.length > 2 && pathDestination[2] === ID_POSTFIX) {
        const idIndex = pathDestination[0]
        const chainTicker = pathDestination[1]

        if (identities[chainTicker] != null && identities[chainTicker][idIndex] != null) {
          activeId = { chainTicker, idIndex }
        } 
      } 

      this.setState({ activeId }, updateCards)
    } else updateCards()
  }

  openAddCoinModal() {
    this.props.dispatch(setModalNavigationPath(`${ADD_COIN}/${SELECT_COIN}`))
  }

  openCurrency(chainTicker, idIndex) {
    this.props.dispatch(setMainNavigationPath(`${getPathParent(this.props.mainPathArray)}/${idIndex}_${chainTicker}_${ID_POSTFIX}`))
  }

  openDashboard() {
    this.setState({
      activeId: {
        chainTicker: null,
        idIndex: null
      }
    }, () => {
      this.props.dispatch(setMainNavigationPath(`${getPathParent(this.props.mainPathArray)}/${DASHBOARD}`))
    })
  }

  setTabs() {
    this.props.setTabs(MultiverseTabsRender.call(this))
  }

  render() {
    const { activeId } = this.state
    const walletApp = this.props.mainPathArray[3] ? this.props.mainPathArray[3] : null
    let component = null

    if (walletApp) {
      if (COMPONENT_MAP[walletApp]) component = COMPONENT_MAP[walletApp]
      else {
        if (activeId.idIndex != null && activeId.chainTicker != null) {
          component = <IdWallet idIndex={activeId.idIndex} coin={activeId.chainTicker} />
        }
      }
    }

    return (
      <React.Fragment>
        <FormDialog
          open={this.state.currencySearchOpen}
          title={`Search Currencies`}
          value={this.state.currencySearchTerm}
          onChange={this.updateSearchTerm}
          onCancel={this.closeSearchModal}
          onSubmit={this.onCurrencySearchSubmit}
          disabled={this.state.loading}
        />
        { component }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    mainPathArray: state.navigation.mainPathArray,
    activatedCoins: state.coins.activatedCoins,
    fiatPrices: state.ledger.fiatPrices,
    fiatCurrency: state.settings.config.general.main.fiatCurrency,
    identities: state.ledger.identities,
    nameCommitments: state.ledger.nameCommitments,
    activeUser: state.users.activeUser
  };
};

export default connect(mapStateToProps)(Multiverse);