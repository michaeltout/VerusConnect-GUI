import React from 'react';
import {
  initUsers,
  setMainNavigationPath,
  loginUser,
  initConfig,
  setModalNavigationPath
} from '../../actions/actionCreators';
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

//DELET
import Store from '../../store'

//DELET
import { getApiData } from '../../util/api/callCreator'
import { checkZcashParamsFormatted, downloadZcashParams } from '../../util/api/setup/zcashParams'

//DELET
import { getPrivkey, getPubkey, createAddress, getIdentities, getNameCommitments, registerIdName } from '../../util/api/wallet/walletCalls'

//DELET
import { activateChainLifecycle, clearAllCoinIntervals, addCoin, logoutActiveUser } from '../../actions/actionDispatchers'
import { updateFiatPrice } from '../../actions/actions/wallet/dispatchers/updateFiatPrice'

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const appVersion = mainWindow.appBasicInfo;
    const { dispatch } = this.props

    //DELET
    console.log(this.props)

    Promise.all([initUsers(), initConfig()])
    .then(async (actionArray) => {
      const userAction = actionArray[0]
      const configActionArr = actionArray[1]
      
      dispatch(userAction)
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

    //DELET
    window.changepath = (path) => {
      this.props.dispatch(setMainNavigationPath(path))
    }

    //DELET
    window.changepathmodal = (path) => {
      this.props.dispatch(setModalNavigationPath(path))
    }

    //DELET
    window.printStore = () => {
      console.log(Store.getState())
    }

    //DELET
    window.init = (chainTicker, mode) => {
      activateChainLifecycle(mode, chainTicker)
    }

    //DELET
    window.updateFiat = (chainTicker, mode) => {
      updateFiatPrice(Store.getState(), Store.dispatch, mode, chainTicker)
    }

    //DELET
    window.activate_daemon = async (chainTicker, daemon) => {
      console.log(await getApiData('native', 'coins/activate', {chainTicker, launchConfig: {startupParams: [], overrideDaemon: daemon}}))
    }

    //DELET
    window.eth_tx_preflight = async (chainTicker, toAddress, amount, speed) => {
      console.log(await getApiData('eth', 'tx_preflight', {toAddress, amount, chainTicker, speed}, 'post'))
    }

    //DELET
    window.electrum_tx_preflight = async (chainTicker,
      toAddress,
      amount,
      verify,
      lumpFee,
      feePerByte,
      noSigature,
      offlineTx,
      unsigned,
      customUtxos,
      votingTx,
      opreturn,
      customWif,
      customFromAddress) => {
      console.log(await getApiData('electrum', 'tx_preflight', {chainTicker,
        toAddress,
        amount,
        verify,
        lumpFee,
        feePerByte,
        noSigature,
        offlineTx,
        unsigned,
        customUtxos,
        votingTx,
        opreturn,
        customWif,
        customFromAddress}, 'post'))
    }

    //DELET
    window.native_tx_preflight = async (chainTicker,
      toAddress,
      amount,
      balance,
      fromAddress,
      customFee,
      memo,
      toChain,
      toNative,
      toReserve,
      preConvert,
      lastPriceInRoot) => {
      console.log(await getApiData('native', 'tx_preflight', {chainTicker,
        toAddress,
        amount,
        balance,
        fromAddress,
        customFee,
        memo,
        toChain,
        toNative,
        toReserve,
        preConvert,
        lastPriceInRoot}, 'post'))
    }

    //DELET
    window.clearIntervals = async (chainTicker) => {
      clearAllCoinIntervals(chainTicker)
    }

    //DELET
    window.getCoinObj = async (chainTicker, isPbaas) => {
      console.log(await getCoinObj(chainTicker, isPbaas))
    }

    //DELET
    window.addCoin = async (chainTicker, isPbaas, mode, startupOptions) => {
      console.log(await addCoin(await getCoinObj(chainTicker, isPbaas), mode, this.props.dispatch, startupOptions))
    }

    //DELET
    window.auth = async (mode, seed) => {
      console.log(await getApiData(mode, 'auth', {seed}, 'post'))
    }

    //DELET
    window.getPubKey = async (mode, coin, address) => {
      console.log(await getPubkey(mode, coin, address))
    }

    //DELET
    window.removeCoin = async (mode, coin) => {
      const res = await getApiData(mode, 'remove_coin', {chainTicker: coin}, 'post')
      console.log("GOT RESULT")
      console.log(res)
    }

    //DELET
    window.createAddress = async (mode, coin, zAddress) => {
      console.log(await createAddress(mode, coin, zAddress))
    }
    
    window.getPrivKey = async (mode, coin, address) => {
      console.log(await getPrivkey(mode, coin, address))
    }

    //DELET
    window.checkZcashParamsFormatted = async () => {
      console.log(await checkZcashParamsFormatted())
    }

    //DELET
    window.downloadZcashParams = async (dloption) => {
      console.log(await downloadZcashParams(dloption))
    }

    //DELET
    window.getIdentities = async (chainTicker) => {
      try {
        console.log(await getIdentities(NATIVE, chainTicker))
      } catch (e) {
        console.error(e)
      }
    }

    window.registerName = async (chainTicker, name, address, refferral) => {
      try {
        console.log(await registerIdName(chainTicker, name, address, refferral))
      } catch (e) {
        console.error(e)
      }
    }

    //DELET
    window.getNames = async (chainTicker) => {
      console.log(await getNameCommitments(NATIVE, chainTicker))
    }

    window.newAlert = (message, type, autoCloseMs) => {
      this.props.dispatch(newSnackbar(type, message, autoCloseMs))
    }

    window.logout = async () => {
      logoutActiveUser(this.props.activatedCoins, this.props.dispatch)
    }
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

    //DELET
    activatedCoins: state.coins.activatedCoins
  };
};

export default connect(mapStateToProps)(Main);
