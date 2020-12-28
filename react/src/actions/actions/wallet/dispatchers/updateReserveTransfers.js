import { getReserveTransfers } from '../../../../util/api/wallet/walletCalls'
import { NATIVE, ETH, ELECTRUM } from '../../../../util/constants/componentConstants'
import { SET_COIN_RESERVE_TRANSFERS, ERROR_COIN_RESERVE_TRANSFERS } from '../../../../util/constants/storeType'

/**
 * Fetches the appropriate data from the store for the specified mode's reserve transfer
 * update and dispatches a action to the store. Returns
 * a boolean indicating whether errors occured or not.
 * @param {Object} state Reference to redux store state
 * @param {Function} dispatch Redux action dispatch function
 * @param {String} mode native || electrum || eth
 * @param {String} chainTicker Chain ticker id for chain to fetch reserve transfers for
 */
export const updateReserveTransfers = async (state, dispatch, mode, chainTicker) => {
  let reserveTransferAction = {chainTicker}
  let wasSuccess = true

  if (mode === NATIVE) {    
    try {
      const apiResult = await getReserveTransfers(
        mode,
        chainTicker
      );
      
      if (apiResult.msg === 'success') {
        reserveTransferAction = {...reserveTransferAction, type: SET_COIN_RESERVE_TRANSFERS, transfers: apiResult.result}
      } else {
        reserveTransferAction = {...reserveTransferAction, type: ERROR_COIN_RESERVE_TRANSFERS, result: apiResult.result}
        wasSuccess = false
      }
    } catch (e) {
      throw e
    }
  } else {
    throw new Error(`"${mode}" is not a supported chain mode, expected native.`)
  }

  dispatch(reserveTransferAction)
  return wasSuccess
}