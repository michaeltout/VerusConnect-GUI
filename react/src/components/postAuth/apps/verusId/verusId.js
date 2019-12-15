import React from 'react';
import { connect } from 'react-redux';
import { DASHBOARD, CHAIN_POSTFIX, ADD_COIN, SELECT_COIN, IS_VERUS, ID_POSTFIX } from '../../../../util/constants/componentConstants'
import Dashboard from './dashboard/dashboard'
import IdWallet from './idWallet/idWallet'
import {
  IdCardRender,
  IdTabsRender
} from './verusId.render'
import { setMainNavigationPath, setModalNavigationPath } from '../../../../actions/actionCreators'
import { getPathParent } from '../../../../util/navigationUtils'

const COMPONENT_MAP = {
  [DASHBOARD]: <Dashboard />,
}

class VerusId extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeId: {
        chainTicker: null,
        idIndex: null
      }
    }
    
    this.setCards = this.setCards.bind(this)
    this.setTabs = this.setTabs.bind(this)
    this.openId = this.openId.bind(this)
    this.openDashboard = this.openDashboard.bind(this)
    this.setTabs()
  }

  componentDidMount() {
    //Set default navigation path to dashboard if wallet is opened without a sub-navigation location
    if (!this.props.mainPathArray[3]) this.props.dispatch(setMainNavigationPath(`${this.props.mainPathArray.join('/')}/${DASHBOARD}`)) 
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
    const walletApp = this.props.mainPathArray[3] ? this.props.mainPathArray[3] : null
    
    const updateCards = () => {
      const verusProtocolCoins = Object.values(activatedCoins).filter((coinObj) => {
        return coinObj.tags.includes(IS_VERUS)
      })
  
      this.props.setCards(verusProtocolCoins.map((coinObj) => {
        return IdCardRender.call(this, coinObj)
      }))
    }

    if (walletApp) {
      const pathDestination = walletApp.split('_')
      if (pathDestination.length > 2 && pathDestination[2] === ID_POSTFIX) {
        this.setState({ activeId: {chainTicker: pathDestination[1], idIndex: pathDestination[0]}}, updateCards)
      } else {
        this.setState({ activeId: {chainTicker: null, idIndex: null}}, updateCards)
      }  
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

    if (walletApp) {
      if (COMPONENT_MAP[walletApp]) return COMPONENT_MAP[walletApp]
      else {
        if (activeId.idIndex != null && activeId.chainTicker != null) {
          return (
            <IdWallet idIndex={activeId.idIndex} coin={activeId.chainTicker} />
          );
        }
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
    identities: state.ledger.identities,
    nameCommitments: state.ledger.nameCommitments,
    activeUser: state.users.activeUser,
  };
};

export default connect(mapStateToProps)(VerusId);