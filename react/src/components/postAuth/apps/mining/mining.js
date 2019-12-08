import React from 'react';
import { connect } from 'react-redux';
import { 
  MiningRender
} from './mining.render';

class Mining extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return MiningRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    mainPath: state.navigation.mainPath,
  };
};

export default connect(mapStateToProps)(Mining);