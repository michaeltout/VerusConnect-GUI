import React from 'react';
import { connect } from 'react-redux';
import { 
  ConversionOverviewRender
} from './conversionOverview.render';
import {
  COPY_PRIVKEY,
  COPY_PUBKEY,
  GENERATE_QR,
  CONVERT_CURRENCY,
} from "../../../../util/constants/componentConstants";
import { timeConverter } from '../../../../util/displayUtil/timeUtils';

class ConversionOverview extends React.Component {
  constructor(props) {
    super(props);
    this.filterTransfers = this.filterTransfers.bind(this);
    this.setInput = this.setInput.bind(this);
    this.generateTransferOptions = this.generateTransferOptions.bind(this);
    this.selectTransferOption = this.selectTransferOption.bind(this);
    this.clearTransferSearch = this.clearTransferSearch.bind(this);
    this.getStatusString = this.getStatusString.bind(this);

    this.state = {
      reserveTransfers: props.reserveTransfers,
      transferSearchTerm: "",
      transferIndices: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reserveTransfers != this.props.reserveTransfers) {
      if (this.state.transferSearchTerm.length > 0) {
        this.filterTransfers(nextProps.reserveTransfers);
      } else {
        this.setState({ reserveTransfers: nextProps.reserveTransfers });
      }
    }
  }

  changeTransferIndex(opid, newIndex) {
    this.setState({
      transferIndices: { ...this.state.transferIndices, [opid]: newIndex },
    });
  }

  filterTransfers(reserveTransfers) {
    const { transferSearchTerm } = this.state;

    const checkTerm = (searchee) =>{
      const searcheeUc = searchee.toUpperCase()
      const termUc = transferSearchTerm.toUpperCase()

      return searcheeUc.includes(termUc) ||
      termUc.includes(searcheeUc);
    }

    this.setState({
      reserveTransfers: reserveTransfers.filter((transfer) => {
        const currentIndex =
          this.state.transferIndices[transfer.operation.id] == null
            ? 0
            : this.state.transferIndices[transfer.operation.id];
        const to = transfer.to[currentIndex];
        const from = transfer.from[currentIndex];
        const via = transfer.via[currentIndex];
        const params = transfer.operation.params[currentIndex];

        if (checkTerm(this.getStatusString(transfer.tx))) return true;

        if (transfer.tx) {
          if (checkTerm(transfer.tx.txid)) return true;
          else if (
            transfer.tx.confirmations &&
            checkTerm(timeConverter(transfer.tx.blocktime))
          )
            return true;
          else if (checkTerm(transfer.tx.confirmations.toString())) return true;
        }

        if (checkTerm(from.name)) return true;
        if (checkTerm(to.name)) return true;

        if (checkTerm(from.currencyid)) return true;
        if (checkTerm(to.currencyid)) return true;

        if (via) {
          if (checkTerm(via.currencyid)) return true;
          if (checkTerm(via.name)) return true;
        }

        if (checkTerm(params.amount.toString())) return true

        return false;
      }),
    });
  }

  getStatusString(tx) {
    return tx == null ? "failed" : tx.confirmations ? "confirmed" : "pending";
  }

  clearTransferSearch() {
    this.setState({
      reserveTransfers: this.props.reserveTransfers,
      transferSearchTerm: "",
    });
  }

  generateTransferOptions(address) {
    let addressOptions = [GENERATE_QR];

    return addressOptions;
  }

  selectTransferOption(address, addrOption) {
    if (addrOption === COPY_PUBKEY || addrOption === COPY_PRIVKEY) {
      //this.getKey(address, addrOption)
    } else if (addrOption === GENERATE_QR) {
      //this.toggleAddressQr(address)
    }
  }

  setInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return ConversionOverviewRender.call(this);
  }
}

const mapStateToProps = (state) => {
  const { chainTicker } = state.modal[CONVERT_CURRENCY]

  return {
    activeCoin: state.coins.activatedCoins[chainTicker],
    reserveTransfers: state.ledger.reserveTransfers[chainTicker]
      ? state.ledger.reserveTransfers[chainTicker]
      : [],
    modalProps: state.modal[CONVERT_CURRENCY],
  };
};

export default connect(mapStateToProps)(ConversionOverview);