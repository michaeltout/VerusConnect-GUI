import React from 'react';
import { connect } from 'react-redux';
import { 
  IdInfoRender
} from './idInfo.render';
import { ID_INFO } from "../../../util/constants/componentConstants";

class IdInfo extends React.Component {
  constructor(props) {
    super(props);
    const { activeIdentity } = props
    const { identity } = activeIdentity

    props.setModalHeader(`${identity.name}@ Info`)
    this.displayObj = {
      ["Name:"]: `${identity.name}@`,
      ["ID Address:"]: identity.identityaddress,
      ["First Primary Address:"]: identity.primaryaddresses[0],
      ["Minimum Signatures:"]: identity.minimumsignatures,
      ["Parent:"]: identity.parent,
      ["Revocation Authority:"]: identity.revocationauthority,
      ["Recovery Authority:"]: identity.recoveryauthority,
      ["Status:"]: `${activeIdentity.status} as of block ${activeIdentity.blockheight}.`,
      ["Transaction ID:"]: activeIdentity.txid,
      ["Can Spend:"]: activeIdentity.canspendfor ? "Yes" : "No",
      ["Can Sign:"]: activeIdentity.cansignfor ? "Yes" : "No",
    }
  }

  render() {
    return IdInfoRender.call(this);
  }
}

const mapStateToProps = (state) => {
  const { chainTicker } = state.modal[ID_INFO]

  return {
    activeCoin: state.coins.activatedCoins[chainTicker],
    activeIdentity: state.modal[ID_INFO].activeIdentity
  };
};

export default connect(mapStateToProps)(IdInfo);