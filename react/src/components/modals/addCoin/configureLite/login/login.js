import React from 'react';
import { connect } from 'react-redux';
import { 
  LoginRender
} from './login.render';
import { decryptKey } from '../../../../../util/api/users/pinData'

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formError: false,
      formLock: false
    }

    this.submitPassword = this.submitPassword.bind(this)
  }

  submitPassword(password) {
    this.props.setModalLock(true)

    this.setState({ formLock: true, formError: false }, async () => {
      try {
        const seed = await decryptKey(password, this.props.activeUser.pinFile)
        
        this.props.setSeed(seed, () => {
          this.props.activateCoin()
        })
      } catch (e) {
        this.props.setModalLock(false)
        console.error(e.message)
        this.setState({ formLock: false, formError: e.message })
      }
    })
  }

  render() {
    return LoginRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    activeUser: state.users.activeUser,
  };
};

export default connect(mapStateToProps)(Login);