import React from 'react';
import { connect } from 'react-redux';
import { 
  AppsRender,
} from './apps.render';
import { logoutActiveUser } from '../../../actions/actionDispatchers'
import { newSnackbar, setMainNavigationPath, initConfig } from '../../../actions/actionCreators'
import { ERROR_SNACK, POST_AUTH, APPS, SUCCESS_SNACK, MID_LENGTH_ALERT } from '../../../util/constants/componentConstants';
import { saveConfig } from '../../../util/api/settings/configData';

class Apps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyDropdownOpen: false,
      selectedCurrency: this.props.config.general.main.fiatCurrency,
      cards: [],
      secondaryTabs: [],
      logoutDisabled: false
    }

    this.handleClick = this.handleClick.bind(this)
    this.toggleCurrencyDropdown = this.toggleCurrencyDropdown.bind(this)
    this.selectApp = this.selectApp.bind(this)
    this.getCards = this.getCards.bind(this)
    this.getSecondaryTabs = this.getSecondaryTabs.bind(this)
    this.logoutAccount = this.logoutAccount.bind(this)
    this.selectFiatCurrency = this.selectFiatCurrency.bind(this)
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false)
  }
  
  async logoutAccount() {
    const { dispatch, activatedCoins } = this.props

    this.setState({ logoutDisabled: true }, async () => {
      try {
        await logoutActiveUser(activatedCoins, dispatch)
      } catch (e) {
        dispatch(newSnackbar(ERROR_SNACK, `Error logging out: ${e.message}`))
        this.setState({ logoutDisabled: false })
      }
    })
    
  }

  selectApp(app) {
    this.props.dispatch(setMainNavigationPath(`${POST_AUTH}/${APPS}/${app}`))
  }

  selectFiatCurrency(currency) {
    this.setState({currencyDropdownOpen: false}, async () => {
      const { config, dispatch } = this.props

      let error = false
      const newConfig = {
        ...config,
        general: {
          ...config.general,
          main: {
            ...config.general.main,
            fiatCurrency: currency.toUpperCase()
          }
        }
      }
  
      try {
        await saveConfig(newConfig)
      } catch (e) {
        console.error(e)
        error = true
        dispatch(newSnackbar(ERROR_SNACK, "Error saving currency settings to config file."))
      }
  
      // Re fetch data from config file to ensure everything made sense
      // and was saved correctly and to prevent user from being surprised if
      // config isnt what they intended it to be
      initConfig()
      .then((configActionArr) => {          
        configActionArr.map(configAction => {
          dispatch(configAction)
        })
      })
      .catch(e => {
        console.error(e)
        error = true
        dispatch(newSnackbar(ERROR_SNACK, "Error saving currency settings to config file."))
      })
  
      if (!error) {
        dispatch(newSnackbar(SUCCESS_SNACK, "Currency setting saved succesfully!", MID_LENGTH_ALERT))
      }
    })
  }
  

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false)
  }

  getCards(componentArray) {
    this.setState({cards: componentArray})
  }

  getSecondaryTabs(componentArray) {
    this.setState({secondaryTabs: componentArray})
  }

  handleClick(e) {
    if (this.dropdownMenu.contains(e.target)) return
    else this.setState({currencyDropdownOpen: false})
  }

  toggleCurrencyDropdown() {
    this.setState({currencyDropdownOpen: !this.state.currencyDropdownOpen})
  }

  render() {
    return AppsRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    mainPathArray: state.navigation.mainPathArray,
    config: state.settings.config,
    activatedCoins: state.coins.activatedCoins,
    fiatCurrency: state.settings.config.general.main.fiatCurrency,
  };
};

export default connect(mapStateToProps)(Apps);