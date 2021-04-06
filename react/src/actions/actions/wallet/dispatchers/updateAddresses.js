import { getAddresses } from '../../../../util/api/wallet/walletCalls'
import { NATIVE, ETH, ELECTRUM, ERC20 } from '../../../../util/constants/componentConstants'
import { SET_COIN_ADDRESSES, ERROR_COIN_ADDRESSES } from '../../../../util/constants/storeType'

/**
 * Fetches the appropriate data from the store for the specified mode's address
 * update and dispatches an address update or error action to the store. Returns
 * a boolean indicating whether errors occured or not.
 * @param {Object} state Reference to redux store state
 * @param {Function} dispatch Redux action dispatch function
 * @param {String} mode native || electrum || eth
 * @param {String} chainTicker Chain ticker id for chain to fetch addresses for
 */
export const updateAddresses = async (state, dispatch, mode, chainTicker) => {
  let addressAction = {chainTicker}
  let wasSuccess = true

  if (mode === NATIVE || mode === ETH || mode === ELECTRUM || mode === ERC20) {  
    try {
      const apiResult = await getAddresses(
        mode,
        chainTicker,
        mode === NATIVE
          ? state.settings.config.coin.native.includePrivateAddrs[chainTicker]
          : null,
        mode === NATIVE
          ? state.settings.config.coin.native.includePrivateAddressBalances[
              chainTicker
            ]
          : null
      );
      if (apiResult.msg === 'success') { 
        addressAction = {...addressAction, type: SET_COIN_ADDRESSES, addresses: apiResult.result}
      } else {
        addressAction = {...addressAction, type: ERROR_COIN_ADDRESSES, result: apiResult.result}
        wasSuccess = false
      }
    } catch (e) {
      throw e
    }
  } else {
    throw new Error(`"${mode}" is not a supported chain mode, expected native, eth or electrum.`)
  }

  dispatch(addressAction)
  return wasSuccess
}