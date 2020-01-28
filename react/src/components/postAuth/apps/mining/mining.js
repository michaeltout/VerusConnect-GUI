import React from 'react';
import { connect } from 'react-redux';
import { DASHBOARD, ADD_COIN, SELECT_COIN, NATIVE, MINING_POSTFIX, MS_MERGE_MINING_STAKING, MS_MINING_STAKING, MS_MINING, MS_STAKING, MS_MERGE_MINING, MS_OFF, MS_IDLE, ERROR_SNACK, MID_LENGTH_ALERT, API_GET_MININGINFO } from '../../../../util/constants/componentConstants'
import Dashboard from './dashboard/dashboard'
import MiningWallet from './miningWallet/miningWallet'
import {
  MiningCardRender,
  MiningTabsRender
} from './mining.render'
import Store from '../../../../store'
import { setMainNavigationPath, setModalNavigationPath, expireData, newSnackbar } from '../../../../actions/actionCreators'
import { getPathParent } from '../../../../util/navigationUtils'
import { stopStaking, startStaking, stopMining, startMining } from '../../../../util/api/wallet/walletCalls';
import { conditionallyUpdateWallet } from '../../../../actions/actionDispatchers';

const COMPONENT_MAP = {
  [DASHBOARD]: <Dashboard />,
}

class Mining extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nativeCoins: [],
      miningStates: {},
      loading: {}
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
    this.openCoin = this.openCoin.bind(this)
    this.handleThreadChange = this.handleThreadChange.bind(this)
    this.toggleStaking = this.toggleStaking.bind(this)
    this.setTabs()
  }

  componentDidMount() {
    //Set default navigation path to dashboard if wallet is opened without a sub-navigation location
    if (!this.props.mainPathArray[3]) this.props.dispatch(setMainNavigationPath(`${this.props.mainPathArray.join('/')}/${DASHBOARD}`)) 
    
    this.calculateMiningStates(this.props.activatedCoins)
  }

  toggleStaking(chainTicker) {
    const { miningInfo, dispatch } = this.props

    if (miningInfo[chainTicker]) {
      this.setState({ loading: { ...this.state.loading, [chainTicker]: true }}, async () => {
        try {
          // Try to dispatch call to stop or start staking
          if (miningInfo[chainTicker].staking) {
            await stopStaking(NATIVE, chainTicker)
          } else {
            await startStaking(NATIVE, chainTicker)
          }
  
          // If successful, expire mining data and update all other expired data
          dispatch(expireData(chainTicker, API_GET_MININGINFO))
          conditionallyUpdateWallet(Store.getState(), dispatch, NATIVE, chainTicker, API_GET_MININGINFO)
        } catch (e) {
          // If failed, cancel loading
          this.setState({ loading: { ...this.state.loading, [chainTicker]: false }})
          dispatch(newSnackbar(ERROR_SNACK, e.message, MID_LENGTH_ALERT))
        }
      })
    }
  }

  // Dispatch call to stop or start mining, then expire and update mining data
  handleThreadChange(event, chainTicker) {
    const newThreads = event.target.value
    const { dispatch, miningInfo } = this.props

    if (miningInfo[chainTicker] && newThreads !== miningInfo[chainTicker].numthreads) {
      this.setState({ loading: { ...this.state.loading, [chainTicker]: true }}, async () => {
        try {
          // Try to dispatch call to stop or start mining
          if (newThreads === 0) {
            await stopMining(NATIVE, chainTicker)
          } else {
            await startMining(NATIVE, chainTicker, newThreads)
          }
  
          // If successful, expire mining data and update all other expired data
          dispatch(expireData(chainTicker, API_GET_MININGINFO))
          conditionallyUpdateWallet(Store.getState(), dispatch, NATIVE, chainTicker, API_GET_MININGINFO)
        } catch (e) {
          // If failed, cancel loading
          this.setState({ loading: { ...this.state.loading, [chainTicker]: false }})
          dispatch(newSnackbar(ERROR_SNACK, e.message, MID_LENGTH_ALERT))
        }
      })
    }
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

    if (lastProps.miningInfo != this.props.miningInfo) {
      Object.keys(this.props.miningInfo).map(chainTicker => {
        // If mining info data is refreshed, stop loading
        if (this.state.loading[chainTicker]) {
          this.setState({ loading: { ...this.state.loading, [chainTicker]: false }})
        }
      })
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

  openCoin(wallet) {
    this.props.dispatch(setMainNavigationPath(`${getPathParent(this.props.mainPathArray)}/${wallet}_${MINING_POSTFIX}`))
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
            openCoin={this.openCoin}
            handleThreadChange={this.handleThreadChange}
            toggleStaking={this.toggleStaking}
            loadingCoins={this.state.loading}
            miningInfo={this.props.miningInfo}
            miningInfoErrors={this.props.miningInfoErrors}
          />
        );
      else {
        const pathDestination = walletApp.split("_");

        if (pathDestination.length > 1 && pathDestination[1] === MINING_POSTFIX)
          return (
            <MiningWallet
              miningState={
                this.state.miningStates[pathDestination[0]] == null
                  ? MS_IDLE
                  : this.state.miningStates[pathDestination[0]]
              }
              coin={pathDestination[0]}
              loading={this.state.loading[pathDestination[0]]}
              handleThreadChange={this.handleThreadChange}
              toggleStaking={this.toggleStaking}
              miningInfo={this.props.miningInfo[pathDestination[0]]}
              miningInfoErrors={this.props.miningInfoErrors[pathDestination[0]]}
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
    balances: state.ledger.balances,
    miningInfoErrors: state.errors[API_GET_MININGINFO]
  };
};

export default connect(mapStateToProps)(Mining);