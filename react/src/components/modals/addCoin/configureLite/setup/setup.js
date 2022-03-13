import React from 'react';
import { connect } from 'react-redux';
import { 
  SetupRender
} from './setup.render';
import { setModalNavigationPath } from '../../../../../actions/actionCreators'
import { getPathParent } from '../../../../../util/navigationUtils'
import { SIGN_UP } from '../../../../../util/constants/componentConstants'
import { closeTextDialog, openTextDialog } from '../../../../../actions/actionDispatchers';

class Setup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      importSeed: false,
    }

    this.toggleSeedGenerator = this.toggleSeedGenerator.bind(this)
    this.submitSeed = this.submitSeed.bind(this)
  }

  toggleSeedGenerator() {
    this.setState({ importSeed: !this.state.importSeed })
  }

  warnSeedLength(cb) {
    openTextDialog(
      closeTextDialog,
      [
        {
          title: "Cancel",
          onClick: () => {
            cb(false);
            closeTextDialog();
          },
        },
        {
          title: "Continue Anyway",
          onClick: () => {
            cb(true);
            closeTextDialog();
          },
        },
      ],
      'The seed you entered is short. Short seeds are usually easy to guess or brute force, and anyone that is able to do so will have access to your funds. Please consider moving your funds to a wallet with a longer and/or more complex seed.',
      "Warning!"
    );
  }

  submitSeed(seed) {
    const setupSeed = () => {
      this.props.setSeed(seed, () => {
        this.props.dispatch(setModalNavigationPath(`${getPathParent(this.props.modalPathArray)}/${SIGN_UP}`))
      })
    }

    if (seed.length < 30) {
      this.warnSeedLength((continueAnyway) => {
        if (continueAnyway) {
          setupSeed()
        }
      })
    } else {
      setupSeed()
    }
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