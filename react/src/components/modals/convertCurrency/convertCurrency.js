import React from 'react';
import { connect } from 'react-redux';
import { 
  ConvertCurrencyRender
} from './convertCurrency.render';
import {
  ADVANCED_CONVERSION,
  CONVERSION_OVERVIEW,
  CONVERT_CURRENCY,
  ENTER_DATA,
  SIMPLE_CONVERSION,
  TEST_CHAINS,
} from "../../../util/constants/componentConstants";
const { shell } = window.bridge

class ConvertCurrency extends React.Component {
  constructor(props) {
    super(props);
    this.updateModalButtons = this.updateModalButtons.bind(this)
    this.setSelectedMode = this.setSelectedMode.bind(this)
    this.setLoading = this.setLoading.bind(this)
    this.clearInitCurrency = this.clearInitCurrency.bind(this)

    this.state = {
      selectedMode: props.modalProps.mode || SIMPLE_CONVERSION,
      formStep: ENTER_DATA,
      loading: false,
      loadingText: null,
      initCleared: false
    };

    props.setModalHeader("Convert currencies")
    props.setModalLinks([
      {label: 'Learn more about currencies', onClick: () => shell.openExternal("https://verus.io/technology/currencies")}
    ])
    this.updateModalButtons(props)
  }

  async componentDidMount() {
    // Handle loading here

  }

  componentWillUnmount() {
    this.props.setModalLinks([])
  }

  setLoading(status, text) {
    this.setState({
      loadingText: status ? text : null,
      loading: status ? true : false
    })
  }

  clearInitCurrency() {
    this.setState({
      initCleared: true
    })
  }

  componentDidUpdate(lastProps, lastState) {
    if (
      lastState.selectedMode !== this.state.selectedMode ||
      lastState.formStep !== this.state.formStep
    ) this.updateModalButtons(this.props);
  }

  setSelectedMode(mode) {
    this.setState({
      selectedMode: mode
    })
  }

  updateModalButtons(props) {
    props.setModalButtons([{
      onClick: () => this.setSelectedMode(CONVERSION_OVERVIEW),
      isActive: this.state.selectedMode === CONVERSION_OVERVIEW,
      label: "Overview",
      isDisabled: this.state.formStep !== 0
    },
    {
      onClick: () => this.setSelectedMode(SIMPLE_CONVERSION),
      isActive: this.state.selectedMode === SIMPLE_CONVERSION,
      label: "Simple",
      isDisabled: this.state.formStep !== 0
    },
    {
      onClick: () => this.setSelectedMode(ADVANCED_CONVERSION),
      isActive: this.state.selectedMode === ADVANCED_CONVERSION,
      label: "Advanced",
      isDisabled: this.state.formStep !== 0
    }]);
  }

  render() {
    return ConvertCurrencyRender.call(this);
  }
}

const mapStateToProps = (state) => {
  const { chainTicker } = state.modal[CONVERT_CURRENCY]

  return {
    modalProps: state.modal[CONVERT_CURRENCY],
  };
};

export default connect(mapStateToProps)(ConvertCurrency);