import React from 'react';
import { connect } from 'react-redux';
import { 
  SettingsRender,
  SettingsCardRender,
  SettingsTabsRender
} from './settings.render';
import {
  GENERAL_SETTINGS,
  PROFILE_SETTINGS,
  COIN_SETTINGS,
  SUCCESS_SNACK,
  ERROR_SNACK,
  MID_LENGTH_ALERT,
  NATIVE
} from "../../../../util/constants/componentConstants";
import { setMainNavigationPath, initConfig, initUsers, loginUser, newSnackbar } from '../../../../actions/actionCreators';
import { getPathParent } from '../../../../util/navigationUtils';
import { saveConfig } from '../../../../util/api/settings/configData';
import { saveUsers } from '../../../../util/api/users/userData';
import { getSimpleCoinArray, getCoinObj } from '../../../../util/coinData';

//TODO: Re-add coin settings when needed
const SETTINGS_TYPES = [PROFILE_SETTINGS, GENERAL_SETTINGS, COIN_SETTINGS]

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.coinsWithSettings = getSimpleCoinArray().reduce(function(result, simpleCoinObj) {
      const coinObj = getCoinObj(simpleCoinObj.id, false)

      // Currently there are only coin specific settings for native
      if (coinObj.available_modes[NATIVE]) {
        result.push(coinObj);
      }

      return result;
    }, []);

    this.state = {
      displayConfig: props.config,
      displayUser: props.activeUser,
      loading: false,
      selectedCoinObj: this.coinsWithSettings[0],
    }

    this.setCards = this.setCards.bind(this)
    this.setTabs = this.setTabs.bind(this)
    this.getDisplayConfig = this.getDisplayConfig.bind(this)
    this.getDisplayUser = this.getDisplayUser.bind(this)
    this.saveChanges = this.saveChanges.bind(this)
    this.updateCoinSelection = this.updateCoinSelection.bind(this)
    this.setTabs()
    this.setCards()
  }

  componentDidMount() {
    //Set default navigation path to dashboard if wallet is opened without a sub-navigation location
    if (!this.props.mainPathArray[3]) this.props.dispatch(setMainNavigationPath(`${this.props.mainPathArray.join('/')}/${PROFILE_SETTINGS}`)) 
  }

  componentDidUpdate(lastProps) {
    if (lastProps != this.props) {
      this.setCards()
    }
  }

  updateCoinSelection(e) {
    const selectedCoinObj = JSON.parse(e.target.options[e.target.selectedIndex].value)
    
    this.setState({ selectedCoinObj })
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.config != this.state.displayConfig) {
      this.setState({ displayConfig: nextProps.config })
    }

    if (nextProps.activeUser != this.state.displayUser) {
      this.setState({ displayUser: nextProps.activeUser })
    }
  }

  getDisplayConfig(displayConfig) {
    this.setState({ displayConfig })
  }

  getDisplayUser(displayUser) {
    this.setState({ displayUser })
  }

  setTabs() {
    this.props.setTabs(SettingsTabsRender.call(this))
  }

  openSettings(settingsType) {
    this.props.dispatch(setMainNavigationPath(`${getPathParent(this.props.mainPathArray)}/${settingsType}`))
  }

  saveChanges() {
    const { displayConfig, displayUser } = this.state
    const { loadedUsers, dispatch, config, activeUser } = this.props
    let error = false

    this.setState({ loading: true }, async () => {
      try {
        await saveConfig(displayConfig)
        await saveUsers({ ...loadedUsers, [displayUser.id]: displayUser})
      } catch (e) {
        console.error(e)
        error = true
        dispatch(newSnackbar(ERROR_SNACK, "Error saving settings data to file."))
      }

      // Re fetch data from config and user file to ensure everything made sense
      // and was saved correctly and to prevent user from being surprised if
      // config isnt what they intended it to be
      Promise.all([initUsers(), initConfig()])
      .then((actionArray) => {
        const userAction = actionArray[0]
        const configActionArr = actionArray[1]
        
        dispatch(userAction)
        configActionArr.map(configAction => {
          dispatch(configAction)
        })
      })
      .catch(e => {
        console.error(e)
        error = true
        dispatch(newSnackbar(ERROR_SNACK, "Error saving settings data to file."))
      })

      if (!error) {
        this.setState({ loading: false })
        dispatch(newSnackbar(SUCCESS_SNACK, "Settings saved succesfully! Restart for them to take effect.", MID_LENGTH_ALERT))
      }
    })
  }

  setCards() {
    this.props.setCards(SETTINGS_TYPES.map(settingsType => {
      return SettingsCardRender.call(this, settingsType)
    }))
  }

  render() {
    return SettingsRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    mainPathArray: state.navigation.mainPathArray,
    config: state.settings.config,
    activeUser: state.users.activeUser,
    loadedUsers: state.users.loadedUsers
  };
};

export default connect(mapStateToProps)(Settings);