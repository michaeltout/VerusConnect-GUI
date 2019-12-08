import React from 'react';
import { connect } from 'react-redux';
import { PreAuthRender } from './preAuth.render'

class PreAuth extends React.Component {
  constructor(props) {
    super(props);

    console.log(props)

    this.state = {
      selectedUser: null
    }

    this.getSelectedUser = this.getSelectedUser.bind(this)
  }

  getSelectedUser(selectedUser) {
    this.setState({ selectedUser })
  }

  render() {
    return PreAuthRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    mainPathArray: state.navigation.mainPathArray,
    loadedUsers: state.users.loadedUsers
  };
};

export default connect(mapStateToProps)(PreAuth);
