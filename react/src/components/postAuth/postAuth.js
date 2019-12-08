import React from 'react';
import { connect } from 'react-redux';
import { APPS, UX_SELECTOR } from '../../util/constants/componentConstants'
import { saveUsers } from '../../util/api/users/userData'
import UxSelector from './uxSelector/uxSelector'
import Apps from './apps/apps'
import Store from '../../store'

const COMPONENT_MAP = {
  [UX_SELECTOR]: <UxSelector />,
  [APPS]: <Apps />
}

class PostAuth extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.saveUsersToFile);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.saveUsersToFile)
    this.saveUsersToFile()
  }

  async saveUsersToFile() {
    // Avoid connecting component to users object in store to prevent re-renders
    const users = Store.getState().users.loadedUsers
    saveUsers(users)
  }

  render() {
    return this.props.mainPathArray[1] ? COMPONENT_MAP[this.props.mainPathArray[1]] : null
  }
}

const mapStateToProps = (state) => {
  return {
    mainPathArray: state.navigation.mainPathArray,
  };
};

export default connect(mapStateToProps)(PostAuth);
