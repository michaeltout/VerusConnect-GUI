import React from 'react';
import { connect } from 'react-redux';
import { 
  SelectCoinRender
} from './selectCoin.render';
import {
  CHAIN_FALLBACK_IMAGE,
  LITE,
  ETH,
  NATIVE,
  ELECTRUM,
  NATIVE_MINE,
  NATIVE_RESCAN,
  NATIVE_STAKE,
  NATIVE_MINE_THREADS,
  CONFIGURE,
  NATIVE_REINDEX
} from "../../../../util/constants/componentConstants";
import { getCoinObj } from "../../../../util/coinData";
import { getPathParent } from "../../../../util/navigationUtils";
import { setModalNavigationPath } from '../../../../actions/actionCreators'

class SelectCoin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCoin: null,
      chosenCoin: null,
      selectedMode: null,
      nativeOptions: {
        [NATIVE_MINE]: false,
        [NATIVE_MINE_THREADS]: '',
        [NATIVE_STAKE]: false,
        [NATIVE_RESCAN]: false
      }
    }

    this.liteMode = null

    this.chooseCoin = this.chooseCoin.bind(this)
    this.checkBox = this.checkBox.bind(this)
    this.clearCoin = this.clearCoin.bind(this)
    this.updateThreads = this.updateThreads.bind(this)
    this.selectMode = this.selectMode.bind(this)
    this.chooseMode = this.chooseMode.bind(this)
    this.generateStartupParams = this.generateStartupParams.bind(this)
  }

  switchToDefaultSrc(e) {
    e.target.src = CHAIN_FALLBACK_IMAGE
  }

  chooseMode() {
    const { selectedMode, chosenCoin } = this.state
    const { available_modes } = chosenCoin
    
    const mode = selectedMode === NATIVE ? NATIVE : (available_modes[ETH] ? ETH : ELECTRUM)

    if (selectedMode) {
      this.props.setAddCoinParams(
        {coinObj: chosenCoin, mode, startParams: this.generateStartupParams()},
        () => {
          this.props.dispatch(setModalNavigationPath(`${getPathParent(this.props.modalPathArray)}/${CONFIGURE}_${selectedMode}`))
        })      
    }
  }

  generateStartupParams() {
    let startupOptions = []
    const { nativeOptions } = this.state
    
    for (let key in nativeOptions) {
      if (nativeOptions[key] && typeof nativeOptions[key] === "boolean") {
        startupOptions.push(key)
      } else if (typeof nativeOptions[key] === "string" && !isNaN(Number(nativeOptions[key]))) {
        startupOptions.push(`${key}${Number(nativeOptions[key])}`)
      }
    }

    return startupOptions
  }

  selectMode(selectedMode) {
    this.setState({selectedMode})
  }

  checkBox(e) {
    this.setState({nativeOptions: {...this.state.nativeOptions, [e.target.name]: e.target.checked}})
  }

  updateThreads(e) {
    this.setState({nativeOptions: {...this.state.nativeOptions, [NATIVE_MINE_THREADS]: e.target.value}})
  }

  chooseCoin() {
    const chosenCoin = getCoinObj(this.state.selectedCoin.id)
    const availableModes = chosenCoin.available_modes

    let selectedMode
    if (availableModes[NATIVE]) selectedMode = NATIVE
    else if (availableModes[ETH] || availableModes[ELECTRUM]) {
      selectedMode = LITE
    }

    this.setState({ chosenCoin, selectedMode })
  }

  clearCoin() {
    this.setState({
      chosenCoin: null,
      selectedMode: null,
      nativeOptions: {
        [NATIVE_MINE]: false,
        [NATIVE_MINE_THREADS]: "",
        [NATIVE_STAKE]: false,
        [NATIVE_RESCAN]: false,
        [NATIVE_REINDEX]: false
      }
    });
  }

  render() {
    return SelectCoinRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    mainPath: state.navigation.mainPath,
    coinNativeConfig: state.settings.config.coin.native,
  };
};

export default connect(mapStateToProps)(SelectCoin);