import { getNameCommitments } from '../../../../util/api/wallet/walletCalls'
import { NATIVE } from '../../../../util/constants/componentConstants'
import { SET_COIN_NAME_COMMITMENTS, ERROR_COIN_NAME_COMMITMENTS } from '../../../../util/constants/storeType'

/**
 * Fetches the appropriate data from the store for a Verus Identity name commitment
 * update and dispatches a Verus Identity name commitment update or error action to the store. Returns
 * a boolean indicating whether errors occured or not.
 * @param {Object} state Reference to redux store state
 * @param {Function} dispatch Redux action dispatch function
 * @param {String} mode (native only)
 * @param {String} chainTicker Chain ticker id for chain to fetch Verus ID name commitments for
 */
export const updateNameCommitments = async (state, dispatch, mode, chainTicker) => {
  let nameCommitmentAction = {chainTicker}
  let wasSuccess = true

  if (mode === NATIVE) {  
    try {
      const apiResult = await getNameCommitments(mode, chainTicker)
      if (apiResult.msg === 'success') {
        nameCommitmentAction = {...nameCommitmentAction, type: SET_COIN_NAME_COMMITMENTS, nameCommitments: apiResult.result}
      } else {
        nameCommitmentAction = {...nameCommitmentAction, type: ERROR_COIN_NAME_COMMITMENTS, result: apiResult.result}
        wasSuccess = false
      }
    } catch (e) {
      throw e
    }
  } else {
    throw new Error(`"${mode}" is not a supported chain mode for getting identity name commitments, expected native`)
  }

  dispatch(nameCommitmentAction)
  return wasSuccess
}