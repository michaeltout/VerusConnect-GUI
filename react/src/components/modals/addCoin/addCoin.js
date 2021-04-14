import React from 'react';
import { connect } from 'react-redux';
import { 
  AddCoinRender
} from './addCoin.render';
import { newSnackbar } from '../../../actions/actionCreators';
import {
  ERROR_SNACK,
  IMPORT_COIN,
  ADD_PBAAS_COIN,
  ADD_DEFAULT_COIN,
  ADD_COIN,
  SELECT_COIN
} from "../../../util/constants/componentConstants";
const { shell } = window.bridge

class AddCoin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addCoinParams: {
        coinObj: null,
        mode: null,
        startParams: null,
      },
      selectedCoinSource:
        props.modalProps != null && props.modalProps.mode != null
          ? props.modalProps.mode
          : ADD_DEFAULT_COIN,
    };

    props.setModalHeader("Add Coin")
    props.setModalLinks([
      {
        label: "What is a PBaaS chain?",
        onClick: () => shell.openExternal("https://verus.io/technology/PbaaS"),
      },
    ]);

    this.getAddCoinParams = this.getAddCoinParams.bind(this)
    this._handleLoggingOut = this._handleLoggingOut.bind(this)
    this.updateModalButtons = this.updateModalButtons.bind(this)
    this.setSelectedCoinSource = this.setSelectedCoinSource.bind(this)

    this.updateModalButtons(props)
  }

  _handleLoggingOut() {
    this.props.closeModal()
    this.props.dispatch(newSnackbar(ERROR_SNACK, "Cannot add coin while logging out."))
  }

  componentDidMount() {
    if (this.props.loggingOut) {
      this._handleLoggingOut()
    }
  }

  componentDidUpdate(lastProps, lastState) {
    if (lastProps.loggingOut != this.props.loggingOut && this.props.loggingOut) {
      this._handleLoggingOut()
    }

    if (lastState.selectedCoinSource !== this.state.selectedCoinSource)
      this.updateModalButtons(this.props);
  }

  setSelectedCoinSource(source, cb = () => {}) {
    this.setState({
      selectedCoinSource: source,
      addCoinParams: {
        coinObj: null,
        mode: null,
        startParams: null,
      }
    }, cb)
  }

  updateModalButtons(props) {
    props.setModalButtons([{
      onClick: () => this.setSelectedCoinSource(ADD_DEFAULT_COIN),
      isActive: this.state.selectedCoinSource === ADD_DEFAULT_COIN,
      label: "Add Coin From List"
    },
    {
      onClick: () => this.setSelectedCoinSource(IMPORT_COIN),
      isActive: this.state.selectedCoinSource === IMPORT_COIN,
      label: "Import Coin"
    },
    {
      onClick: () => this.setSelectedCoinSource(ADD_PBAAS_COIN),
      isActive: this.state.selectedCoinSource === ADD_PBAAS_COIN,
      label: "Add PBaaS Chain"
    }]);
  }

  getAddCoinParams(addCoinParams, callback) {
    this.setState({addCoinParams}, () => {if (callback) callback()})
  }

  render() {
    return AddCoinRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    mainPath: state.navigation.mainPath,
    loggingOut: state.users.loggingOut,
    modalProps: state.modal[`${ADD_COIN}/${SELECT_COIN}`],
  };
};

export default connect(mapStateToProps)(AddCoin);