import React from 'react';
import { connect } from 'react-redux';
import { 
  IdWalletRender,
} from './idWallet.render';
import { 
  NATIVE_BALANCE, 
  CONFIRMED_BALANCE, 
  API_GET_BALANCES,
  API_GET_TRANSACTIONS,
  API_GET_FIATPRICE,
  API_GET_INFO,
  PUBLIC_BALANCE,
  TX_INFO,
  UNCONFIRMED_BALANCE,
  OPERATION_INFO,
  PRIVATE_ADDRS,
} from '../../../../../util/constants/componentConstants'
import { renderAffectedBalance } from '../../../../../util/txUtils/txRenderUtils'
import { setModalNavigationPath, setModalParams, setMainNavigationPath } from '../../../../../actions/actionCreators'

//TODO: Use these to update on mount conditionally
import { conditionallyUpdateWallet, openModal } from '../../../../../actions/actionDispatchers'
import Store from '../../../../../store'
import { getPathParent } from '../../../../../util/navigationUtils';

const CONDITIONAL_UPDATES = [API_GET_BALANCES, API_GET_TRANSACTIONS, API_GET_FIATPRICE, API_GET_INFO]

class IdWallet extends React.Component {
  constructor(props) {
    super(props);

    if (props.activeIdentity == null) {
      props.dispatch(setMainNavigationPath(getPathParent(props.mainPathArray)))
    }

    this.state = {
      walletDisplayBalances: [
        {
          balanceAddrType: PUBLIC_BALANCE,
          balanceType: CONFIRMED_BALANCE,
          balance: "-",
          balanceFiat: "-"
        }
      ],
      spendableBalance: {
        crypto: 0,
        fiat: 0.0
      },
      walletLoadState: {
        message: "Loading...",
        error: false,
        percentage: 0
      },
      chevronVisible: false,
      txSearchTerm: "",
      identityTransactions: [],
      displayTransactions: []
    };

    this.calculateBalances = this.calculateBalances.bind(this);
    this.initState = this.initState.bind(this);
    this.openModal = this.openModal.bind(this);
    this.openTxInfo = this.openTxInfo.bind(this);
    this.setInput = this.setInput.bind(this);
    this.clearTxSearch = this.clearTxSearch.bind(this);
    this.filterTransactions = this.filterTransactions.bind(this);
    this.openOpInfo = this.openOpInfo.bind(this)
    this.getDisplayTransactions = this.getDisplayTransactions.bind(this);
  }

  initState() {
    const identityTransactions = this.getIdentityTransactions(
      this.props.transactions,
      this.props.activeIdentity
    );

    this.calculateBalances();
    this.setState({ identityTransactions, displayTransactions: this.getDisplayTransactions(identityTransactions) })
  }

  getIdentityTransactions(transactions, identity) {
    if (!identity || !transactions) return [];
    let txIndexes = []

    const pubAddrs = identity.addresses.public.map(addrObj => addrObj.address);
    const privAddrs = identity.addresses.private.map(addrObj => addrObj.address);

    return transactions.filter((tx, index) => {
      if (tx.address != null && (pubAddrs.includes(tx.address) || privAddrs.includes(tx.address))) {
        txIndexes.push(index)
        return true
      } else return false
    }).map((tx, index) => {return {...tx, txIndex: txIndexes[index]}});
  }

  getDisplayTransactions(transactions) {
    let transactionsComps = transactions.map((tx) => {
      return {
        type: tx.type ? tx.type : tx.category, // "category" is used on native, while "type" is used for electrum & eth/erc20
        amount: Number(tx.amount),
        address: tx.address,
        confirmations: Number(tx.confirmations),
        time: Number(tx.blocktime != null ? tx.blocktime : tx.timestamp),
        affectedBalance: renderAffectedBalance(tx),
        txIndex: tx.txIndex
      };
    });

    transactionsComps.sort((a, b) =>
      a.confirmations > b.confirmations ? 1 : -1
    );

    return transactionsComps;
  }

  filterTransactions(transactions) {
    const { txSearchTerm } = this.state;
    const term = txSearchTerm.toLowerCase();

    // TODO: Make this work for balance types and normal transaction types as they are displayed as well
    const newTransactions = transactions.filter(tx => {
      if ((tx.type != null && tx.type.includes(term)) || term.includes(tx.type))
        return true;
      if (tx.amount != null && tx.amount.toString().includes(term)) return true;
      if (
        tx.confirmations != null &&
        tx.confirmations.toString().includes(term)
      )
        return true;
      if (tx.address != null && tx.address.toLowerCase().includes(term))
        return true;
    });

    this.setState({ displayTransactions: newTransactions });
  }

  openModal(e, modalParams = {}, modal) {
    const _modal = modal ? modal : e.target.name;
    openModal(_modal, { chainTicker: this.props.coin, ...modalParams })
  }

