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
  MID_LENGTH_ALERT,
  INFO_SNACK,
  ERROR_SNACK,
  WARNING_SNACK
} from "../../../../util/constants/componentConstants";
import { getCoinObj } from "../../../../util/coinData";
import { getPathParent } from "../../../../util/navigationUtils";
import { setModalNavigationPath, newSnackbar } from '../../../../actions/actionCreators'
import { decodeCoinImportFile } from '../../../../util/coinImports';

class SelectCoin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCoin: null,
      chosenCoin: null,
      selectedMode: null,
      addFromFile: false,
      coinJsonFile: null,
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
    this.generateStartupOptions = this.generateStartupOptions.bind(this)
    this.detectCodes = this.detectCodes.bind(this)
    this.setFiles = this.setFiles.bind(this)
    this.toggleAddFromFile = this.toggleAddFromFile.bind(this)

    this.MAX_CODE_CHARS = 50
    this.keyLog = []
    this.keyLogClearIntervals = []
    this.SECRET_CODES = {
      ["ADDFROMFILE"]: {
        message: 'Add coin source switched.',
        event: this.toggleAddFromFile
      },
      ["AltAltAlt"]: {
        message: 'Add coin source switched.',
        event: this.toggleAddFromFile
      },
      ["ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightbaEnter"]: {
        message: '(╯°□°)╯︵ ┻━┻',
        event: () => {}
      }
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.detectCodes, false);
  }

  setFiles(event) {   
    event.preventDefault()
    const reader = new FileReader()

    this.props.setModalLock(true)
    reader.onload = async (e) => { 
      const text = (e.target.result)
      this.props.setModalLock(false)

      try {
        this.setState({ selectedCoin: decodeCoinImportFile(text) })
      } catch(e) {
        console.log(e)
        this.props.dispatch(newSnackbar(ERROR_SNACK, "Failed to decode provided file.", MID_LENGTH_ALERT))
      }
    };
    reader.readAsText(event.target.files[0]) 
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.detectCodes, false);
  }

  toggleAddFromFile() {
    this.setState({
      addFromFile: !this.state.addFromFile,
      selectedCoin: null,
      chosenCoin: null,
      coinJsonFile: null
    });
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
    
    const mode = selectedMode === NATIVE ? NATIVE : (available_modes[ETH] ? ETH : ELECTRUM)

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
    let chosenCoin

    try {
      chosenCoin = getCoinObj(this.state.selectedCoin.id)

      if (this.state.addFromFile) {
        this.props.dispatch(newSnackbar(WARNING_SNACK, "You cannot import a coin with an already defined ticker symbol, selecting the existing coin.", MID_LENGTH_ALERT))
      }
    } catch(e) {
      chosenCoin = this.state.selectedCoin
    }

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