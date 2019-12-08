import React from 'react';
import { connect } from 'react-redux';
import { 
  ImmatureDetailsRender
} from './immatureDetails.render';
import { IMMATURE_DETAILS } from '../../../util/constants/componentConstants';

class ImmatureDetails extends React.Component {
  constructor(props) {
    super(props);
    
    this.state ={
      displayTransactions: this.getDisplayTransactions(props.transactions[props.coin] || [])
    }

    this.getDisplayTransactions = this.getDisplayTransactions.bind(this)
  }

  getDisplayTransactions() {
    let transactionsComps = this.props.transactions.map((tx, index) => {
      //if (tx.category === )
      return {
        type: tx.type ? tx.type : tx.category, // "category" is used on native, while "type" is used for electrum & eth/erc20
        amount: Number(tx.amount),
        address: tx.address,
        confirmations: Number(tx.confirmations),
        time: Number(tx.blocktime),
        affectedBalance: renderAffectedBalance(tx),
        txIndex: index
      };
    });

    transactionsComps.sort((a, b) => (a.confirmations > b.confirmations) ? 1 : -1)

    return transactionsComps
  }

  render() {
    return ImmatureDetailsRender.call(this);
  }
}

const mapStateToProps = (state) => {
  const { chainTicker } = state.modal[IMMATURE_DETAILS]

  return {
    activeCoin: state.coins.activatedCoins[chainTicker],
    transactions: state.ledger.transactions[chainTicker],
    modalProps: state.modal[IMMATURE_DETAILS],
  };
};

export default connect(mapStateToProps)(ImmatureDetails);