import React from 'react';
import { connect } from 'react-redux';
import { 
  ConvertCurrencyFormRender
} from './convertCurrencyForm.render';
import {
  API_GET_RESERVE_TRANSFERS,
  API_SUCCESS,
  CONVERT_CURRENCY,
  ENTER_DATA,
  ERROR_SNACK,
  NATIVE,
  SEND_RESULT,
  SIMPLE_CONVERSION,
} from "../../../../util/constants/componentConstants";
import { getCurrencyConversionPaths, getIdentity, sendCurrency } from '../../../../util/api/wallet/walletCalls';
import { expireData, newSnackbar } from '../../../../actions/actionCreators';

class ConvertCurrencyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fromAddress: '*',
      outputs: [{
        currency: null,
        amount: 0,
        convertto: null,
        via: null,
        address: "",
        refundto: null,
        memo: null,
        preconvert: null
      }],
      estArrivals: [],
      conversionPaths: {},
      nameMap: {},
      selectedConversionPath: null,
      addresses: [],
      formStep: ENTER_DATA,
      confirmOutputIndex: 0
    };

    this.updateOutput = this.updateOutput.bind(this)
    this.selectSimpleSourceCurrency = this.selectSimpleSourceCurrency.bind(this)
    this.selectConversionPath = this.selectConversionPath.bind(this)
    this.processAddresses = this.processAddresses.bind(this)
    this.setFormStep = this.setFormStep.bind(this)
    this.resetState = this.resetState.bind(this)
    this.confirmSend = this.confirmSend.bind(this)
    this.addOutput = this.addOutput.bind(this)
    this.removeOutput = this.removeOutput.bind(this)
  }

  async componentDidMount() {
    await this.processAddresses()
  }

  resetState() {
    this.setState({
      fromAddress: '*',
      outputs: [{
        currency: null,
        amount: 0,
        convertto: null,
        via: null,
        address: "",
        refundto: null,
        memo: null,
        preconvert: null
      }],
      estArrivals: [],
      conversionPaths: {},
      nameMap: {},
      selectedConversionPath: null,
      addresses: [],
      formStep: ENTER_DATA,
      confirmOutputIndex: 0
    }, () => {
      this.processAddresses()
    })
  }

  componentDidUpdate(lastProps, lastState) {
    if (lastProps.mode !== this.props.mode) this.resetState()

    if (
      this.props.mode === SIMPLE_CONVERSION &&
      (lastProps.info != this.props.info ||
        lastState.outputs.length != this.state.outputs.length ||
        !lastState.outputs.every(
          (output, index) =>
            output.address === this.state.outputs[index].address
        ))
    ) {
      let arrivals = [];

      let outputs = this.state.outputs.map((x) => {
        const isPreconvert =
          x.convertto != null &&
          this.state.conversionPaths[x.convertto] &&
          this.props.info.longestchain &&
          this.state.conversionPaths[x.convertto].destination.startblock >
            this.props.info.longestchain;

        arrivals.push(
          isPreconvert
            ? this.state.conversionPaths[x.convertto].destination.startblock -
                this.props.info.longestchain
            : null
        );
        return {
          currency: x.currency,
          amount: x.amount,
          convertto: x.convertto,
          via: x.via,
          address: x.address,
          refundto: isPreconvert ? x.address : null,
          memo: x.memo,
          preconvert: isPreconvert,
        };
      });

      this.setState({
        outputs,
        estArrivals: arrivals,
      });
    }
  }

  async confirmSend() {
    try {
      const response = await sendCurrency(this.props.modalProps.chainTicker, this.state.fromAddress, this.state.outputs)

      if (response.msg === 'success') {
        this.props.dispatch(expireData(this.props.modalProps.chainTicker, API_GET_RESERVE_TRANSFERS))
        this.setState({
          formStep: SEND_RESULT
        })
      } else this.props.dispatch(newSnackbar(ERROR_SNACK, "Error: " + response.result))
      
    } catch(e) {
      this.props.dispatch(newSnackbar(ERROR_SNACK, "Error: " + e.message))
    }
  }

  updateOutput(key, value, index = 0) {
    let outputs = this.state.outputs
    outputs[index][key] = value

    this.setState({
      outputs
    })
  }

  addOutput() {
    this.setState({
      outputs: [...this.state.outputs, {
        currency: null,
        amount: 0,
        convertto: null,
        via: null,
        address: "",
        refundto: null,
        memo: null,
        preconvert: null
      }]
    })
  }

  removeOutput(atIndex) {
    this.setState({
      outputs: this.state.outputs.filter((value, index) => index !== atIndex)
    })
  }

  setFormStep(step) {
    this.setState({
      formStep: step
    })
  }

  selectConversionPath(path) {
    const selectedPathObj = this.state.conversionPaths[path]

    this.setState({
      selectedConversionPath: selectedPathObj.destination.currencyid
    }, () => {
      this.updateOutput("convertto", selectedPathObj.destination.currencyid)
      if (selectedPathObj.via) this.updateOutput("via", selectedPathObj.via.currencyid)
      else this.updateOutput("via", null)
    })
  }

  async processAddresses() {
    let addrList = []

    for (const x of Object.values(this.props.addresses)) {
      for (const value of x) {
        if (value.tag === 'identity' && !value.address.includes("@")) {
          try {
            const id = await getIdentity(
              NATIVE,
              this.props.modalProps.chainTicker,
              value.address
            );

            if (id.msg !== "success")
              throw new Error("Error processing id for " + value.address);

            addrList.push(id.result.identity.name + "@");
          } catch (e) {
            console.error(e)
            addrList.push(value.address);
          }
        } else addrList.push(value.address);
      }
    }

    this.setState({
      addresses: addrList
    })
  }

  selectSimpleSourceCurrency(source) {
    this.setState({
      conversionPaths: {},
      selectedConversionPath: null
    }, () => {
      this.updateOutput("convertto", null)
      this.updateOutput("currency", source)
      this.fetchConversionPaths(source)
    })
  }

  async fetchConversionPaths(from) {
    this.props.setLoading(true, "Searching for currency conversions...")
    const response = await getCurrencyConversionPaths(NATIVE, this.props.modalProps.chainTicker, from)

    if (response.msg === API_SUCCESS) {
      let nameMap = {}
      Object.values(response.result).map(x => {
        nameMap[x.destination.name] = x.destination.currencyid
      })

      this.setState({ conversionPaths: response.result, nameMap })
    } else {
      this.props.dispatch(newSnackbar(ERROR_SNACK, "Error fetching potential conversions!"))
    }

    this.props.setLoading(false)
  }

  render() {
    return ConvertCurrencyFormRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    modalProps: state.modal[CONVERT_CURRENCY],
    addresses: state.ledger.addresses[state.modal[CONVERT_CURRENCY].chainTicker],
    info: state.ledger.info[state.modal[CONVERT_CURRENCY].chainTicker],
    balances: state.ledger.balances[state.modal[CONVERT_CURRENCY].chainTicker],
  };
};

export default connect(mapStateToProps)(ConvertCurrencyForm);