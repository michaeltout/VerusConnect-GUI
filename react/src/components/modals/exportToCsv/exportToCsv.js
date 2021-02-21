import React from 'react';
import { connect } from 'react-redux';
import { 
  ExportToCsvRender,
} from './exportToCsv.render';
import {
  CSV_EXPORT, ERROR_SNACK, SUCCESS_SNACK, MID_LENGTH_ALERT
} from "../../../util/constants/componentConstants";
import { exportTransactionCsv } from '../../../util/api/csv/csvExport';
import { newSnackbar } from '../../../actions/actionCreators';

class ExportToCsv extends React.Component {
  constructor(props) {
    super(props);
    props.setModalHeader("Export to CSV")

    this.state = {
      dirName: null,
      loading: false
    }

    this.exportToCsv = this.exportToCsv.bind(this)
  }

  exportToCsv() {
    this.props.setModalLock(true)

    this.setState({ loading: true }, async () => {
      try {
        await exportTransactionCsv(this.props.transactions)
        this.props.setModalLock(false)
        this.props.closeModal()
        this.setState({ loading: false })
      } catch(e) {
        this.props.setModalLock(false)
        this.setState({ loading: false })

        console.error(e)
      }
    })
    
  }

  render() {
    return ExportToCsvRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    transactions: state.modal[CSV_EXPORT].transactions ? state.modal[CSV_EXPORT].transactions : [],
  };
};

export default connect(mapStateToProps)(ExportToCsv);