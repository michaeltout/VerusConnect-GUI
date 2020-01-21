import React from 'react';
import { connect } from 'react-redux';
import { 
  CoinWalletRender,
} from './coinWallet.render';
import { 
  NATIVE_BALANCE, 
  CONFIRMED_BALANCE, 
  PRIVATE_BALANCE, 
  DARK_CARD, 
  LIGHT_CARD, 
  IMMATURE_BALANCE, 
  RESERVE_BALANCE,
  NATIVE,
  API_GET_BALANCES,
  API_GET_TRANSACTIONS,
  API_GET_FIATPRICE,
  API_GET_INFO,
  SYNCING_CHAIN,
  WALLET_CONNECTED,
  PUBLIC_BALANCE,
  CONNECTING_TO_PEERS,
  OPERATION_INFO,
  TX_INFO,
  FINDING_LONGEST_CHAIN,
  UNCONFIRMED_BALANCE,
} from '../../../../../util/constants/componentConstants'
import { renderAffectedBalance } from '../../../../../util/txUtils/txRenderUtils'
import { setModalNavigationPath, setModalParams } from '../../../../../actions/actionCreators'

//TODO: Use these to update on mount conditionally
import { conditionallyUpdateWallet } from '../../../../../actions/actionDispatchers'
import Store from '../../../../../store'

const CONDITIONAL_UPDATES = [API_GET_BALANCES, API_GET_TRANSACTIONS, API_GET_FIATPRICE, API_GET_INFO]

class CoinWallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      walletDisplayBalances: [{
        balanceAddrType: PUBLIC_BALANCE,
        balanceType: CONFIRMED_BALANCE,
        balance: '-',
        balanceFiat: '-',
        unusable: false,
        fundable: false
      }],
      spendableBalance: {
        crypto: 0,
        fiat: 0.00
      },
      pendingBalance: {
        crypto: 0,
        fiat: 0.00
      },
      walletLoadState: {
        message: 'Loading...',
        error: false,
        percentage: 0
      },
      chevronVisible: false,
    }

    this.calculateBalances = this.calculateBalances.bind(this)
    this.calculateLoadState = this.calculateLoadState.bind(this)
    this.initState = this.initState.bind(this)
    this.openModal = this.openModal.bind(this)
    this.openOpInfo = this.openOpInfo.bind(this)
    this.setInput = this.setInput.bind(this)
  }

  initState() {
    this.calculateBalances()
    this.calculateLoadState()
  }

  openModal(e, modalParams = {}, modal) {
    const _modal = modal ? modal : e.target.name

    this.props.dispatch(setModalParams(_modal, { chainTicker: this.props.coin, ...modalParams }))
    this.props.dispatch(setModalNavigationPath(_modal))
  }

  openOpInfo(rowData) {
    const { zOperations, coin } = this.props
    this.openModal(null, {opObj: zOperations[coin][rowData.opIndex]}, OPERATION_INFO)
  }

  componentDidMount() {
    this.initState()
  }

  componentDidUpdate(lastProps) {
    if (this.props != lastProps && this.props.activatedCoins[this.props.coin]) {  
      if (this.props.coin != lastProps.coin) {
        const stateSnapshot = Store.getState()
        const { dispatch, coin, activatedCoins } = this.props
        const activeCoin = activatedCoins[coin]
        const { mode, id } = activeCoin
    
        CONDITIONAL_UPDATES.map(updateId => {    
          conditionallyUpdateWallet(stateSnapshot, dispatch, mode, id, updateId)
        })
      }

      this.initState()
    }
  }

  calculateBalances() {
    let spendableBalance = {
      crypto: 0,
      fiat: null
    }
    let pendingBalance = {
      crypto: 0,
      fiat: null
    }
    
    let walletDisplayBalances = []
    const chainTicker = this.props.coin
    const balances = this.props.balances[chainTicker]

    if (balances) {
      const fiatPrices = this.props.fiatPrices
      const fiatCurrency = this.props.fiatCurrency
      const nativeBalances = balances[NATIVE_BALANCE]

      for (let balanceAddrType in nativeBalances) {
        for (let balanceType in nativeBalances[balanceAddrType]) {
          const balance = nativeBalances[balanceAddrType][balanceType]

          if (balance != null) {
            pendingBalance.crypto += balance

            if (balanceType === CONFIRMED_BALANCE) {
              spendableBalance.crypto += balance
            }

            if ((balance != 0 || balanceType === CONFIRMED_BALANCE) && balanceType != UNCONFIRMED_BALANCE) {
              walletDisplayBalances.push({
                balanceAddrType,
                balanceType,
                balance,
                balanceFiat: '-',
                unusable: balanceType === IMMATURE_BALANCE ? true : false,
                //fundable: balanceChain === RESERVE_BALANCE ? true : false
              })
            }
          }
        }
      }

      if (fiatPrices[chainTicker] && fiatPrices[chainTicker][fiatCurrency]) {
        const fiatPrice = fiatPrices[chainTicker][fiatCurrency]
        spendableBalance.fiat = (spendableBalance.crypto * fiatPrice).toFixed(2)
        pendingBalance.fiat = (pendingBalance.crypto * fiatPrice).toFixed(2)

        walletDisplayBalances = walletDisplayBalances.map((balanceObj) => {
          return {...balanceObj, balanceFiat: (balanceObj.balance * fiatPrice).toFixed(2)}
        })
      }
    }

    let stateObj = {
      spendableBalance, 
      pendingBalance,
      chevronVisible: walletDisplayBalances.length > 4,
      walletDisplayBalances: walletDisplayBalances.length > 0 ? walletDisplayBalances : [{
        balanceAddrType: PUBLIC_BALANCE,
        balanceType: CONFIRMED_BALANCE,
        balance: '-',
        balanceFiat: '-',
      }]
    }

    this.setState(stateObj)
  }

  calculateLoadState() {
    const { props } = this
    const { errors, activatedCoins, coin } = props
    const activeCoin = activatedCoins[coin]
    const chainTicker = activeCoin.id

    let walletLoadState = {
      message: 'Loading...',
      error: false,
      percentage: 0
    }
      
    if (activeCoin) {
      if (activeCoin.mode === NATIVE) {
        const infoError = errors[API_GET_INFO][chainTicker]

        if (!infoError || !infoError.error) {
          const info = this.props.info[chainTicker]
          
          if (info) {
            const { connections, longestchain, blocks } = info
            const percentage = longestchain < blocks ? 0 : Number(((blocks / longestchain) * 100).toFixed(2))
            

            walletLoadState = {
              ...walletLoadState,
              message:
                percentage < 100
                  ? SYNCING_CHAIN
                  : connections === 0
                  ? CONNECTING_TO_PEERS
                  : longestchain < blocks
                  ? FINDING_LONGEST_CHAIN
                  : `${WALLET_CONNECTED} (${blocks} blocks)`,
              percentage: connections === 0 ? 0 : percentage
            };
          }
        } else {
          walletLoadState = {
            ...walletLoadState,
            message: infoError.result,
            percentage: 0,
            error: true
          }
        }

      } else {
        const balancesError = errors[API_GET_BALANCES][chainTicker]

        if (!balancesError || !balancesError.error) {
          walletLoadState = {
            ...walletLoadState,
            message: WALLET_CONNECTED,
            percentage: 100
          }
        } else {
          walletLoadState = {
            ...walletLoadState,
            message: balancesError.result,
            percentage: 0,
            error: true
          }
        }
      }
    }

    this.setState({ walletLoadState })
  }

  setInput(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return CoinWalletRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    mainPathArray: state.navigation.mainPathArray,
    activatedCoins: state.coins.activatedCoins,
    fiatPrices: state.ledger.fiatPrices,
    fiatCurrency: state.settings.config.general.main.fiatCurrency,
    balances: state.ledger.balances,
    transactions: state.ledger.transactions,
    zOperations: state.ledger.zOperations,
    info: state.ledger.info,
    errors: state.errors,
    addresses: state.ledger.addresses
  };
};

export default connect(mapStateToProps)(CoinWallet);