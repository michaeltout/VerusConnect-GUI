import React from 'react';
import { connect } from 'react-redux';
import { newSnackbar } from '../../../../../../actions/actionCreators';
import { decodeCoinImportFile } from '../../../../../../util/coinImports';
import { 
  ImportCoinSelectorRender
} from './importCoinSelector.render';

class ImportCoinSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
    this.setFiles = this.setFiles.bind(this)
  }

  setFiles(event) {   
    event.preventDefault()
    const reader = new FileReader()

    this.props.setModalLock(true)
    reader.onload = async (e) => { 
      const text = (e.target.result)
      this.props.setModalLock(false)

      try {
        this.props.setSelectedCoin(decodeCoinImportFile(text))
      } catch(e) {
        console.log(e)
        this.props.dispatch(newSnackbar(ERROR_SNACK, "Failed to decode provided file.", MID_LENGTH_ALERT))
      }
    };
    reader.readAsText(event.target.files[0]) 
  }

  render() {
    return ImportCoinSelectorRender.call(this);
  }
}

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps)(ImportCoinSelector);