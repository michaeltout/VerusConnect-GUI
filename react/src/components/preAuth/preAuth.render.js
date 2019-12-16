import React from 'react';
import { SELECT_PROFILE, CREATE_PROFILE, UNLOCK_PROFILE } from '../../util/constants/componentConstants';
import CreateProfile from './createProfile/createProfile'
import SelectProfile from './selectProfile/selectProfile'
import UnlockProfile from './unlockProfile/unlockProfile'


export const PreAuthRender = function() {
  const COMPONENT_MAP = {
    [CREATE_PROFILE]: <CreateProfile />,
    [SELECT_PROFILE]: <SelectProfile
      setSelectedUser={ this.getSelectedUser }
      selectedUser = { this.state.selectedUser }
    />,
    [UNLOCK_PROFILE]: <UnlockProfile
      selectedUser = { this.state.selectedUser }
    />
  }

  return (
    <div className="d-flex d-sm-flex d-md-flex align-items-center align-items-sm-center align-items-md-center contact-clean pre-auth-container">
      <div className="pre-auth-inner-container">
        <div className="col-lg-4 col-xl-6 offset-lg-4 offset-xl-3 text-center pre-auth-header-container">
          <img src="assets/images/Verus-Logo.png" width="367px" height="103px"/>
          {/*<h1 className="pre-auth-logo-header">Verus</h1>*/}
        </div>
        {this.props.mainPathArray[1] ? COMPONENT_MAP[this.props.mainPathArray[1]] : null}
      </div>
    </div>
  );
}


