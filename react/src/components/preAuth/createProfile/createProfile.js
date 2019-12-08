import React from 'react';
import { connect } from 'react-redux';
import { 
  CreateProfileRender
} from './createProfile.render';
import { createUser, setMainNavigationPath, newSnackbar } from '../../../actions/actionCreators'
import { PRE_AUTH, SELECT_PROFILE, ERROR_SNACK, MID_LENGTH_ALERT, SUCCESS_SNACK } from '../../../util/constants/componentConstants'

class CreateProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileName: '',
      loading: false
    }

    this.updateInput = this.updateInput.bind(this)
    this.createUser = this.createUser.bind(this)
    this.validateFormData = this.validateFormData.bind(this)
    this.cancel = this.cancel.bind(this)
  }

  updateInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  validateFormData() {
    if (this.state.profileName.length > 0) {
      this.createUser()
    } else {
      this.props.dispatch(newSnackbar(ERROR_SNACK, 'Please enter a name', MID_LENGTH_ALERT))
    }
  }

  createUser() {
    //TODO: Are you sure? and other validation
    this.setState({loading: true}, () => {
      createUser(this.props.loadedUsers, this.state.profileName)
      .then(userAction => {
        this.props.dispatch(newSnackbar(SUCCESS_SNACK, `Profile ${this.state.profileName} created!`, MID_LENGTH_ALERT))
        this.props.dispatch(userAction) 
        this.props.dispatch(setMainNavigationPath(`${PRE_AUTH}/${SELECT_PROFILE}`))
      })
      .catch(e => {
        this.props.dispatch(newSnackbar(ERROR_SNACK, e.message))
        this.setState({loading: false})
        console.error(e.message)
      })
    })
  }

  cancel() {
    this.props.dispatch(setMainNavigationPath(`${PRE_AUTH}/${SELECT_PROFILE}`))
  }

  render() {
    return CreateProfileRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    mainPath: state.navigation.mainPath,
    loadedUsers: state.users.loadedUsers
  };
};

export default connect(mapStateToProps)(CreateProfile);