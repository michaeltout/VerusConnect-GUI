import { getDefinedChains } from '../../../../util/api/wallet/walletCalls'
import { NATIVE } from '../../../../util/constants/componentConstants'
import { SET_COIN_DEFINEDCHAINS, ERROR_COIN_DEFINEDCHAINS } from '../../../../util/constants/storeType'

/**
 * Fetches the appropriate data from the store for the specified mode's getdefinedchains
 * update and dispatches a getdefinedchains update or error action to the store. Returns
 * a boolean indicating whether errors occured or not.
 * @param {Object} state Reference to redux store state
 * @param {Function} dispatch Redux action dispatch function
 * @param {String} mode native
 * @param {String} chainTicker Chain ticker id for chain to fetch getdefinedchains for
 */
export const updateDefinedChains = async (state, dispatch, mode, chainTicker) => {
  let getDefinedChainsAction = {chainTicker}
  let wasSuccess = true

  if (mode === NATIVE) {
    try {
      const apiResult = await getDefinedChains(mode, chainTicker)
      if (apiResult.msg === 'success') {
        getDefinedChainsAction = {...getDefinedChainsAction, type: SET_COIN_DEFINEDCHAINS, definedChains: apiResult.result}
      } else {
        getDefinedChainsAction = {...getDefinedChainsAction, type: ERROR_COIN_DEFINEDCHAINS, result: apiResult.result}
        wasSuccess = false
      }
    } catch (e) {
      throw e
    }
  } else {
    throw new Error(`"${mode}" is not a supported chain mode for updateDefinedChains, expected native.`)
  }

  dispatch(getDefinedChainsAction)
  return wasSuccess
}