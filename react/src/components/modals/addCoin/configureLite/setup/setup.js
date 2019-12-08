import React from 'react';
import { connect } from 'react-redux';
import { 
  SetupRender
} from './setup.render';
import { setModalNavigationPath } from '../../../../../actions/actionCreators'
import { getPathParent } from '../../../../../util/navigationUtils'
import { SIGN_UP } from '../../../../../util/constants/componentConstants'

class Setup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      seedGenerator: false,
    }

    this.toggleSeedGenerator = this.toggleSeedGenerator.bind(this)
    this.submitSeed = this.submitSeed.bind(this)
  }

  toggleSeedGenerator() {
    this.setState({ seedGenerator: !this.state.seedGenerator })
  }

  submitSeed(seed) {
    this.props.setSeed(seed, () => {
      this.props.dispatch(setModalNavigationPath(`${getPathParent(this.props.modalPathArray)}/${SIGN_UP}`))
    })
  }

  render() {
    return SetupRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    modalPathArray: state.navigation.modalPathArray,
  };
};

export default connect(mapStateToProps)(Setup);