  openOpInfo(rowData) {
    const { zOperations } = this.props
    this.openModal(null, {opObj: zOperations[rowData.opIndex]}, OPERATION_INFO)
  }

  openTxInfo(rowData) {
    const { transactions } = this.props;
    this.openModal(null, { txObj: transactions[rowData.txIndex] }, TX_INFO);
  }

  componentDidMount() {
    this.initState();
  }

  componentWillReceiveProps(nextProps) {
    const {
      getDisplayTransactions,
      filterTransactions,
      getIdentityTransactions,
      props,
      state,
      setState
    } = this;
    const { transactions, activeIdentity } = props;
    const { txSearchTerm } = state;

    if (nextProps.transactions != transactions || nextProps.activeIdentity != activeIdentity) {
      const identityTransactions = getIdentityTransactions(
        nextProps.transactions,
        nextProps.activeIdentity
      );

      if (txSearchTerm.length > 0) {
        setState({
          displayTransactions: getDisplayTransactions(identityTransactions)
        });
      } else {
        filterTransactions(getDisplayTransactions(identityTransactions));
      }
    }
  }

  componentDidUpdate(lastProps) {
    if (this.props != lastProps && this.props.activatedCoins[this.props.coin]) {
      if (this.props.coin != lastProps.coin) {
        const stateSnapshot = Store.getState();
        const { dispatch, coin, activatedCoins } = this.props;
        const activeCoin = activatedCoins[coin];
        const { mode, id } = activeCoin;

        CONDITIONAL_UPDATES.map(updateId => {
          conditionallyUpdateWallet(
            stateSnapshot,
            dispatch,
            mode,
            id,
            updateId
          );
        });
      }

      this.initState();
    }
  }

  calculateBalances() {
    const { props } = this
    const { activeIdentity, fiatPrices, fiatCurrency, coin } = props
    const { balances, addresses } = activeIdentity

    let spendableBalance = {
      crypto: 0,
      fiat: null
    };
    
    let walletDisplayBalances = [];
    const chainTicker = coin;
    

    if (balances) {
      const nativeBalances = balances[NATIVE_BALANCE];

      for (let balanceAddrType in nativeBalances) {
        for (let balanceType in nativeBalances[balanceAddrType]) {
          const balance = nativeBalances[balanceAddrType][balanceType];

          if (balance != null) {
            if (balanceType === CONFIRMED_BALANCE) {
              spendableBalance.crypto += balance;
            }

            if (
              (balance != 0 || balanceType === CONFIRMED_BALANCE) &&
              balanceType != UNCONFIRMED_BALANCE
            ) {
              walletDisplayBalances.push({
                balanceAddrType,
                balanceType,
                balance,
                balanceFiat: "-"
              });
            }
          } else if (balanceAddrType === PRIVATE_ADDRS && addresses.private.length > 0) {
            walletDisplayBalances.push({
              balanceAddrType,
              balanceType,
              balance: "-",
              balanceFiat: "-"
            });
          }
        }
      }

      if (fiatPrices[chainTicker] && fiatPrices[chainTicker][fiatCurrency]) {
        const fiatPrice = fiatPrices[chainTicker][fiatCurrency];
        spendableBalance.fiat = (spendableBalance.crypto * fiatPrice).toFixed(
          2
        );

        walletDisplayBalances = walletDisplayBalances.map(balanceObj => {
          return {
            ...balanceObj,
            balanceFiat: (balanceObj.balance * fiatPrice).toFixed(2)
          };
        });
      }
    }

    let stateObj = {
      spendableBalance,
      walletDisplayBalances:
        walletDisplayBalances.length > 0
          ? walletDisplayBalances
          : [
              {
                balanceAddrType: PUBLIC_BALANCE,
                balanceType: CONFIRMED_BALANCE,
                balance: "-",
                balanceFiat: "-"
              }
            ]
    };

    this.setState(stateObj);
  }

  setInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  clearTxSearch() {
    this.setState({
      displayTransactions: this.getDisplayTransactions(this.state.identityTransactions),
      txSearchTerm: ""
    });
  }

  render() {
    return this.props.activeIdentity ? IdWalletRender.call(this) : null;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    activatedCoins: state.coins.activatedCoins,
    fiatPrices: state.ledger.fiatPrices,
    fiatCurrency: state.settings.config.general.main.fiatCurrency,
    activeIdentity: state.ledger.identities[ownProps.coin] ? state.ledger.identities[ownProps.coin][ownProps.idIndex] : null,
    transactions: state.ledger.transactions[ownProps.coin],
    zOperations: state.ledger.zOperations[ownProps.coin],
    info: state.ledger.info,
    mainPathArray: state.navigation.mainPathArray,
    multiverseNameMap: state.ledger.multiverseNameMap[ownProps.coin]
  };
};

export default connect(mapStateToProps)(IdWallet);