import { getAllCurrencies } from '../../../../util/api/wallet/walletCalls'
import { NATIVE } from '../../../../util/constants/componentConstants'
import { SET_COIN_ALL_CURRENCIES, ERROR_COIN_ALL_CURRENCIES } from '../../../../util/constants/storeType'

/**
 * Fetches the appropriate data from the store for a chain currencies
 * update (all currencies) and dispatches an update or error action to the store. Returns
 * a boolean indicating whether errors occured or not.
 * @param {Object} state Reference to redux store state
 * @param {Function} dispatch Redux action dispatch function
 * @param {String} mode (native only)
 * @param {String} chainTicker Chain ticker id for chain to fetch currencies for
 * @param {Boolean} includeExpired Whether or not to include currencies that are no longer active
 */
export const updateAllCurrencies = async (state, dispatch, mode, chainTicker, includeExpired) => {
  let currenciesAction = {chainTicker}
  let wasSuccess = true

  if (mode === NATIVE) {
    try {
      const apiResult = await getAllCurrencies(mode, chainTicker, includeExpired)
      if (apiResult.msg === 'success') {
        currenciesAction = {...currenciesAction, type: SET_COIN_ALL_CURRENCIES, currencies: apiResult.result}
      } else {
        currenciesAction = {...currenciesAction, type: ERROR_COIN_ALL_CURRENCIES, result: apiResult.result}
        wasSuccess = false
      }
    } catch (e) {
      throw e
    }
  } else {
    throw new Error(`"${mode}" is not a supported chain mode for getting currencies, expected native`)
  }

  dispatch(currenciesAction)
  return wasSuccess
}