import React from 'react';
import { connect } from 'react-redux';
import { 
  CoinSettingsRender,
} from './coinSettings.render';
import { NATIVE } from '../../../../../util/constants/componentConstants';

class CoinSettings extends React.Component {
  constructor(props) {
    super(props);
    this.availableModeArr = [NATIVE] /*Object.keys(props.selectedCoinObj.available_modes).filter(mode => {
      return props.selectedCoinObj.available_modes[mode]
    })*/
    //TODO: Uncomment this when you add settings for electrum or eth modes

    this.state = {
      activeTab: 0,
      tabs: this.availableModeArr
    }

    this.handleTabChange = this.handleTabChange.bind(this)
    this.setConfigValue = this.setConfigValue.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedCoinObj != this.props.selectedCoinObj) {      
      //TODO: Uncomment this when you add settings for electrum or eth modes
      /*this.availableModeArr = Object.keys(nextProps.selectedCoinObj.available_modes).filter(mode => {
        return nextProps.selectedCoinObj.available_modes[mode]
      })*/

      this.setState({ activeTab: 0, tabs: this.availableModeArr })
    }
  }

  setConfigValue(name, value) {
    const { props, state } = this
    const { displayConfig, setDisplayConfig, selectedCoinObj } = props
    const { activeTab, tabs } = state

    setDisplayConfig({
      ...displayConfig,
      coin: {
        ...displayConfig.coin,
        [tabs[activeTab]]: {
          ...displayConfig.coin[tabs[activeTab]],
          [name]: {
            ...displayConfig.coin[tabs[activeTab]][name],
            [selectedCoinObj.id]: value
          }
        }
      }
    });
  }

  handleTabChange(event, newTab) {
    this.setState({ activeTab: newTab });
  };

  render() {
    return CoinSettingsRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    mainPath: state.navigation.mainPath,
    configSchema: state.settings.configSchema.coin
  };
};

export default connect(mapStateToProps)(CoinSettings);