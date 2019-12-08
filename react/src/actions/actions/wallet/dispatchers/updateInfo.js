import { getInfo } from '../../../../util/api/wallet/walletCalls'
import { NATIVE, ETH, ELECTRUM } from '../../../../util/constants/componentConstants'
import { SET_COIN_INFO, ERROR_COIN_INFO } from '../../../../util/constants/storeType'

/**
 * Fetches the appropriate data from the store for the specified mode's info
 * update and dispatches an info update or error action to the store. Returns
 * a boolean indicating whether errors occured or not.
 * @param {Object} state Reference to redux store state
 * @param {Function} dispatch Redux action dispatch function
 * @param {String} mode native || electrum || eth
 * @param {String} chainTicker Chain ticker id for chain to fetch info for
 */
export const updateInfo = async (state, dispatch, mode, chainTicker) => {
  let infoAction = {chainTicker}
  let wasSuccess = true

  if (mode === NATIVE || mode === ETH || mode === ELECTRUM) {    
    try {
      const apiResult = await getInfo(mode, chainTicker)
      if (apiResult.msg === 'success') {
        infoAction = {...infoAction, type: SET_COIN_INFO, info: apiResult.result}
      } else {
        infoAction = {...infoAction, type: ERROR_COIN_INFO, result: apiResult.result}
        wasSuccess = false
      }
    } catch (e) {
      throw e
    }
  } else {
    throw new Error(`"${mode}" is not a supported chain mode, expected native, eth or electrum.`)
  }

  dispatch(infoAction)
  return wasSuccess
}