import React from 'react';
import { connect } from 'react-redux';
import { 
  SignUpRender
} from './signUp.render';
import { setUserAuth, newSnackbar } from '../../../../../actions/actionCreators'
import { SUCCESS_SNACK, MID_LENGTH_ALERT } from '../../../../../util/constants/componentConstants';


class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      attachSeed: false,
      formLock: false,
      formErrors: false
    }

    this.linkUserWithSeed = this.linkUserWithSeed.bind(this)
    this.toggleAttachSeed = this.toggleAttachSeed.bind(this)
  }

  linkUserWithSeed(password) {
    this.props.setModalLock(true)

    this.setState({ formLock: true }, async () => {
      try {
        this.props.dispatch(await setUserAuth(this.props.loadedUsers, this.props.activeUser.id, password, this.props.seed))
        this.props.dispatch(newSnackbar(SUCCESS_SNACK, "User linked with seed!", MID_LENGTH_ALERT))
        this.props.activateCoin()
      } catch (e) {
        this.props.setModalLock(false)
        console.error(e.message)
        this.setState({ formErrors: e.message, formLock: false })
      }
    })
  }

  toggleAttachSeed() {
    this.setState({ attachSeed: !this.state.attachSeed })
  }

  render() {
    return SignUpRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    loadedUsers: state.users.loadedUsers,
    activeUser: state.users.activeUser
  };
};

export default connect(mapStateToProps)(SignUp);