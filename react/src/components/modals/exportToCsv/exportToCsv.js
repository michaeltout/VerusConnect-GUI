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

    this.selectDirectory = this.selectDirectory.bind(this)
    this.exportToCsv = this.exportToCsv.bind(this)
  }

  selectDirectory(event) {    
    this.setState({ dirName: event.target.files.length > 0 ? event.target.files[0].path : '' })
  }

  exportToCsv() {
    this.props.setModalLock(true)

    this.setState({ loading: true }, async () => {
      const exportPath = this.state.dirName + `/tx_export_${new Date().getTime()}.csv`
      try {
        await exportTransactionCsv(this.props.transactions, exportPath)
        this.props.setModalLock(false)
        this.props.closeModal()
        this.setState({ loading: false })

        this.props.dispatch(newSnackbar(SUCCESS_SNACK, `CSV file saved to ${exportPath}!`, MID_LENGTH_ALERT))
      } catch(e) {
        this.props.setModalLock(false)
        this.setState({ loading: false })

        console.error(e)
        this.props.dispatch(newSnackbar(ERROR_SNACK, `Error saving CSV file to ${exportPath}.`))
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