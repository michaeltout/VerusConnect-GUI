import React from 'react';
import {
  initUsers,
  setMainNavigationPath,
  loginUser,
  initConfig,
  setModalNavigationPath,
  initStaticSystemData
} from '../../actions/actionCreators';
import { refreshSystemIntervals } from '../../actions/actionDispatchers'
import mainWindow, { staticVar } from '../../util/mainWindow';
import { POST_AUTH, PRE_AUTH, SELECT_PROFILE, ERROR_SNACK, MID_LENGTH_ALERT, NATIVE, UNLOCK_PROFILE } from '../../util/constants/componentConstants';
import { getCoinObj } from '../../util/coinData';
import Config from '../../config';
import { connect } from 'react-redux';
import PostAuth from '../postAuth/postAuth'
import PreAuth from '../preAuth/preAuth'
import Modal from '../modals/modal'
import SnackbarAlert from '../snackbarAlert/snackbarAlert'
import { newSnackbar, setConfigParams } from '../../actions/actionCreators'

import Store from '../../store'

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const appVersion = mainWindow.appBasicInfo;
    const { dispatch } = this.props

    // Initialize system data intervals and clear any old ones
    refreshSystemIntervals()

    // Load users and config from file, system data from systeminformation lib
    Promise.all([initUsers(), initConfig(), initStaticSystemData()])
    .then(async (actionArray) => {
      const userAction = actionArray[0]
      const configActionArr = actionArray[1]
      const staticSystemDataAction = actionArray[2]
      
      // Dispatch users, config, and system info to store
      dispatch(userAction)
      dispatch(staticSystemDataAction)
      configActionArr.map(configAction => {
        dispatch(configAction)
      })

      const { loadedUsers, config } = this.props
      const { defaultUserId } = config

      // Setup initial navigation state
      if (defaultUserId && defaultUserId.length > 0 && loadedUsers[defaultUserId]) {
        if (Object.values(loadedUsers[defaultUserId].startCoins).every((coinObj) => {
          return coinObj.mode === NATIVE
        }) || loadedUsers[defaultUserId].pinFile == null) {
          loginUser(loadedUsers[defaultUserId]).map((action) => {
            dispatch(action)
          })
        } else {
          dispatch(setMainNavigationPath(`${PRE_AUTH}/${UNLOCK_PROFILE}`))
        }
      } else if (defaultUserId && defaultUserId.length > 0) {
        try {
          dispatch(await setConfigParams(config, { defaultUserId: '' }))
        } catch (e) {
          dispatch(newSnackbar(ERROR_SNACK, e.message))
          console.error(e)
        }
      } else if (Object.keys(loadedUsers).length > 0) {
        dispatch(setMainNavigationPath(`${PRE_AUTH}/${SELECT_PROFILE}`))
      }
    })
    .catch(e => {
      dispatch(newSnackbar(ERROR_SNACK, e.message, MID_LENGTH_ALERT))
      console.error(e)
    })

    if (appVersion) {
      const _arch = `${mainWindow.arch === 'x64' ? '' : (mainWindow.arch === 'spv-only' ? '-spv-only' : '-32bit')}`;
      const _version = `v${appVersion.version.replace('version=', '')}${_arch}`;
      
      document.title = `${appVersion.name} (${_version})`;
    }

    // prevent drag n drop external files
    document.addEventListener('dragover', event => event.preventDefault());
    document.addEventListener('drop', event => event.preventDefault());

    // apply dark theme
    if (Config.darkmode) {
      document.body.setAttribute('darkmode', true);
    }

    // Function for debugging store
    /*window.printStore = () => {
      console.log(Store.getState())
    }*/
  }

  render() {
    if (staticVar) {      
      return (
        <div>
          <SnackbarAlert />
          <Modal />
          {this.props.mainPathArray[0] === POST_AUTH ? <PostAuth /> : <PreAuth />}
        </div>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = (state) => {
  return {
    mainPathArray: state.navigation.mainPathArray,
    loadedUsers: state.users.loadedUsers,
    config: state.settings.config,
  };
};

export default connect(mapStateToProps)(Main);
