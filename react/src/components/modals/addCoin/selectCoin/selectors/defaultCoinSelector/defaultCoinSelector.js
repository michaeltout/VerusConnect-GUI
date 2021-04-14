import React from 'react';
import { connect } from 'react-redux';
import { getCoinObj } from '../../../../../../util/coinData';
import { 
  DefaultCoinSelectorRender
} from './defaultCoinSelector.render';

class DefaultCoinSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
    this.selectCoin = this.selectCoin.bind(this)
  }

  selectCoin(simpleCoinObj) {
    if (simpleCoinObj == null) {
      this.props.clearCoin()
    } else {
      this.props.setSelectedCoin(getCoinObj(simpleCoinObj.id))
    }
  }

  render() {
    return DefaultCoinSelectorRender.call(this);
  }
}

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps)(DefaultCoinSelector);