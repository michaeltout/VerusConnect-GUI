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
    // Filter out blank arguments
    const argsFiltered = args._.filter(arg => {
      return arg.toString().length > 0
    })   

    const cliCmd = argsFiltered.length ? argsFiltered[0] : 'help'
    let cliParams = argsFiltered.length ? argsFiltered.slice(1, argsFiltered.length) : []
    let cliCmdsParsed = []
    let skipIndexes = []

    // Try to parse json strings, turn boolean strings into booleans, and number strings into numbers
    cliParams = cliParams.map(param => {
      if (param === "true") return true
      if (param === "false") return false
      if (!isNaN(Number(param))) return Number(param)

      return param
    })

    // Make arguments with space surrounded by quotes one argument
    cliParams.forEach((cmdParam, index) => {
      if (!skipIndexes.includes(index)) {
        let parsedParam = cmdParam

        if (typeof cmdParam === 'string' && (cmdParam[0] == "'" || cmdParam[0] == '"')) {
          parsedParam = ""
          let stepIndex = index
          let endChar = cmdParam[0]
          let stepCmd = cliParams[stepIndex]
          let finishedParse = false
  
          while (!finishedParse && typeof stepCmd === 'string' && stepIndex < cliParams.length) {
            stepCmd = cliParams[stepIndex]
            parsedParam += stepIndex == index ? stepCmd : ' ' + stepCmd
            skipIndexes.push(stepIndex)
            
            if (stepCmd[stepCmd.length - 1] === endChar) {
              finishedParse = true
            }
  
            stepIndex++
          }   
          
          parsedParam = parsedParam.replace(endChar === "'" ? /'/g : /"/g, '')

          try {         
            cliCmdsParsed.push(JSON.parse(parsedParam))
          } catch(e) {
            cliCmdsParsed.push(parsedParam)
          }
        } else {
          cliCmdsParsed.push(parsedParam)
        }
      } 
    })

    // Make RPC call based on params given
    customRpcCall(this.props.selectedCoinObj.id, cliCmd, cliCmdsParsed)
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
        } else if (typeof result == 'boolean') {
          print(result ? "true" : "false")
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