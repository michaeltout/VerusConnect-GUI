import React from 'react';
import { connect } from 'react-redux';
import { 
  AddCoinRender
} from './addCoin.render';
import { newSnackbar } from '../../../actions/actionCreators';
import { ERROR_SNACK } from '../../../util/constants/componentConstants';

class AddCoin extends React.Component {
  constructor(props) {
    super(props);

    props.setModalHeader("Add Coin")
    this.state = {
      addCoinParams: {
        coinObj: null,
        mode: null,
        startParams: null,
      }
    }

    this.getAddCoinParams = this.getAddCoinParams.bind(this)
    this._handleLoggingOut = this._handleLoggingOut.bind(this)
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

  componentDidUpdate(lastProps) {
    if (lastProps.loggingOut != this.props.loggingOut && this.props.loggingOut) {
      this._handleLoggingOut()
    }
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
    loggingOut: state.users.loggingOut
  };
};

export default connect(mapStateToProps)(AddCoin);