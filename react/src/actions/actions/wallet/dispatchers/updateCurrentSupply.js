import { getCurrentSupply } from '../../../../util/api/wallet/walletCalls'
import { NATIVE } from '../../../../util/constants/componentConstants'
import { SET_COIN_CURRENTSUPPLY, ERROR_COIN_CURRENTSUPPLY } from '../../../../util/constants/storeType'

/**
 * Fetches the appropriate data from the store for the specified mode's getcoinsupplt
 * update and dispatches a getcoinsupply update or error action to the store. Returns
 * a boolean indicating whether call was success or not.
 * @param {Object} state Reference to redux store state
 * @param {Function} dispatch Redux action dispatch function
 * @param {String} mode native
 * @param {String} chainTicker Chain ticker id for chain to fetch supply for
 */
export const updateCurrentSupply = async (state, dispatch, mode, chainTicker) => {
  let getCurrentSupplyAction = {chainTicker}
  let wasSuccess = true

  if (mode === NATIVE) {
    try {
      const apiResult = await getCurrentSupply(mode, chainTicker)
      if (apiResult.msg === 'success') {
        getCurrentSupplyAction = {...getCurrentSupplyAction, type: SET_COIN_CURRENTSUPPLY, currentSupply: apiResult.result}
      } else {
        getCurrentSupplyAction = {...getCurrentSupplyAction, type: ERROR_COIN_CURRENTSUPPLY, result: apiResult.result}
        wasSuccess = false
      }
    } catch (e) {
      throw e
    }
  } else {
    throw new Error(`"${mode}" is not a supported chain mode for updateCurrentSupply, expected native.`)
  }

  dispatch(getCurrentSupplyAction)
  return wasSuccess
}