import { NATIVE } from '../../../../util/constants/componentConstants'
import { SET_COIN_BLOCKREWARD, ERROR_COIN_BLOCKREWARD } from '../../../../util/constants/storeType'
import { getBlockReward } from '../../../../util/api/wallet/walletCalls'

/**
 * Fetches the appropriate data from the store for the specified mode's getblocksubsidy
 * update and dispatches a getblocksubsidy update or error action to the store. Returns
 * a boolean indicating whether errors occured or not.
 * @param {Object} state Reference to redux store state
 * @param {Function} dispatch Redux action dispatch function
 * @param {String} mode native
 * @param {String} chainTicker Chain ticker id for chain to fetch getblocksubsidy for
 */
export const updateBlockReward = async (state, dispatch, mode, chainTicker) => {
  let getBlockRewardAction = {chainTicker}
  let wasSuccess = true

  if (mode === NATIVE) {
    try {
      const apiResult = await getBlockReward(mode, chainTicker)
      if (apiResult.msg === 'success') {
        getBlockRewardAction = {...getBlockRewardAction, type: SET_COIN_BLOCKREWARD, blockReward: apiResult.result}
      } else {
        getBlockRewardAction = {...getBlockRewardAction, type: ERROR_COIN_BLOCKREWARD, result: apiResult.result}
        wasSuccess = false
      }
    } catch (e) {
      throw e
    }
  } else {
    throw new Error(`"${mode}" is not a supported chain mode for updateBlockReward, expected native.`)
  }

  dispatch(getBlockRewardAction)
  return wasSuccess
}