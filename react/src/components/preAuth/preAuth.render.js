const { shell } = window.require('electron');
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

  const DISCORD_LINK = "https://discord.gg/VRKMP2S"
  const WIKI_LINK = "https://wiki.veruscoin.io/#!index.md"

  return (
    <div className="d-flex d-sm-flex d-md-flex align-items-center align-items-sm-center align-items-md-center contact-clean pre-auth-container">
      <div className="pre-auth-inner-container">
        <div className="text-center pre-auth-header-container">
          <img src="assets/images/verus-graphics/truthandprivacyforall.png" width="325px" height="40px"/>
          {/*<h1 className="pre-auth-logo-header">Verus</h1>*/}
        </div>
        {this.props.mainPathArray[1] ? COMPONENT_MAP[this.props.mainPathArray[1]] : null}
        <div className="pre-auth-help-links-container">
          <div className="pre-auth-help-links-inner-container">
            <div className="pre-auth-help-links-title">
              {"Need assistance?"}
            </div>
            <div className="pre-auth-help-links">
              <div>
                <a
                  href="#"
                  className="pre-auth-help-link"
                  onClick={() => shell.openExternal(WIKI_LINK)}
                >
                  {"Verus Wiki"}
                </a>
              </div>
              <div>
                <a
                  href="#"
                  className="pre-auth-help-link"
                  onClick={() => shell.openExternal(DISCORD_LINK)}
                >
                  {"Ask on Discord"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


