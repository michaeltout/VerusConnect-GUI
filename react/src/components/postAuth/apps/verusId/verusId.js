import React from 'react';
import { connect } from 'react-redux';
import { 
  VerusIdRender,
} from './verusId.render';

class VerusId extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return VerusIdRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    mainPath: state.navigation.mainPath,
  };
};

export default connect(mapStateToProps)(VerusId);