import React from 'react';
import { connect } from 'react-redux';
import { 
  SelectProfileRender
} from './selectProfile.render';
import { setMainNavigationPath, loginUser, setConfigParams, newSnackbar } from '../../../actions/actionCreators'
import { PRE_AUTH, CREATE_PROFILE, ERROR_SNACK, UNLOCK_PROFILE } from '../../../util/constants/componentConstants'

class SelectProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setAsDefaultUser: false,
      loading: false
    }

    this.loginProfile = this.loginProfile.bind(this)
    this.validateFormData = this.validateFormData.bind(this)
    this.updateSelection = this.updateSelection.bind(this)
    this.updateCheckbox = this.updateCheckbox.bind(this)
    this.newProfile = this.newProfile.bind(this)
  }

  componentDidMount() {
    this.props.setSelectedUser(Object.keys(this.props.loadedUsers)[0])
  }

  loginProfile() {
    const { selectedUser, config, dispatch } = this.props
    const { setAsDefaultUser } = this.state

    const dispatchDefaultUser = async () => {
      try {
        dispatch(await setConfigParams(config, { defaultUserId: setAsDefaultUser ? selectedUser : "" }))
      } catch (e) {
        dispatch(newSnackbar(ERROR_SNACK, e.message))
        console.error(e)
      }
    }

    dispatchDefaultUser()
    dispatch(setMainNavigationPath(`${PRE_AUTH}/${UNLOCK_PROFILE}`))
  }

  updateSelection(e) {
    this.props.setSelectedUser(e.target.options[e.target.selectedIndex].value)
  }

  updateCheckbox(e) {
    this.setState({
      [e.target.name]: e.target.checked,
    });
  }

  validateFormData() {
    if (Object.keys(this.props.loadedUsers).includes(this.props.selectedUser)) {
      this.loginProfile()
    } else {
      this.props.dispatch(newSnackbar(ERROR_SNACK, 'Selected profile does not exist.'))
    }
  }

  newProfile() {
    this.props.dispatch(setMainNavigationPath(`${PRE_AUTH}/${CREATE_PROFILE}`))
  }

  render() {
    return SelectProfileRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    mainPath: state.navigation.mainPath,
    loadedUsers: state.users.loadedUsers,
    config: state.settings.config
  };
};

export default connect(mapStateToProps)(SelectProfile);