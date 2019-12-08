import React from 'react';
import { connect } from 'react-redux';
import { 
  PbaasChainInfoRender
} from './pbaasChainInfo.render';

class PbaasChainInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return PbaasChainInfoRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    mainPath: state.navigation.mainPath,
  };
};

export default connect(mapStateToProps)(PbaasChainInfo);