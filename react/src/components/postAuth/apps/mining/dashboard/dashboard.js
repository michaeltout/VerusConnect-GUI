import React from 'react';
import { connect } from 'react-redux';
import { 
  DashboardRender,
} from './dashboard.render';
import { startMining, startStaking, stopMining, stopStaking } from '../../../../../util/api/wallet/walletCalls'
import Store from '../../../../../store'
import { setModalNavigationPath, newSnackbar, expireData } from '../../../../../actions/actionCreators';
import { ADD_COIN, SELECT_COIN, NATIVE, API_GET_INFO, API_GET_MININGINFO, ERROR_SNACK, MID_LENGTH_ALERT, API_GET_CPU_TEMP } from '../../../../../util/constants/componentConstants';
import { conditionallyUpdateWallet } from '../../../../../actions/actionDispatchers';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coinsMining: 0,
      coinsStaking: 0,
      loading: {}
    }

    this.openAddCoinModal = this.openAddCoinModal.bind(this)
    this.updateMineStakeCoins = this.updateMineStakeCoins.bind(this)
    this.handleThreadChange = this.handleThreadChange.bind(this)
    this.toggleStaking = this.toggleStaking.bind(this)
  }

  componentDidMount() {
    this.updateMineStakeCoins()
  }

  componentDidUpdate(lastProps) {
    if (lastProps.miningInfo != this.props.miningInfo) {
      this.updateMineStakeCoins()

      Object.keys(this.props.miningInfo).map(chainTicker => {
        // If mining info data is refreshed, stop loading
        if (this.state.loading[chainTicker]) {
          this.setState({ loading: { ...this.state.loading, [chainTicker]: false }})
        }
      })
    }
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

  updateMineStakeCoins() {
    let coinsStaking = 0, coinsMining = coinsStaking
    const { miningInfo } = this.props
    
    Object.keys(miningInfo).map(chainTicker => {
      const { numthreads, generate, staking } = miningInfo[chainTicker]

      if (staking) coinsStaking++
      if (generate && numthreads) coinsMining++
      
      this.setState({ coinsMining, coinsStaking })
    })
  }

  openAddCoinModal() {
    this.props.dispatch(setModalNavigationPath(`${ADD_COIN}/${SELECT_COIN}`))
  }

  render() {
    return DashboardRender.call(this);
  }
}

// Minor performance improvement when filtering activatedCoins
function mapStateToPropsFactory(initialState, ownProps) {
  return function mapStateToProps(state) {
    return {
      nativeCoins: Object.values(state.coins.activatedCoins).filter(coinObj => { return coinObj.mode === NATIVE }),
      balances: state.ledger.balances,
      miningInfo: state.ledger.miningInfo,
      cpuLoad: state.system.cpuLoad,
      cpuTemp: state.system.cpuTemp,
      sysTime: state.system.sysTime,
      cpuData: state.system.static ? state.system.static.cpu : {},
      cpuTempError: state.errors[API_GET_CPU_TEMP],
      getInfoErrors: state.errors[API_GET_INFO],
      miningInfoErrors: state.errors[API_GET_MININGINFO]
    };
  };
}

export default connect(mapStateToPropsFactory)(Dashboard);