import { ACTIVATE_COIN, ERROR_ACTIVATE_COIN, DEACTIVATE_COIN, UNTRACK_COIN } from '../../../../util/constants/storeType'
import { PRE_DATA, NATIVE, POST_SYNC, INFO_SNACK } from '../../../../util/constants/componentConstants'
import { initCoin, removeCoin } from '../../../../util/api/coins/coins'
import { activateChainLifecycle, clearAllCoinIntervals } from '../../../actionDispatchers'
import { getCoinColor } from '../../../../util/coinData'
import { newSnackbar } from '../../../actionCreators'

/**
 * Activates a coin in the specified mode, and dispatches action to store. 
 * Assumes that for electrum electrum and eth available_modes, authentication is complete. 
 * Returns true on success, and false on failiure.
 * @param {Object} coinObj Coin obj either created or fetched from getCoinObj
 * @param {String} mode native || electrum || eth
 * @param {Function} dispatch Function to dispatch activated coin to store
 */
export const activateCoin = async (coinObj, mode, dispatch) => {
  let daemonResult
  try {
    daemonResult = await initCoin(
      coinObj.id,
      mode,
      coinObj.options
    );
    if (daemonResult.msg === 'error') throw new Error(daemonResult.result)    

    dispatch({
      type: ACTIVATE_COIN,
      chainTicker: coinObj.id,
      activatedCoin: {
        ...coinObj,
        status: mode === NATIVE ? PRE_DATA : POST_SYNC,
        mode,
      }
    })

    activateChainLifecycle(mode, coinObj.id)
    return true

  } catch (e) {
    dispatch({
      type: ERROR_ACTIVATE_COIN,
      chainTicker: coinObj.id,
      result: e.message
    })

    throw e
  }
}

/**
 * Tries to add a coin given a coin object from getCoinObj, a mode, and 
 * startup options (for native)
 * @param {Object} coinObj Coin obj either created or fetched from getCoinObj
 * @param {String} mode native || electrum || eth,
 * @param {Function} dispatch Function to dispatch activated coin to store
 * @param {String[]} activatedTickers The list of currently activated chain tickers
 * @param {String[]} startupOptions (Optional) startup options for native, e.g. -mint for auto staking
 */
export const addCoin = async (coinObj, mode, dispatch, activatedTickers, startupOptions) => {
  try {
    coinObj.options.startupOptions =
      coinObj.options.startupOptions != null
        ? coinObj.options.startupOptions.concat(startupOptions)
        : startupOptions;

    if (!coinObj.available_modes[mode]) throw new Error(`${mode} is not supported for ${coinObj.id}.`)
    if (activatedTickers.includes(coinObj.id)) throw new Error(`Error, ${coinObj.id} is already active!`)

    const themeColor = coinObj.themeColor == null ? await getCoinColor(coinObj.id, coinObj.available_modes) : coinObj.themeColor

    return await activateCoin({...coinObj, themeColor }, mode, dispatch)
  } catch (e) {
    throw e
  }
}

/**
 * Deactivates a coin and removes it from the activatedCoins object
 * @param {String} chainTicker The chain ticker of the coin to deactivate
 * @param {String} mode The mode that the chain to deactivate is currently activated in
 * @param {Function} dispatch The dispatch to redux store function
 * @param {Boolean} untrack (Optional, default = false) Whether or not to stop tracking the coin in the last
 * active coins object attached to the user
 */
export const deactivateCoin = async (chainTicker, mode, dispatch, untrack = false) => {
  if (mode === NATIVE) {
    dispatch(newSnackbar(INFO_SNACK, `Stopping blockchain daemon. Please wait.`))
  }

  await removeCoin(chainTicker, mode).then(() => {
    clearAllCoinIntervals(chainTicker)
    
    dispatch({
      type: DEACTIVATE_COIN,
      chainTicker,
    })

    if (untrack) dispatch({ type: UNTRACK_COIN, chainTicker })

    return true
  })
}