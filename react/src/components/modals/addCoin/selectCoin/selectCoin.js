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
  NATIVE_REINDEX,
  ELECTRUM_NSPV,
  MID_LENGTH_ALERT,
  INFO_SNACK,
  WARNING_SNACK,
  ERC20
} from "../../../../util/constants/componentConstants";
import { getCoinObj } from "../../../../util/coinData";
import { getPathParent } from "../../../../util/navigationUtils";
import { setModalNavigationPath, newSnackbar } from '../../../../actions/actionCreators'

class SelectCoin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCoin: null,
      chosenCoin: null,
      selectedMode: null,
      coinJsonFile: null,
      nativeOptions: {
        [NATIVE_MINE]: false,
        [NATIVE_MINE_THREADS]: '',
        [NATIVE_STAKE]: false,
        [NATIVE_RESCAN]: false
      },
      electrumOptions: {
        [ELECTRUM_NSPV]: false,
      }
    }

    this.liteMode = null
    this.chooseCoin = this.chooseCoin.bind(this)
    this.checkBox = this.checkBox.bind(this)
    this.checkBoxElectrum = this.checkBoxElectrum.bind(this)
    this.clearCoin = this.clearCoin.bind(this)
    this.updateThreads = this.updateThreads.bind(this)
    this.selectMode = this.selectMode.bind(this)
    this.chooseMode = this.chooseMode.bind(this)
    this.generateStartupOptions = this.generateStartupOptions.bind(this)
    this.detectCodes = this.detectCodes.bind(this)
    this.getSelectedCoin = this.getSelectedCoin.bind(this)

    this.MAX_CODE_CHARS = 50
    this.keyLog = []
    this.keyLogClearIntervals = []
    this.SECRET_CODES = {
      ["ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightbaEnter"]: {
        message: '(╯°□°)╯︵ ┻━┻',
        event: () => {}
      }
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.detectCodes, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.detectCodes, false);
  }

  componentDidUpdate(lastProps) {
    if (lastProps.selectedCoinSource !== this.props.selectedCoinSource) {
      this.clearCoin();
    }
  }

  detectCodes(event) {
    this.keyLogClearIntervals.forEach((handle) => clearTimeout(handle))
    this.keyLogClearIntervals = []

    if (this.keyLog.length > this.MAX_CODE_CHARS) this.keyLog = [event.key]
    else this.keyLog.push(event.key)

    this.keyLogClearIntervals.push(setTimeout(() => {
      this.keyLog = []
    }, 1000))
    
    const enteredCode = this.keyLog.filter((value) => value !== 'Shift').join('')

    // Filter out shift key
    if (Object.keys(this.SECRET_CODES).includes(enteredCode)) {
      this.props.dispatch(newSnackbar(INFO_SNACK, this.SECRET_CODES[enteredCode].message, MID_LENGTH_ALERT))
      this.SECRET_CODES[enteredCode].event()
    }
  }

  switchToDefaultSrc(e) {
    e.target.src = CHAIN_FALLBACK_IMAGE
  }

  chooseMode() {
    const { selectedMode, chosenCoin } = this.state
    const { available_modes } = chosenCoin
    
    const mode =
      selectedMode === NATIVE
        ? NATIVE
        : available_modes[ETH]
        ? ETH
        : available_modes[ERC20]
        ? ERC20
        : ELECTRUM;

    if (selectedMode) {
      this.props.setAddCoinParams(
        {coinObj: chosenCoin, mode, startParams: this.generateStartupOptions()},
        () => {
          this.props.dispatch(setModalNavigationPath(`${getPathParent(this.props.modalPathArray)}/${CONFIGURE}_${selectedMode}`))
      })      
    }
  }

  generateStartupOptions() {
    let startupOptions = []
    const { nativeOptions, electrumOptions } = this.state
    
    for (let key in nativeOptions) {
      if (nativeOptions[key] && typeof nativeOptions[key] === "boolean") {
        startupOptions.push(key)
      } else if (typeof nativeOptions[key] === "string" && !isNaN(Number(nativeOptions[key]))) {
        startupOptions.push(`${key}${Number(nativeOptions[key])}`)
      }
    }

    for (let key in electrumOptions) {
      if (electrumOptions[key] && typeof electrumOptions[key] === "boolean") {
        startupOptions.push(key)
      } else if (typeof electrumOptions[key] === "string" && !isNaN(Number(electrumOptions[key]))) {
        startupOptions.push(`${key}${Number(electrumOptions[key])}`)
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

  checkBoxElectrum(e) {
    this.setState({electrumOptions: {...this.state.electrumOptions, [e.target.name]: e.target.checked}})
  }

  updateThreads(e) {
    this.setState({nativeOptions: {...this.state.nativeOptions, [NATIVE_MINE_THREADS]: e.target.value}})
  }

  getSelectedCoin(coinObj, cb = () => {}) {
    this.setState({
      selectedCoin: coinObj
    }, cb)
  }

  chooseCoin() {
    let chosenCoin = this.state.selectedCoin
    const availableModes = chosenCoin.available_modes

    let selectedMode
    if (availableModes[NATIVE]) selectedMode = NATIVE;
    else if (
      availableModes[ETH] ||
      availableModes[ELECTRUM] ||
      availableModes[ERC20]
    ) {
      selectedMode = LITE;
    }

    this.setState({ chosenCoin, selectedMode })
  }

  clearCoin() {
    this.setState({
      chosenCoin: null,
      selectedMode: null,
      selectedCoin: null,
      nativeOptions: {
        [NATIVE_MINE]: false,
        [NATIVE_MINE_THREADS]: "",
        [NATIVE_STAKE]: false,
        [NATIVE_RESCAN]: false,
        [NATIVE_REINDEX]: false
      },
      electrumOptions: {
        [ELECTRUM_NSPV]: false,
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