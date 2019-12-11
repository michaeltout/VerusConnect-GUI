import React from 'react';
import { connect } from 'react-redux';
import { 
  DashboardRender,
} from './dashboard.render';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      compiledIds: [],
      nameReservations: []
    }

    this.compileIds = this.compileIds.bind(this)
    this.compileCommits = this.compileCommits.bind(this)
  }

  componentDidMount() {
    this.compileIds()
    this.compileCommits()
  }

  componentDidUpdate(lastProps) {
    if (this.props != lastProps) {
      this.compileIds()
      this.compileCommits()
    }
  }

  compileIds() {
    const { identities } = this.props
    let compiledIds = []

    Object.keys(identities).map(chainTicker => {
      if (identities[chainTicker]) {
        identities[chainTicker].map(id => {
          compiledIds.push({...id, chainTicker})
        })
      }
    })

    this.setState({ compiledIds })
  }

  compileCommits() {
    const { nameCommitments, transactions } = this.props
    let compiledCommits = []

    Object.keys(nameCommitments).map(chainTicker => {
      if (nameCommitments[chainTicker]) {
        nameCommitments[chainTicker].map(nameCommit => {
          let confirmations = null

          if (transactions[chainTicker]) {
            transactions[chainTicker].map(tx => {
              if (tx.txid === nameCommit.txid) {
                confirmations = tx.confirmations
              }
            })
          }

          compiledCommits.push({...nameCommit, chainTicker, confirmations})
        })
      }
    })

    this.setState({ nameReservations: compiledCommits })
  }

  render() {
    return DashboardRender.call(this);
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
    transactions: state.ledger.transactions
  };
};

export default connect(mapStateToProps)(Dashboard);