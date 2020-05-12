import React from 'react';
import { connect } from 'react-redux';
import { 
  UnlockProfileRender,
} from './unlockProfile.render';
import { decryptKey } from '../../../util/api/users/pinData'
import { NATIVE, SUCCESS_SNACK, MID_LENGTH_ALERT } from '../../../util/constants/componentConstants'
import { authenticateActiveUser, loginUser, newSnackbar } from '../../../actions/actionCreators'

class UnlockProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formError: false,
      formLock: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.finishLogin = this.finishLogin.bind(this)
  }

  componentDidMount() {
    const { defaultUser, loadedUsers, selectedUser } = this.props
    const currentUser = loadedUsers[selectedUser ? selectedUser : defaultUser]

    if (Object.values(currentUser.startCoins).every((coinObj) => {
      return coinObj.mode === NATIVE
    }) || currentUser.pinFile == null) {
      this.finishLogin()
    } else {
      this.pwdInput.focus()
    }
  }

  handleSubmit(password) {
    const { loadedUsers, selectedUser, defaultUser, dispatch } = this.props
    const userId = selectedUser ? selectedUser : defaultUser

    this.setState({ formLock: true, formError: false }, async () => {
      try {
        const seed = await decryptKey(password, loadedUsers[userId].pinFile)

        dispatch(await authenticateActiveUser(seed))
        this.finishLogin()
      } catch (e) {
        console.error(e.message)
        this.setState({ formLock: false, formError: e.message })
      }
    })
  }

  finishLogin() {
    const { selectedUser, dispatch, defaultUser, loadedUsers } = this.props

    dispatch(newSnackbar(SUCCESS_SNACK, `User ${selectedUser ? loadedUsers[selectedUser].name : loadedUsers[defaultUser].name} logged in!`, MID_LENGTH_ALERT))
    loginUser(selectedUser ? loadedUsers[selectedUser] : loadedUsers[defaultUser]).map((action) => {
      dispatch(action)
    })
  }

  render() {
    return UnlockProfileRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    mainPath: state.navigation.mainPath,
    defaultUser: state.settings.config.general.main.defaultUserId,
    loadedUsers: state.users.loadedUsers,
  };
};

export default connect(mapStateToProps)(UnlockProfile);