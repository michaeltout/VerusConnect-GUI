import { getFiatPrice } from '../../../../util/api/wallet/walletCalls'
import { NATIVE, ETH, ELECTRUM } from '../../../../util/constants/componentConstants'
import { SET_COIN_FIATPRICE, ERROR_COIN_FIATPRICE } from '../../../../util/constants/storeType'

/**
 * Fetches the appropriate data from the store for the specified mode's fiat price
 * update and dispatches a fiat price update or error action to the store. Returns
 * a boolean indicating whether errors occured or not.
 * @param {Object} state Reference to redux store state
 * @param {Function} dispatch Redux action dispatch function
 * @param {String} mode native || electrum || eth
 * @param {String} chainTicker Chain ticker id for chain to fetch fiat price for
 */
export const updateFiatPrice = async (state, dispatch, mode, chainTicker) => {
  let fiatpriceAction = {chainTicker}
  let wasSuccess = true

  if (mode === NATIVE || mode === ETH || mode === ELECTRUM) {  
    try {
      const apiResult = await getFiatPrice(mode, chainTicker)

      if (apiResult.msg === 'success') {
        fiatpriceAction = {...fiatpriceAction, type: SET_COIN_FIATPRICE, fiatPrice: apiResult.result}
      } else {
        fiatpriceAction = {...fiatpriceAction, type: ERROR_COIN_FIATPRICE, result: apiResult.result}
        wasSuccess = false
      }
    } catch (e) {
      throw e
    }
  } else {
    throw new Error(`"${mode}" is not a supported chain mode, expected native, eth or electrum.`)
  }

  dispatch(fiatpriceAction)
  return wasSuccess
}