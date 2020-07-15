import React from 'react';
import { connect } from 'react-redux';
import { 
  IdInfoRender
} from './idInfo.render';
import { ID_INFO } from "../../../util/constants/componentConstants";

class IdInfo extends React.Component {
  constructor(props) {
    super(props);
    props.setModalHeader(`${props.activeCoin.id} ID`)
  }

  render() {
    return IdInfoRender.call(this);
  }
}

const mapStateToProps = (state) => {
  const { chainTicker } = state.modal[ID_INFO]

  return {
    activeCoin: state.coins.activatedCoins[chainTicker],
    activeIdentity: state.modal[ID_INFO].activeIdentity,
    openIdentity: state.modal[ID_INFO].openIdentityCard,
    openCurrency: state.modal[ID_INFO].openCurrencyCard
  };
};

export default connect(mapStateToProps)(IdInfo);