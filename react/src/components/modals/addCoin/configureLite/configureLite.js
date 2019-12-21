import React from 'react';
import { connect } from 'react-redux';
import { 
  ConfigureLiteRender
} from './configureLite.render';
import { setModalNavigationPath } from '../../../../actions/actionCreators'
import { SETUP, LOGIN, SUCCESS_SNACK, MID_LENGTH_ALERT, ERROR_SNACK, ADD_COIN, SELECT_COIN } from '../../../../util/constants/componentConstants'
import { addCoin } from '../../../../actions/actionDispatchers'
import { authenticateActiveUser, newSnackbar } from '../../../../actions/actionCreators'

class ConfigureLite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seed: null,
      password: null,
      loading: false,
      
      //DEPRECATED, TODO: DELETE
      error: false,
    }

    this.getSeed = this.getSeed.bind(this)
    this.getPassword = this.getPassword.bind(this)
    this.activateCoin = this.activateCoin.bind(this)
    this._handleError = this._handleError.bind(this)
  }

  componentDidMount() {
    if (this.props.authenticated[this.props.addCoinParams.mode]) {
      this.activateCoin()
    } else {
      let navigationAction
      if (this.props.activeUser.pinFile) {
        navigationAction = setModalNavigationPath(this.props.modalPathArray.join('/') + '/' + LOGIN)
      } else {
        navigationAction = setModalNavigationPath(this.props.modalPathArray.join('/') + '/' + SETUP)
      }

      this.props.dispatch(navigationAction)
    }
  }

  getSeed(seed, callback) {
    this.setState({ seed }, () => { if (callback) callback()})
  }

  getPassword(password, callback) {
    this.setState({password}, () => { if (callback) callback()})
  }

  _handleError(message) {
    this.props.dispatch(newSnackbar(ERROR_SNACK, message))
    this.props.dispatch(setModalNavigationPath(`${ADD_COIN}/${SELECT_COIN}`))
  }

  activateCoin() {
    this.setState({ loading: true }, async () => {
      const { addCoinParams, activatedCoins } = this.props
      const { seed } = this.state

      try {
        if (!this.props.authenticated[this.props.addCoinParams.mode]) this.props.dispatch(await authenticateActiveUser(seed))
  
        const result = await addCoin(
          addCoinParams.coinObj,
          addCoinParams.mode,
          this.props.dispatch,
          Object.keys(activatedCoins)
        );
  
        if (result.msg === 'error') {
          this._handleError(result.result)
        } else {
          this.props.dispatch(newSnackbar(SUCCESS_SNACK, `${addCoinParams.coinObj.id} activated in lite mode!`, MID_LENGTH_ALERT))
          this.props.closeModal()
        }
      } catch (e) {
        this._handleError(e.message)
      }
    })
  }

  render() {
    return ConfigureLiteRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    activeUser: state.users.activeUser,
    authenticated: state.users.authenticated,
    activatedCoins: state.coins.activatedCoins
  };
};

export default connect(mapStateToProps)(ConfigureLite);