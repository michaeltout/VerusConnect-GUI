import React from 'react';
import { connect } from 'react-redux';
import { 
  ProfileSettingsRender,
} from './profileSettings.render';
import {
  UX_SELECTOR,
  WALLET,
  MINING,
  PLACEHOLDER,
  POST_AUTH,
  APPS,
  ETH,
  NATIVE,
  ELECTRUM,
  IDENTITIES,
} from "../../../../../util/constants/componentConstants";
import { getSimpleCoinArray, getCoinObj, getCoinColor } from "../../../../../util/coinData";

class ProfileSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedStartLocation: PLACEHOLDER,
      selectedStartCoins: props.activeUser.startCoins,
      selectedCoin: PLACEHOLDER,
      selectedCoinObj: {
        available_modes: {
          [ETH]: false,
          [NATIVE]: false,
          [ELECTRUM]: false
        }
      },
      selectedStartupOptionCoin: PLACEHOLDER,
      startupOptionText: '',
      startupOptions: props.activeUser.startupOptions
    }

    this.locationPresets = [UX_SELECTOR, WALLET, IDENTITIES, MINING]
    this.startCoinOptions = getSimpleCoinArray()
    this.setStartScreen = this.setStartScreen.bind(this)
    this.setStartCoins = this.setStartCoins.bind(this)
    this.updateLocationSelection = this.updateLocationSelection.bind(this)
    this.updateCoinSelection = this.updateCoinSelection.bind(this)
    this.addStartCoin = this.addStartCoin.bind(this)
    this.addStartupOption = this.addStartupOption.bind(this)
    this.removeStartupOption = this.removeStartupOption.bind(this)
    this.updateStartupOptionText = this.updateStartupOptionText.bind(this)
    this.updateStartupOptionCoinSelection = this.updateStartupOptionCoinSelection.bind(this)
  }

  updateLocationSelection(e) {
    const { setDisplayUser, displayUser } = this.props
    const newLocation = e.target.options[e.target.selectedIndex].value
    const startLocationPath = this.getStartLocationPath(newLocation)
      
    if (this.state.selectedStartLocation) {
      setDisplayUser({ ...displayUser, startLocation: startLocationPath })
    }

    this.setState({ selectedStartLocation: newLocation })
  }

  updateCoinSelection(e) {
    const selectedCoin = e.target.options[e.target.selectedIndex].value
    const coinObj = getCoinObj(selectedCoin, false)

    this.setState({ selectedCoinObj: coinObj, selectedCoin })
  }

  updateStartupOptionCoinSelection(e) {
    const selectedStartupOptionCoin = e.target.options[e.target.selectedIndex].value

    this.setState({ selectedStartupOptionCoin })
  }

  updateStartupOptionText(text) {
    this.setState({ startupOptionText: text })
  }

  addStartupOption() {
    const { selectedStartupOptionCoin, startupOptionText } = this.state
    let startupOption = startupOptionText

    if (startupOption[0] !== '-') {
      startupOption = "-" + startupOption
    }

    this.setState(
      {
        startupOptions: {
          ...this.state.startupOptions,
          [NATIVE]: {
            ...this.state.startupOptions[NATIVE],
            [selectedStartupOptionCoin]:
              this.state.startupOptions[NATIVE][selectedStartupOptionCoin] ==
              null
                ? [startupOption]
                : [
                    ...this.state.startupOptions[NATIVE][
                      selectedStartupOptionCoin
                    ],
                    startupOption,
                  ],
          },
        },
      },
      () => this.setStartupOptions()
    );
  }

  removeStartupOption(option) {
    const { selectedStartupOptionCoin } = this.state 

    this.setState(
      {
        startupOptions: {
          ...this.state.startupOptions,
          [NATIVE]: {
            ...this.state.startupOptions[NATIVE],
            [selectedStartupOptionCoin]: this.state.startupOptions[NATIVE][
              selectedStartupOptionCoin
            ].filter((x) => x !== option),
          },
        },
      },
      () => this.setStartupOptions()
    );
  }

  async addStartCoin(mode) {
    const { selectedCoinObj, selectedStartCoins } = this.state

    const completeCoinObj = { ...selectedCoinObj, mode, themeColor: await getCoinColor(selectedCoinObj.id, selectedCoinObj.available_modes) }
    this.setState(
      { selectedStartCoins: {...selectedStartCoins, [completeCoinObj.id]: completeCoinObj} },
      () => this.setStartCoins(false)
    );
  }

  removeStartCoin(chainTicker) {
    let newStartCoins = { ...this.state.selectedStartCoins }
    delete newStartCoins[chainTicker]

    this.setState(
      {
        selectedStartCoins: newStartCoins
      },
      () => this.setStartCoins(false)
    );
  }

  getStartLocationPath(startLocation) {
    return (startLocation === UX_SELECTOR || startLocation === PLACEHOLDER)
    ? `${POST_AUTH}/${UX_SELECTOR}`
    : `${POST_AUTH}/${APPS}/${startLocation}`;
  }

  setStartScreen(startAtLastLocation) {
    const { setDisplayUser, displayUser, mainPath } = this.props
    const { selectedStartLocation } = this.state
    const startLocationPath = this.getStartLocationPath(selectedStartLocation)

    if (startAtLastLocation) {
      setDisplayUser({ ...displayUser, startAtLastLocation: true, startLocation: mainPath })
    } else {
      if (selectedStartLocation === PLACEHOLDER) {
        this.setState({ selectedStartLocation: UX_SELECTOR }, () => {
          setDisplayUser({ ...displayUser, startAtLastLocation: false, startLocation: startLocationPath })
        })
      } else {
        setDisplayUser({ ...displayUser, startAtLastLocation: false, startLocation: startLocationPath })
      }
    }
  }

  setStartCoins(startWithLastCoins) {
    const { setDisplayUser, displayUser, activatedCoins } = this.props
    const { selectedStartCoins } = this.state

    if (startWithLastCoins) {
      setDisplayUser({ ...displayUser, startWithLastCoins: true, startCoins: activatedCoins })
    } else {
      setDisplayUser({ ...displayUser, startWithLastCoins: false, startCoins: selectedStartCoins })
    }
  }

  setStartupOptions() {
    const { setDisplayUser, displayUser } = this.props
    const { startupOptions } = this.state

    setDisplayUser({ ...displayUser, startupOptions })
  }

  render() {
    return ProfileSettingsRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    mainPath: state.navigation.mainPath,
    activatedCoins: state.coins.activatedCoins,
    activeUser: state.users.activeUser
  };
};

export default connect(mapStateToProps)(ProfileSettings);