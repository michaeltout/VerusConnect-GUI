import React from 'react';
import { connect } from 'react-redux';
import { newSnackbar } from '../../../actions/actionCreators';
import { restartCoinInPlace } from '../../../actions/actionDispatchers';
import {
  CHAIN_OPTIONS,
  ERROR_SNACK,
  INFO_SNACK,
  NATIVE,
  SUCCESS_SNACK,
} from "../../../util/constants/componentConstants";
import { 
  ChainOptionsRender
} from './chainOptions.render';

class ChainOptions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    }

    props.setModalHeader("Chain Options")
    this.selectRestartOption = this.selectRestartOption.bind(this)
  }

  selectRestartOption(additionalOptions = [], bootstrap = false) {
    this.setState({
      loading: true
    }, async () => {
      let startParams = additionalOptions

      if (this.props.activeCoin.mode === NATIVE) {
        startParams = [
          ...startParams,
          ...(this.props.startupOptions != null &&
          this.props.startupOptions[NATIVE][this.props.activeCoin.id] != null
            ? this.props.startupOptions[NATIVE][this.props.activeCoin.id]
            : []),
        ];
      }
  
      try {
        this.props.dispatch(newSnackbar(INFO_SNACK, "Restarting coin daemon, please wait..."))
        await restartCoinInPlace(
          this.props.activeCoin,
          this.props.activeCoin.mode,
          startParams,
          this.props.dispatch,
          bootstrap
        );
        this.props.dispatch(newSnackbar(SUCCESS_SNACK, "Daemon relaunched successfully!"))
        this.props.closeModal()
      } catch(e) {
        this.props.dispatch(newSnackbar(ERROR_SNACK, e.message))
        this.setState({
          loading: false
        })
      }
    })
  }

  render() {
    return ChainOptionsRender.call(this);
  }
}

const mapStateToProps = (state) => {
  const { chainTicker } = state.modal[CHAIN_OPTIONS]

  return {
    activeCoin: state.coins.activatedCoins[chainTicker],
    startupOptions: state.users.activeUser.startupOptions
  };
};

export default connect(mapStateToProps)(ChainOptions);