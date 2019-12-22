import React from 'react';
import { connect } from 'react-redux';
import { 
  CoinSettingsRender,
} from './coinSettings.render';
import { NATIVE } from '../../../../../util/constants/componentConstants';
import { customRpcCall } from '../../../../../util/api/wallet/walletCalls';

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
    this.callDaemonCmd = this.callDaemonCmd.bind(this)
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

  callDaemonCmd(args, print) {            
    const cliCmd = args._.length ? args._[0] : 'help'
    let cliParams = args._.length ? args._.slice(1, args._.length) : []

    cliParams = cliParams.map(param => {
      try {
        return JSON.parse(param)
      } catch (e) {
        if (param === "true") return true
        if (param === "false") return false
        if (!isNaN(Number(param))) return Number(param)

        return param 
      }
    })

    customRpcCall(this.props.selectedCoinObj.id, cliCmd, cliParams)
    .then(response => {
      if (response) {
        const { result } = response

        if (result == null) {
          print("No response.")
        } else if (typeof result == 'string') {
          // Format output string in readable format
          print(`${result
            .replace(/{/g, `{`)
            .replace(/\\"/g, `"`)
            .replace(/\\n/g, `\n`)
            .replace(/}/g, `}`)}`)
        } else if (typeof result == 'object') {
          // Format JSON in readable format
          print(JSON.stringify(result)
            .replace(/,/g, ',\n') 
            .replace(/":/g, '": ')
            .replace(/{/g, '{\n')
            .replace(/}/g, '\n}'))
        } else {
          print(result)
        }
      }
    })
    .catch(e => {
      print(e.message)
    })
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