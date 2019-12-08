import React from 'react';
import { connect } from 'react-redux';
import { 
  GeneralSettingsRender,
} from './generalSettings.render';
import { NATIVE, ELECTRUM, MAIN_SETTINGS } from '../../../../../util/constants/componentConstants';

class GeneralSettings extends React.Component {
  constructor(props) {
    super(props);
    
    this.MAIN_SETTINGS_INDEX = 0
    this.NATIVE_INDEX = 1
    this.ELECTRUM_INDEX = 2

    this.state = {
      activeTab: this.MAIN_SETTINGS_INDEX
    }

    this.tabs = [MAIN_SETTINGS, NATIVE, ELECTRUM]
    this.handleTabChange = this.handleTabChange.bind(this)
    this.setConfigValue = this.setConfigValue.bind(this)
  }

  setConfigValue(name, value) {
    const { tabs, props, state } = this
    const { displayConfig, setDisplayConfig } = props
    const { activeTab } = state
    const generalSettingType = tabs[activeTab]

    setDisplayConfig({
      ...displayConfig,
      general: {
        ...displayConfig.general,
        [generalSettingType]: {
          ...displayConfig.general[generalSettingType],
          [name]: value
        }
      }
    });
  }

  handleTabChange(event, newTab) {
    this.setState({ activeTab: newTab });
  };

  render() {
    return GeneralSettingsRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    mainPath: state.navigation.mainPath,
    configSchema: state.settings.configSchema.general
  };
};

export default connect(mapStateToProps)(GeneralSettings);