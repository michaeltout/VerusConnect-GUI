import { getIdentities } from '../../../../util/api/wallet/walletCalls'
import { NATIVE } from '../../../../util/constants/componentConstants'
import { SET_COIN_IDENTITIES, ERROR_COIN_IDENTITIES } from '../../../../util/constants/storeType'

/**
 * Fetches the appropriate data from the store for a Verus Identites
 * update and dispatches a Verus Identites update or error action to the store. Returns
 * a boolean indicating whether errors occured or not.
 * @param {Object} state Reference to redux store state
 * @param {Function} dispatch Redux action dispatch function
 * @param {String} mode (native only)
 * @param {String} chainTicker Chain ticker id for chain to fetch Verus IDs for
 * @param {Boolean} includeCanSign Whether or not to include "Can Sign" IDs
 * @param {Boolean} includeWatchOnly Whether or not to include "Watch Only" IDs
 */
export const updateIdentities = async (state, dispatch, mode, chainTicker, includeCanSign, includeWatchOnly) => {
  let identitiesAction = {chainTicker}
  let wasSuccess = true
  let nameMap = {}

  if (mode === NATIVE) {  
    try {
      const apiResult = await getIdentities(mode, chainTicker, includeCanSign, includeWatchOnly)
      if (apiResult.msg === 'success') {
        apiResult.result.map(idObj => {
          nameMap[idObj.identity.identityaddress] = idObj.identity.name
        })

        identitiesAction = {
          ...identitiesAction, 
          type: SET_COIN_IDENTITIES, 
          identities: apiResult.result,
          nameMap
        }
      } else {
        identitiesAction = {...identitiesAction, type: ERROR_COIN_IDENTITIES, result: apiResult.result}
        wasSuccess = false
      }
    } catch (e) {
      throw e
    }
  } else {
    throw new Error(`"${mode}" is not a supported chain mode for getting identities, expected native`)
  }

  dispatch(identitiesAction)
  return wasSuccess
}