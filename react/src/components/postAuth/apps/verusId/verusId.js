import React from 'react';
import { connect } from 'react-redux';
import { DASHBOARD, CHAIN_POSTFIX, ADD_COIN, SELECT_COIN, IS_VERUS, ID_POSTFIX, NATIVE, ERROR_SNACK, SUCCESS_SNACK, ID_INFO, MID_LENGTH_ALERT } from '../../../../util/constants/componentConstants'
import Dashboard from './dashboard/dashboard'
import IdWallet from './idWallet/idWallet'
import {
  IdCardRender,
  IdTabsRender
} from './verusId.render'
import { setMainNavigationPath, setModalNavigationPath, newSnackbar, setModalParams } from '../../../../actions/actionCreators'
import { getPathParent, getLastLocation } from '../../../../util/navigationUtils'
import FormDialog from '../../../../containers/FormDialog/FormDialog'
import { getIdentity } from '../../../../util/api/wallet/walletCalls'
import { openIdentityCard } from '../../../../actions/actionDispatchers';
import { useStringAsKey } from '../../../../util/objectUtil';

const COMPONENT_MAP = {
  [DASHBOARD]: <Dashboard />,
}

class VerusId extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeId: {
        chainTicker: null,
        idIndex: null,
        idSearchOpen: false,
        idSearchTerm: '',
        loading: false,
        searchChain: null
      }
    }
    
    this.setCards = this.setCards.bind(this)
    this.setTabs = this.setTabs.bind(this)
    this.openId = this.openId.bind(this)
    this.openDashboard = this.openDashboard.bind(this)
    this.updateSearchTerm = this.updateSearchTerm.bind(this)
    this.closeSearchModal = this.closeSearchModal.bind(this)
    this.openSearchModal = this.openSearchModal.bind(this)
    this.onIdSearchSubmit = this.onIdSearchSubmit.bind(this)
    this.setTabs()
  }

  componentDidMount() {
    //Set default navigation path to dashboard if wallet is opened without a sub-navigation location
    //if (!this.props.mainPathArray[3]) this.props.dispatch(setMainNavigationPath(`${this.props.mainPathArray.join('/')}/${DASHBOARD}`)) 

    if (!this.props.mainPathArray[3]) {
      const chainTickers = Object.keys(this.props.identities)
      const lastLocation = getLastLocation(
        useStringAsKey(
          this.props.mainTraversalHistory,
          this.props.mainPathArray.join(".")
        )
      );

      if (lastLocation != null && lastLocation.length > 0 && lastLocation[0].includes("_identity")) {
        const lastLocationData = lastLocation[0].split('_')
        const coinId = lastLocationData[1]
        const identityIndex = lastLocationData[0]

        this.props.dispatch(
          setMainNavigationPath(
            `${this.props.mainPathArray.join("/")}/${
              chainTickers.includes(coinId) &&
              this.props.identities[coinId].length > identityIndex
                ? lastLocation[0]
                : DASHBOARD
            }`
          )
        ); 
      } else this.props.dispatch(setMainNavigationPath(`${this.props.mainPathArray.join('/')}/${DASHBOARD}`))
    } 
  }

  updateSearchTerm(term) {
    this.setState({ idSearchTerm: term })
  }

  closeSearchModal() {
    this.setState({ idSearchOpen: false })
  }

  openSearchModal(chain) {
    this.setState({ idSearchOpen: true, searchChain: chain })
  }

  onIdSearchSubmit() {
    this.setState({loading: true}, () => {
      getIdentity(NATIVE, this.state.searchChain, this.state.idSearchTerm)
      .then(res => {
        if (res.msg === 'success') {
          this.props.dispatch(newSnackbar(SUCCESS_SNACK, `${this.state.idSearchTerm} ID found!`, MID_LENGTH_ALERT))
          openIdentityCard(res.result, this.state.searchChain)
          this.setState({ loading: false, idSearchOpen: false, idSearchTerm: '' })
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
        return (coinObj.options.tags.includes(IS_VERUS) && coinObj.mode === NATIVE)
      })
  
      setCards(verusProtocolCoins.map((coinObj) => {
        return IdCardRender.call(this, coinObj)
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

  openId(chainTicker, idIndex) {
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
    this.props.setTabs(IdTabsRender.call(this))
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
          open={this.state.idSearchOpen}
          title={`Search ${this.state.searchChain} IDs`}
          value={this.state.idSearchTerm}
          onChange={this.updateSearchTerm}
          onCancel={this.closeSearchModal}
          onSubmit={this.onIdSearchSubmit}
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
    activeUser: state.users.activeUser,
    mainTraversalHistory: state.navigation.mainTraversalHistory
  };
};

export default connect(mapStateToProps)(VerusId);