import { getZOperationStatuses } from '../../../../util/api/wallet/walletCalls'
import { NATIVE } from '../../../../util/constants/componentConstants'
import { SET_COIN_ZOPERATIONS, ERROR_COIN_ZOPERATIONS } from '../../../../util/constants/storeType'

/**
 * Fetches the appropriate data from the store for the specified mode's z_operationstatus
 * update and dispatches a z_operationstatus update or error action to the store. Returns
 * a boolean indicating whether errors occured or not.
 * @param {Object} state Reference to redux store state
 * @param {Function} dispatch Redux action dispatch function
 * @param {String} mode native
 * @param {String} chainTicker Chain ticker id for chain to fetch z_operations for
 */
export const updateZOperations = async (state, dispatch, mode, chainTicker) => {
  let zOperationsAction = {chainTicker}
  let wasSuccess = true

  if (mode === NATIVE) {
    try {
      const apiResult = await getZOperationStatuses(mode, chainTicker)
      if (apiResult.msg === 'success') {
        zOperationsAction = {...zOperationsAction, type: SET_COIN_ZOPERATIONS, zOperations: apiResult.result}
      } else {
        zOperationsAction = {...zOperationsAction, type: ERROR_COIN_ZOPERATIONS, result: apiResult.result}
        wasSuccess = false
      }
    } catch (e) {
      throw e
    }
  } else {
    throw new Error(`"${mode}" is not a supported chain mode for updateZOperations, expected native.`)
  }

  dispatch(zOperationsAction)
  return wasSuccess
}