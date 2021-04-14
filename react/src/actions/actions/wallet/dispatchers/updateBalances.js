import { getAllBalances } from '../../../../util/api/wallet/walletCalls'
import { NATIVE, ETH, ELECTRUM, ERC20 } from '../../../../util/constants/componentConstants'
import { SET_COIN_BALANCES, ERROR_COIN_BALANCES } from '../../../../util/constants/storeType'

/**
 * Fetches the appropriate data from the store for the specified mode's balance
 * update and dispatches a balance update or error action to the store. Returns
 * a boolean indicating whether errors occured or not.
 * @param {Object} state Reference to redux store state
 * @param {Function} dispatch Redux action dispatch function
 * @param {String} mode native || electrum || eth
 * @param {String} chainTicker Chain ticker id for chain to fetch balances for
 */
export const updateAllBalances = async (state, dispatch, mode, chainTicker) => {
  let balanceAction = {chainTicker}
  let wasSuccess = true

  if (mode === NATIVE || mode === ETH || mode === ELECTRUM || mode === ERC20) {    
    try {
      const apiResult = await getAllBalances(
        mode,
        chainTicker,
        mode === NATIVE
          ? !state.settings.config.coin.native.excludePrivateBalances[
              chainTicker
            ]
          : null
      );
      if (apiResult.msg === 'success') {
        balanceAction = {...balanceAction, type: SET_COIN_BALANCES, balances: apiResult.result}
      } else {
        balanceAction = {...balanceAction, type: ERROR_COIN_BALANCES, result: apiResult.result}
        wasSuccess = false
      }
    } catch (e) {
      throw e
    }
  } else {
    throw new Error(`"${mode}" is not a supported chain mode, expected native, eth or electrum.`)
  }

  dispatch(balanceAction)
  return wasSuccess
}