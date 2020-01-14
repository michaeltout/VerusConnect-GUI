import React from 'react';
import { connect } from 'react-redux';
import { DASHBOARD, ADD_COIN, SELECT_COIN, NATIVE, MINING_POSTFIX, MS_MERGE_MINING_STAKING, MS_MINING_STAKING, MS_MINING, MS_STAKING, MS_MERGE_MINING, MS_OFF, MS_IDLE } from '../../../../util/constants/componentConstants'
import Dashboard from './dashboard/dashboard'
import MiningWallet from './miningWallet/miningWallet'
import {
  MiningCardRender,
  MiningTabsRender
} from './mining.render'
import { setMainNavigationPath, setModalNavigationPath } from '../../../../actions/actionCreators'
import { getPathParent } from '../../../../util/navigationUtils'

const COMPONENT_MAP = {
  [DASHBOARD]: <Dashboard />,
}

class Mining extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nativeCoins: [],
      miningStates: {}
    }

    this.miningStateDescs = {
      [MS_IDLE]: "Loading...",
      [MS_OFF]: "Mining/Staking Off",
      [MS_STAKING]: "Staking",
      [MS_MINING]: "Mining",
      [MS_MINING_STAKING]: "Mining & Staking",
      [MS_MERGE_MINING]: "Merge Mining",
      [MS_MERGE_MINING_STAKING]: "Merge Mining & Staking"
    }
    
    this.setCards = this.setCards.bind(this)
    this.calculateMiningStates = this.calculateMiningStates.bind(this)
    this.setTabs = this.setTabs.bind(this)
    this.openDashboard = this.openDashboard.bind(this)
    this.getNativeCoins = this.getNativeCoins.bind(this)
    this.openAddCoinModal = this.openAddCoinModal.bind(this)
    this.setTabs()
  }

  componentDidMount() {
    //Set default navigation path to dashboard if wallet is opened without a sub-navigation location
    if (!this.props.mainPathArray[3]) this.props.dispatch(setMainNavigationPath(`${this.props.mainPathArray.join('/')}/${DASHBOARD}`)) 
    
    this.calculateMiningStates(this.props.activatedCoins)
  }

  /*componentWillReceiveProps(nextProps) {
    if (nextProps != this.props) {
      this.calculateMiningStates(nextProps.activatedCoins)
      this.setCards(nextProps.activatedCoins);
    } 
  }*/
  
  componentDidUpdate(lastProps) {
    if (lastProps != this.props) {
      this.calculateMiningStates(this.props.activatedCoins)
    }
  }

  // Calculates the native coins given the current activated coins
  // and activates the callback function once the state has been changed
  getNativeCoins(activatedCoins, cb) {
    this.setState({ nativeCoins: Object.keys(activatedCoins).filter((chainTicker) => {
      return activatedCoins[chainTicker].mode === NATIVE
    })}, () => cb())
  }

  /**
   * Sets the mining coin cards by mapping over the provided coins activated in native mode
   * @param {Object} activatedCoins 
   */
  setCards(activatedCoins) {
    this.getNativeCoins(activatedCoins, () => {
      this.props.setCards(this.state.nativeCoins.map((chainTicker) => {
        return MiningCardRender.call(this, activatedCoins[chainTicker])
      }))
    })
  }

  calculateMiningStates(activatedCoins) {
    const { miningInfo } = this.props
    let miningStates = {}

    this.getNativeCoins(activatedCoins, () => {
      this.state.nativeCoins.map((chainTicker) => {
        const coinObj = activatedCoins[chainTicker]

        if (miningInfo[coinObj.id]) {
          const { mergemining, staking, generate, numthreads } = miningInfo[coinObj.id]
          const mergeMining = mergemining != null && mergemining > 0
          const mining = generate && numthreads
  
          if (staking && mergeMining) miningStates[coinObj.id] = MS_MERGE_MINING_STAKING
          else if (staking && mining) miningStates[coinObj.id] = MS_MINING_STAKING
          else if (mergeMining) miningStates[coinObj.id] = MS_MERGE_MINING
          else if (mining) miningStates[coinObj.id] = MS_MINING
          else if (staking) miningStates[coinObj.id] = MS_STAKING
          else miningStates[coinObj.id] = MS_OFF
        } else {
          miningStates[coinObj.id] = MS_IDLE
        }
      })

      this.setState({ miningStates }, () => {
        this.setCards(activatedCoins)
      })
    })
  }

  openAddCoinModal() {
    this.props.dispatch(setModalNavigationPath(`${ADD_COIN}/${SELECT_COIN}`))
  }

  openDashboard() {
    this.props.dispatch(setMainNavigationPath(`${getPathParent(this.props.mainPathArray)}/${DASHBOARD}`))
  }

  setTabs() {
    this.props.setTabs(MiningTabsRender.call(this))
  }

  render() {
    const walletApp = this.props.mainPathArray[3] ? this.props.mainPathArray[3] : null

    if (walletApp) {
      if (walletApp === DASHBOARD)
        return (
          <Dashboard
            miningStates={this.state.miningStates}
            nativeCoins={this.state.nativeCoins}
            miningStateDescs={this.miningStateDescs}
          />
        );
      else {
        const pathDestination = walletApp.split("_");

        if (pathDestination.length > 1 && pathDestination[1] === MINING_POSTFIX)
          return (
            <MiningWallet
              miningState={this.state.miningStates[pathDestination[0]]}
              coin={pathDestination[0]}
            />
          );
      }
    }

    return null
  }
}

const mapStateToProps = (state) => {
  return {
    mainPathArray: state.navigation.mainPathArray,
    activatedCoins: state.coins.activatedCoins,
    miningInfo: state.ledger.miningInfo,
    balances: state.ledger.balances
  };
};

export default connect(mapStateToProps)(Mining);